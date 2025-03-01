
/**
 * Handles communication between the React UI and .NET application
 * Enhanced with security features
 */

import type { InteropMessage, InteropMessageType, WindowWithHostObjects } from './types';
import SecurityUtils from './securityUtils';
import { CONNECTION_CONFIG } from './config';

export class MessagingService {
  private messageHandlers: Map<InteropMessageType, ((message: InteropMessage) => void)[]> = new Map();
  private pendingResponses: Map<string, {
    resolve: (value: any) => void,
    reject: (reason: any) => void,
    timeout: number
  }> = new Map();
  private sessionId: string;

  constructor() {
    this.sessionId = SecurityUtils.generateSessionId();
    console.log(`[InteropService] Initialized with session ID: ${this.sessionId}`);
  }

  /**
   * Register a handler for a specific message type
   */
  public on(type: InteropMessageType, handler: (message: InteropMessage) => void): void {
    const handlers = this.messageHandlers.get(type) || [];
    handlers.push(handler);
    this.messageHandlers.set(type, handlers);
  }
  
  /**
   * Remove a handler for a specific message type
   */
  public off(type: InteropMessageType, handler: (message: InteropMessage) => void): void {
    const handlers = this.messageHandlers.get(type) || [];
    const index = handlers.indexOf(handler);
    if (index !== -1) {
      handlers.splice(index, 1);
      this.messageHandlers.set(type, handlers);
    }
  }

  /**
   * Process an incoming message and route to registered handlers
   */
  public processIncomingMessage(message: InteropMessage): void {
    if (CONNECTION_CONFIG.DEBUG.VERBOSE_LOGGING) {
      console.log(`[InteropService] Received message: ${message.type}`);
    }
    
    // Check for response correlation ID and resolve any pending promises
    if (message.correlationId && this.pendingResponses.has(message.correlationId)) {
      const pendingResponse = this.pendingResponses.get(message.correlationId);
      if (pendingResponse) {
        clearTimeout(pendingResponse.timeout);
        this.pendingResponses.delete(message.correlationId);
        
        if (message.error) {
          pendingResponse.reject(message.error);
        } else {
          pendingResponse.resolve(message.payload);
        }
        return;
      }
    }
    
    // Execute all registered handlers for this message type
    const handlers = this.messageHandlers.get(message.type) || [];
    handlers.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        console.error(`[InteropService] Error in handler for ${message.type}:`, error);
      }
    });
  }
  
  /**
   * Send a message to the host application
   */
  public sendMessage(type: InteropMessageType, payload: any): void {
    const message: InteropMessage = {
      type,
      payload,
      timestamp: Date.now(),
      sessionId: this.sessionId
    };
    
    // Add message authentication if enabled
    if (CONNECTION_CONFIG.SECURITY.ENABLE_MESSAGE_AUTH) {
      message.signature = SecurityUtils.signMessage(message);
    }
    
    // Add random jitter to message timing if in stealth mode
    const sendWithJitter = () => {
      this.sendMessageToHost(message);
    };
    
    if (CONNECTION_CONFIG.DEBUG.SIMULATE_LATENCY) {
      const jitter = Math.random() * CONNECTION_CONFIG.DEBUG.SIMULATE_LATENCY_MS;
      setTimeout(sendWithJitter, jitter);
    } else {
      sendWithJitter();
    }
  }
  
  /**
   * Send a message and wait for a response
   * Returns a promise that resolves with the response
   */
  public sendMessageAndWaitForResponse(type: InteropMessageType, payload: any, timeout = CONNECTION_CONFIG.RESPONSE_TIMEOUT): Promise<any> {
    return new Promise((resolve, reject) => {
      // Generate a unique correlation ID
      const correlationId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Create the message
      const message: InteropMessage = {
        type,
        payload,
        timestamp: Date.now(),
        correlationId,
        sessionId: this.sessionId
      };
      
      // Add message authentication if enabled
      if (CONNECTION_CONFIG.SECURITY.ENABLE_MESSAGE_AUTH) {
        message.signature = SecurityUtils.signMessage(message);
      }
      
      // Set up timeout
      const timeoutId = window.setTimeout(() => {
        this.pendingResponses.delete(correlationId);
        reject(new Error(`Timeout waiting for response to message type: ${type}`));
      }, timeout);
      
      // Store the promise handlers
      this.pendingResponses.set(correlationId, {
        resolve,
        reject,
        timeout: timeoutId
      });
      
      // Send the message
      this.sendMessageToHost(message);
    });
  }
  
  /**
   * Actually send the message to the host via available channels
   */
  private sendMessageToHost(message: InteropMessage): void {
    try {
      // Access custom window properties using type assertion
      const customWindow = window as unknown as WindowWithHostObjects;
      
      // Prepare payload - obfuscate if enabled
      const messageToSend = CONNECTION_CONFIG.SECURITY.ENCRYPT_PAYLOADS 
        ? SecurityUtils.obfuscatePayload(message)
        : JSON.stringify(message);
      
      let sent = false;
      
      // Try WebView2 communication first (most modern .NET + WebView2 integration)
      if (CONNECTION_CONFIG.CHANNELS.WEBVIEW2 && customWindow.chrome && customWindow.chrome.webview) {
        customWindow.chrome.webview.postMessage(messageToSend);
        sent = true;
      }
      
      // Try standard postMessage to parent
      if (!sent && CONNECTION_CONFIG.CHANNELS.PARENT_WINDOW && window.parent && window.parent !== window) {
        window.parent.postMessage(message, '*');
        sent = true;
      }
      
      // Try WPF/WinForms WebBrowser control
      if (!sent && CONNECTION_CONFIG.CHANNELS.EXTERNAL_NOTIFY && 
          customWindow.external && typeof customWindow.external.notify === 'function') {
        customWindow.external.notify(messageToSend);
        sent = true;
      }
      
      // Try any injected host objects
      if (!sent && CONNECTION_CONFIG.CHANNELS.CUSTOM_OBJECTS) {
        if (customWindow.tarkovHost && typeof customWindow.tarkovHost.receiveMessage === 'function') {
          customWindow.tarkovHost.receiveMessage(messageToSend);
          sent = true;
        } else if (customWindow.dmaHost && typeof customWindow.dmaHost.receiveMessage === 'function') {
          customWindow.dmaHost.receiveMessage(messageToSend);
          sent = true;
        } else if (customWindow.externalHost && typeof customWindow.externalHost.receiveMessage === 'function') {
          customWindow.externalHost.receiveMessage(messageToSend);
          sent = true;
        } else if (customWindow.hostApp && typeof customWindow.hostApp.receiveMessage === 'function') {
          customWindow.hostApp.receiveMessage(messageToSend);
          sent = true;
        }
      }
      
      if (CONNECTION_CONFIG.DEBUG.LOG_MESSAGES && sent) {
        console.log(`[InteropService] Sent message: ${message.type}`);
      } else if (!sent) {
        console.warn(`[InteropService] Failed to send message: ${message.type} - No available channels`);
      }
    } catch (error) {
      console.error("[InteropService] Error sending message:", error);
    }
  }

  /**
   * Simulate incoming message from host (for testing)
   */
  public simulateIncomingMessage(type: InteropMessageType, payload: any): void {
    const message: InteropMessage = {
      type,
      payload,
      timestamp: Date.now(),
      sessionId: this.sessionId
    };
    
    this.processIncomingMessage(message);
  }
}

export default new MessagingService();
