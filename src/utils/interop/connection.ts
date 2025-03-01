
/**
 * Connection handling for .NET integration
 * Enhanced with additional security features and robustness
 */

import type { InteropMessage, WindowWithHostObjects } from './types';
import { CONNECTION_CONFIG } from './config';

export class ConnectionHandler {
  private isConnected: boolean = false;
  private connectionAttempts: number = 0;
  private maxConnectionAttempts: number = CONNECTION_CONFIG.MAX_CONNECTION_ATTEMPTS;
  private heartbeatInterval: number | null = null;
  private connectionCheckInterval: number | null = null;
  private lastMessageTimestamp: number = 0;
  private onConnectionChangeCallback: ((connected: boolean) => void) | null = null;
  private sendMessageCallback: ((type: string, payload: any) => void) | null = null;

  constructor() {}

  public setCallbacks(
    onConnectionChange: (connected: boolean) => void,
    sendMessage: (type: string, payload: any) => void
  ) {
    this.onConnectionChangeCallback = onConnectionChange;
    this.sendMessageCallback = sendMessage;
  }

  public setupWebView2Integration(): void {
    // Access custom window properties using type assertion
    const customWindow = window as unknown as WindowWithHostObjects;
    
    // Check if window.chrome.webview is available (WebView2 integration)
    if (customWindow.chrome && customWindow.chrome.webview) {
      console.log("[InteropService] WebView2 detected, setting up direct communication");
      
      // Listen for messages from the .NET host via WebView2
      customWindow.chrome.webview.addEventListener('message', (event: any) => {
        try {
          const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          
          if (!message || !message.type) return;
          
          // Update last message timestamp
          this.lastMessageTimestamp = Date.now();
          
          // Process incoming message using callback
          if (this.sendMessageCallback) {
            this.handleConnectionStatusMessage(message as InteropMessage);
          }
        } catch (error) {
          console.error("[InteropService] Error processing WebView2 message:", error);
        }
      });
      
      // Notify .NET host that we're ready
      this.updateConnectionStatus(true);
      if (this.sendMessageCallback) {
        this.sendMessageCallback('CONNECT', { 
          version: "1.0.0", 
          capabilities: ["settings", "radar", "esp", "aimbot"],
          timestamp: Date.now(),
          securityLevel: CONNECTION_CONFIG.SECURITY.ENCRYPT_PAYLOADS ? "encrypted" : "standard"
        });
      }
      
      // Start heartbeat
      this.startHeartbeat();
      // Start connection monitoring
      this.startConnectionMonitoring();
    }
  }
  
  public checkForHostObjects(): void {
    // Access custom window properties using type assertion
    const customWindow = window as unknown as WindowWithHostObjects;
    
    // Check if host has injected any special objects for communication
    this.connectionCheckInterval = window.setInterval(() => {
      // Increment connection attempts
      this.connectionAttempts++;
      
      // Check for common .NET WebView host object patterns
      if (
        (CONNECTION_CONFIG.CHANNELS.CUSTOM_OBJECTS && (
          customWindow.tarkovHost || 
          customWindow.dmaHost || 
          customWindow.externalHost || 
          customWindow.hostApp)
        ) || 
        (CONNECTION_CONFIG.CHANNELS.EXTERNAL_NOTIFY && 
          customWindow.external && 
          customWindow.external.notify
        )
      ) {
        this.updateConnectionStatus(true);
        console.log("[InteropService] Host object detected, connection established");
        
        if (this.connectionCheckInterval !== null) {
          clearInterval(this.connectionCheckInterval);
          this.connectionCheckInterval = null;
        }
        
        // Send connection acknowledgment
        if (this.sendMessageCallback) {
          this.sendMessageCallback('CONNECT', { 
            version: "1.0.0", 
            capabilities: ["settings", "radar", "esp", "aimbot"],
            timestamp: Date.now(),
            securityLevel: CONNECTION_CONFIG.SECURITY.ENCRYPT_PAYLOADS ? "encrypted" : "standard"
          });
        }
        
        // Start heartbeat
        this.startHeartbeat();
        // Start connection monitoring
        this.startConnectionMonitoring();
      }
      
      // Give up after max attempts
      if (this.connectionAttempts >= this.maxConnectionAttempts) {
        console.log("[InteropService] No host object detected after max attempts, giving up");
        if (this.connectionCheckInterval !== null) {
          clearInterval(this.connectionCheckInterval);
          this.connectionCheckInterval = null;
        }
      }
    }, CONNECTION_CONFIG.RECONNECT_INTERVAL);
  }
  
  public startHeartbeat(): void {
    // Clear any existing heartbeat
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
    }
    
    // Send heartbeat at specified interval
    this.heartbeatInterval = window.setInterval(() => {
      if (this.sendMessageCallback) {
        this.sendMessageCallback('HEARTBEAT', { 
          timestamp: Date.now(),
          sessionDuration: Date.now() - this.lastMessageTimestamp
        });
      }
    }, CONNECTION_CONFIG.HEARTBEAT_INTERVAL);
  }

  public stopHeartbeat(): void {
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
  
  private startConnectionMonitoring(): void {
    // Update the last message timestamp
    this.lastMessageTimestamp = Date.now();
    
    // Check for connection timeout
    const monitorInterval = window.setInterval(() => {
      const now = Date.now();
      // If no messages received for too long, consider disconnected
      if (now - this.lastMessageTimestamp > CONNECTION_CONFIG.HEARTBEAT_INTERVAL * 3) {
        if (this.isConnected) {
          console.log("[InteropService] Connection timeout detected");
          this.updateConnectionStatus(false);
        }
      }
    }, CONNECTION_CONFIG.HEARTBEAT_INTERVAL);
  }

  public handleConnectionStatusMessage(message: InteropMessage): void {
    // Update last message timestamp
    this.lastMessageTimestamp = Date.now();
    
    if (message.type === 'CONNECT') {
      this.updateConnectionStatus(true);
      // Start heartbeat if not already started
      this.startHeartbeat();
    } else if (message.type === 'DISCONNECT') {
      this.updateConnectionStatus(false);
      // Stop heartbeat
      this.stopHeartbeat();
    }
  }

  public updateConnectionStatus(status: boolean): void {
    const statusChanged = this.isConnected !== status;
    this.isConnected = status;
    
    if (statusChanged && this.onConnectionChangeCallback) {
      this.onConnectionChangeCallback(status);
    }
  }

  public isHostConnected(): boolean {
    return this.isConnected;
  }

  public forceConnectionStatus(status: boolean): void {
    this.updateConnectionStatus(status);
    // Reset last message timestamp if forcing connection
    if (status) {
      this.lastMessageTimestamp = Date.now();
    }
  }
}

export default new ConnectionHandler();
