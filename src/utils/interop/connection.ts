
/**
 * Connection handling for .NET integration
 */

import type { InteropMessage, WindowWithHostObjects } from './types';

export class ConnectionHandler {
  private isConnected: boolean = false;
  private connectionAttempts: number = 0;
  private maxConnectionAttempts: number = 20; // Try for 10 seconds at 500ms intervals
  private heartbeatInterval: number | null = null;
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
          timestamp: Date.now()
        });
      }
      
      // Start heartbeat
      this.startHeartbeat();
    }
  }
  
  public checkForHostObjects(): void {
    // Access custom window properties using type assertion
    const customWindow = window as unknown as WindowWithHostObjects;
    
    // Check if host has injected any special objects for communication
    const checkInterval = setInterval(() => {
      // Increment connection attempts
      this.connectionAttempts++;
      
      // Check for common .NET WebView host object patterns
      if (
        customWindow.tarkovHost || 
        customWindow.dmaHost || 
        customWindow.externalHost || 
        customWindow.hostApp || 
        (customWindow.external && customWindow.external.notify) || 
        (customWindow.external && customWindow.external.hostApp)
      ) {
        this.updateConnectionStatus(true);
        console.log("[InteropService] Host object detected, connection established");
        clearInterval(checkInterval);
        
        // Send connection acknowledgment
        if (this.sendMessageCallback) {
          this.sendMessageCallback('CONNECT', { 
            version: "1.0.0", 
            capabilities: ["settings", "radar", "esp", "aimbot"],
            timestamp: Date.now()
          });
        }
        
        // Start heartbeat
        this.startHeartbeat();
      }
      
      // Give up after max attempts
      if (this.connectionAttempts >= this.maxConnectionAttempts) {
        console.log("[InteropService] No host object detected after max attempts, giving up");
        clearInterval(checkInterval);
      }
    }, 500);
  }
  
  public startHeartbeat(): void {
    // Clear any existing heartbeat
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
    }
    
    // Send heartbeat every 5 seconds
    this.heartbeatInterval = window.setInterval(() => {
      if (this.sendMessageCallback) {
        this.sendMessageCallback('HEARTBEAT', { timestamp: Date.now() });
      }
    }, 5000);
  }

  public stopHeartbeat(): void {
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  public handleConnectionStatusMessage(message: InteropMessage): void {
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
  }
}

export default new ConnectionHandler();
