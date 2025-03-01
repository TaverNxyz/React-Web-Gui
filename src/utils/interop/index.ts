
/**
 * InteropService - Main entry point for .NET interop functionality
 * This service coordinates communication between the React UI and .NET application
 */

import connectionHandler from './connection';
import messagingService from './messagingService';
import featureService from './features';
import type { InteropMessage, InteropMessageType, SettingsCategory, RadarEntity } from './types';

class InteropService {
  private static instance: InteropService;
  
  // Use singleton pattern
  public static getInstance(): InteropService {
    if (!InteropService.instance) {
      InteropService.instance = new InteropService();
    }
    return InteropService.instance;
  }
  
  private constructor() {
    // Initialize connection with host window
    this.setupMessageListener();
    
    // Setup callbacks between components
    connectionHandler.setCallbacks(
      // Connection status change handler
      (connected: boolean) => {
        // Handle connection status changes
        if (connected) {
          messagingService.processIncomingMessage({
            type: 'CONNECT',
            payload: {},
            timestamp: Date.now()
          });
        } else {
          messagingService.processIncomingMessage({
            type: 'DISCONNECT',
            payload: {},
            timestamp: Date.now()
          });
        }
      },
      // Message sending handler
      (type: string, payload: any) => {
        messagingService.sendMessage(type as InteropMessageType, payload);
      }
    );
    
    console.log("[InteropService] Initialized and ready for connection");
  }
  
  private setupMessageListener(): void {
    // Listen for messages from the parent window (.NET WebView)
    window.addEventListener('message', (event) => {
      try {
        const message = event.data as InteropMessage;
        
        if (!message || !message.type) return;
        
        // Process incoming message
        this.processIncomingMessage(message);
      } catch (error) {
        console.error("[InteropService] Error processing message:", error);
      }
    });
    
    // Also handle global objects that might be injected by the .NET host
    connectionHandler.checkForHostObjects();
    
    // Listen for WebView2 specific .NET integration
    connectionHandler.setupWebView2Integration();
  }
  
  private processIncomingMessage(message: InteropMessage): void {
    // Let the connection handler process connection-related messages
    connectionHandler.handleConnectionStatusMessage(message);
    
    // Let the messaging service route the message to registered handlers
    messagingService.processIncomingMessage(message);
  }
  
  // Public API methods - delegate to specific services
  
  /**
   * Register a handler for a specific message type
   */
  public on(type: InteropMessageType, handler: (message: InteropMessage) => void): void {
    messagingService.on(type, handler);
  }
  
  /**
   * Remove a handler for a specific message type
   */
  public off(type: InteropMessageType, handler: (message: InteropMessage) => void): void {
    messagingService.off(type, handler);
  }
  
  /**
   * Send a message to the host application
   */
  public sendMessage(type: InteropMessageType, payload: any): void {
    messagingService.sendMessage(type, payload);
  }
  
  /**
   * Update settings in the host application
   */
  public updateSettings(category: SettingsCategory, settingsData: any): void {
    featureService.updateSettings(category, settingsData);
  }
  
  /**
   * Toggle a feature in the host application
   */
  public toggleFeature(featureName: string, enabled: boolean): void {
    featureService.toggleFeature(featureName, enabled);
  }
  
  /**
   * Update radar entities (can be called by .NET host)
   */
  public updateRadarEntities(entities: RadarEntity[]): void {
    featureService.updateRadarEntities(entities);
  }
  
  /**
   * Simulate incoming message from host (for testing)
   */
  public simulateIncomingMessage(type: InteropMessageType, payload: any): void {
    messagingService.simulateIncomingMessage(type, payload);
  }
  
  /**
   * Check if connected to host
   */
  public isHostConnected(): boolean {
    return connectionHandler.isHostConnected();
  }
  
  /**
   * Force connection status (useful for development/testing)
   */
  public forceConnectionStatus(status: boolean): void {
    connectionHandler.forceConnectionStatus(status);
    
    // Trigger appropriate events
    if (status) {
      messagingService.processIncomingMessage({
        type: 'CONNECT',
        payload: { forced: true },
        timestamp: Date.now()
      });
    } else {
      messagingService.processIncomingMessage({
        type: 'DISCONNECT',
        payload: { forced: true },
        timestamp: Date.now()
      });
    }
  }
}

export type { InteropMessage, InteropMessageType, SettingsCategory, RadarEntity };
export default InteropService.getInstance();
