
/**
 * Handles registration and execution of message handlers
 */

import type { InteropMessage, InteropMessageType } from './types';

export class MessageHandler {
  private messageHandlers: Map<InteropMessageType, ((message: InteropMessage) => void)[]> = new Map();

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
   * Execute all registered handlers for a message type
   */
  public executeHandlers(message: InteropMessage): void {
    const handlers = this.messageHandlers.get(message.type) || [];
    handlers.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        console.error(`[MessageHandler] Error in handler for ${message.type}:`, error);
      }
    });
  }
}

export default MessageHandler;
