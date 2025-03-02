
/**
 * Connection handling for .NET integration
 * Coordinates connection detection, heartbeat monitoring and status management
 */

import type { InteropMessage, InteropMessageType, WindowWithHostObjects } from './types';
import { CONNECTION_CONFIG } from './config';
import HeartbeatMonitor from './heartbeatMonitor';
import ConnectionDetector from './connectionDetector';

export class ConnectionHandler {
  private isConnected: boolean = false;
  private onConnectionChangeCallback: ((connected: boolean) => void) | null = null;
  private sendMessageCallback: ((type: InteropMessageType, payload: Record<string, unknown>) => void) | null = null;
  private heartbeatMonitor: HeartbeatMonitor;
  private connectionDetector: ConnectionDetector;

  constructor() {
    this.heartbeatMonitor = new HeartbeatMonitor();
    this.connectionDetector = new ConnectionDetector();
    
    // Set up callbacks
    this.heartbeatMonitor.setConnectionLostCallback(() => {
      this.updateConnectionStatus(false);
    });
    
    this.connectionDetector.setConnectionDetectedCallback(() => {
      this.establishConnection();
    });
  }

  public setCallbacks(
    onConnectionChange: (connected: boolean) => void,
    sendMessage: (type: InteropMessageType, payload: Record<string, unknown>) => void
  ) {
    this.onConnectionChangeCallback = onConnectionChange;
    this.sendMessageCallback = sendMessage;
  }

  public setupWebView2Integration(): void {
    const isWebView2Available = this.connectionDetector.setupWebView2Detection();
    
    if (isWebView2Available) {
      // Access custom window properties using type assertion
      const customWindow = window as unknown as WindowWithHostObjects;
      
      // Listen for messages from the .NET host via WebView2
      if (customWindow.chrome && customWindow.chrome.webview) {
        customWindow.chrome.webview.addEventListener('message', (event: any) => {
          try {
            const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            
            if (!message || !message.type) return;
            
            // Update last message timestamp
            this.heartbeatMonitor.updateLastMessageTimestamp();
            
            // Process incoming message using callback
            if (this.sendMessageCallback) {
              this.handleConnectionStatusMessage(message as InteropMessage);
            }
          } catch (error) {
            console.error("[ConnectionHandler] Error processing WebView2 message:", error);
          }
        });
      }
      
      // Establish connection
      this.establishConnection();
    }
  }

  private establishConnection(): void {
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
    
    // Start heartbeat and connection monitoring
    this.startMonitoring();
  }
  
  private startMonitoring(): void {
    // Start heartbeat
    if (this.sendMessageCallback) {
      this.heartbeatMonitor.startHeartbeat(() => {
        if (this.sendMessageCallback) {
          const lastTimestamp = this.heartbeatMonitor.getLastMessageTimestamp();
          const currentTime = Date.now();
          
          this.sendMessageCallback('HEARTBEAT', { 
            timestamp: currentTime,
            sessionDuration: currentTime - lastTimestamp
          });
        }
      });
    }
    
    // Start connection monitoring
    this.heartbeatMonitor.startConnectionMonitoring();
  }
  
  public checkForHostObjects(): void {
    this.connectionDetector.checkForHostObjects();
  }

  public handleConnectionStatusMessage(message: InteropMessage): void {
    // Update last message timestamp
    this.heartbeatMonitor.updateLastMessageTimestamp();
    
    if (message.type === 'CONNECT') {
      this.updateConnectionStatus(true);
      // Start heartbeat if not already started
      this.startMonitoring();
    } else if (message.type === 'DISCONNECT') {
      this.updateConnectionStatus(false);
      // Stop heartbeat
      this.heartbeatMonitor.stopHeartbeat();
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
      this.heartbeatMonitor.updateLastMessageTimestamp();
    }
  }
}

export default new ConnectionHandler();
