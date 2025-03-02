
/**
 * Handles communication between the React UI and .NET application
 * Enhanced with security features
 */

import type { InteropMessage, InteropMessageType } from './types';
import SecurityUtils from './securityUtils';
import { CONNECTION_CONFIG } from './config';
import MessageHandler from './messageHandler';
import ResponseTracker from './responseTracker';
import MessageTransport from './messageTransport';

export class MessagingService {
  private messageHandler: MessageHandler;
  private responseTracker: ResponseTracker;
  private messageTransport: MessageTransport;
  private sessionId: string;

  constructor() {
    this.messageHandler = new MessageHandler();
    this.responseTracker = new ResponseTracker();
    this.messageTransport = new MessageTransport();
    this.sessionId = SecurityUtils.generateSessionId();
    console.log(`[InteropService] Initialized with session ID: ${this.sessionId}`);
  }

  /**
   * Register a handler for a specific message type
   */
  public on(type: InteropMessageType, handler: (message: InteropMessage) => void): void {
    this.messageHandler.on(type, handler);
  }
  
  /**
   * Remove a handler for a specific message type
   */
  public off(type: InteropMessageType, handler: (message: InteropMessage) => void): void {
    this.messageHandler.off(type, handler);
  }

  /**
   * Process an incoming message and route to registered handlers
   */
  public processIncomingMessage(message: InteropMessage): void {
    if (CONNECTION_CONFIG.DEBUG.VERBOSE_LOGGING) {
      console.log(`[InteropService] Received message: ${message.type}`);
    }
    
    // Check for response correlation ID and resolve any pending promises
    if (message.correlationId && this.responseTracker.hasResponse(message.correlationId)) {
      if (message.error) {
        this.responseTracker.rejectResponse(message.correlationId, message.error);
      } else {
        this.responseTracker.resolveResponse(message.correlationId, message.payload);
      }
      return;
    }
    
    // Execute all registered handlers for this message type
    this.messageHandler.executeHandlers(message);
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
        reject(new Error(`Timeout waiting for response to message type: ${type}`));
      }, timeout);
      
      // Store the promise handlers
      this.responseTracker.trackResponse(correlationId, resolve, reject, timeoutId);
      
      // Send the message
      this.sendMessageToHost(message);
    });
  }
  
  /**
   * Actually send the message to the host via available channels
   */
  private sendMessageToHost(message: InteropMessage): void {
    // Prepare payload - obfuscate if enabled
    const messageToSend = CONNECTION_CONFIG.SECURITY.ENCRYPT_PAYLOADS 
      ? SecurityUtils.obfuscatePayload(message)
      : JSON.stringify(message);
    
    // Use the transport service to send the message
    this.messageTransport.sendMessageToHost(messageToSend);
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
