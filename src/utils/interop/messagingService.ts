
/**
 * Handles communication between the React UI and .NET application
 */

import type { InteropMessage, InteropMessageType, WindowWithHostObjects } from './types';

export class MessagingService {
  private messageHandlers: Map<InteropMessageType, ((message: InteropMessage) => void)[]> = new Map();

  constructor() {}

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
    console.log(`[InteropService] Received message: ${message.type}`);
    
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
      timestamp: Date.now()
    };
    
    try {
      // Access custom window properties using type assertion
      const customWindow = window as unknown as WindowWithHostObjects;
      
      // Try WebView2 communication first (most modern .NET + WebView2 integration)
      if (customWindow.chrome && customWindow.chrome.webview) {
        customWindow.chrome.webview.postMessage(JSON.stringify(message));
      }
      
      // Try standard postMessage to parent
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(message, '*');
      }
      
      // Try WPF/WinForms WebBrowser control
      if (customWindow.external && typeof customWindow.external.notify === 'function') {
        customWindow.external.notify(JSON.stringify(message));
      }
      
      // Try any injected host objects
      if (customWindow.tarkovHost && typeof customWindow.tarkovHost.receiveMessage === 'function') {
        customWindow.tarkovHost.receiveMessage(JSON.stringify(message));
      }
      
      if (customWindow.dmaHost && typeof customWindow.dmaHost.receiveMessage === 'function') {
        customWindow.dmaHost.receiveMessage(JSON.stringify(message));
      }
      
      if (customWindow.externalHost && typeof customWindow.externalHost.receiveMessage === 'function') {
        customWindow.externalHost.receiveMessage(JSON.stringify(message));
      }
      
      if (customWindow.hostApp && typeof customWindow.hostApp.receiveMessage === 'function') {
        customWindow.hostApp.receiveMessage(JSON.stringify(message));
      }
      
      console.log(`[InteropService] Sent message: ${type}`);
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
      timestamp: Date.now()
    };
    
    this.processIncomingMessage(message);
  }
}

export default new MessagingService();
