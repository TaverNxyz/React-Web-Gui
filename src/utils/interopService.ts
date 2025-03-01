
/**
 * InteropService - Facilitates communication between the React UI and .NET application
 * This service uses a message-based approach for secure, undetectable communication
 */

// Define message types for type safety
export type InteropMessageType = 
  | 'SETTINGS_UPDATE' 
  | 'FEATURE_TOGGLE' 
  | 'RADAR_DATA' 
  | 'SYSTEM_STATUS'
  | 'CONNECT'
  | 'DISCONNECT'
  | 'HEARTBEAT'
  | 'ENTITY_UPDATE';  // Added for radar entity updates

// Message interface
export interface InteropMessage {
  type: InteropMessageType;
  payload: any;
  timestamp: number;
}

// Settings categories
export type SettingsCategory = 'memory' | 'aimbot' | 'esp' | 'ui' | 'misc';

// Define radar entity interface for type safety
export interface RadarEntity {
  id: string;
  x: number;
  y: number;
  z?: number;
  type: 'hostile' | 'friendly' | 'neutral' | 'unknown';
  distance: number;
  heading: number;
  speed?: number;
  name?: string;
  health?: number;
  metadata?: Record<string, any>;
}

class InteropService {
  private static instance: InteropService;
  private isConnected: boolean = false;
  private messageHandlers: Map<InteropMessageType, ((message: InteropMessage) => void)[]> = new Map();
  private connectionAttempts: number = 0;
  private maxConnectionAttempts: number = 20; // Try for 10 seconds at 500ms intervals
  private heartbeatInterval: number | null = null;
  
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
    this.checkForHostObjects();
    
    // Listen for WebView2 specific .NET integration
    this.setupWebView2Integration();
  }
  
  private setupWebView2Integration(): void {
    // Check if window.chrome.webview is available (WebView2 integration)
    // @ts-ignore - WebView2 specific API
    if (window.chrome && window.chrome.webview) {
      console.log("[InteropService] WebView2 detected, setting up direct communication");
      
      // Listen for messages from the .NET host via WebView2
      // @ts-ignore - WebView2 specific API
      window.chrome.webview.addEventListener('message', (event: any) => {
        try {
          const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          
          if (!message || !message.type) return;
          
          // Process incoming message
          this.processIncomingMessage(message as InteropMessage);
        } catch (error) {
          console.error("[InteropService] Error processing WebView2 message:", error);
        }
      });
      
      // Notify .NET host that we're ready
      this.isConnected = true;
      this.sendMessage('CONNECT', { 
        version: "1.0.0", 
        capabilities: ["settings", "radar", "esp", "aimbot"],
        timestamp: Date.now()
      });
      
      // Start heartbeat
      this.startHeartbeat();
    }
  }
  
  private checkForHostObjects(): void {
    // Check if host has injected any special objects for communication
    const checkInterval = setInterval(() => {
      // Increment connection attempts
      this.connectionAttempts++;
      
      // Check for common .NET WebView host object patterns
      // @ts-ignore - Check for potential objects injected by the .NET WebView host
      if (
        window.tarkovHost || 
        window.dmaHost || 
        window.externalHost || 
        window.hostApp || 
        window.external?.notify || 
        // @ts-ignore - WPF/WinForms WebBrowser control
        window.external?.hostApp
      ) {
        this.isConnected = true;
        console.log("[InteropService] Host object detected, connection established");
        clearInterval(checkInterval);
        
        // Send connection acknowledgment
        this.sendMessage('CONNECT', { 
          version: "1.0.0", 
          capabilities: ["settings", "radar", "esp", "aimbot"],
          timestamp: Date.now()
        });
        
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
  
  private startHeartbeat(): void {
    // Clear any existing heartbeat
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
    }
    
    // Send heartbeat every 5 seconds
    this.heartbeatInterval = window.setInterval(() => {
      this.sendMessage('HEARTBEAT', { timestamp: Date.now() });
    }, 5000);
  }
  
  private processIncomingMessage(message: InteropMessage): void {
    console.log(`[InteropService] Received message: ${message.type}`);
    
    // Handle some system messages internally
    if (message.type === 'CONNECT') {
      this.isConnected = true;
      // Start heartbeat if not already started
      this.startHeartbeat();
    } else if (message.type === 'DISCONNECT') {
      this.isConnected = false;
      // Stop heartbeat
      if (this.heartbeatInterval !== null) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
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
  
  // Public methods
  
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
   * Send a message to the host application
   */
  public sendMessage(type: InteropMessageType, payload: any): void {
    const message: InteropMessage = {
      type,
      payload,
      timestamp: Date.now()
    };
    
    try {
      // Try WebView2 communication first (most modern .NET + WebView2 integration)
      // @ts-ignore - WebView2 specific API
      if (window.chrome && window.chrome.webview) {
        // @ts-ignore - WebView2 specific API
        window.chrome.webview.postMessage(JSON.stringify(message));
      }
      
      // Try standard postMessage to parent
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(message, '*');
      }
      
      // Try WPF/WinForms WebBrowser control
      // @ts-ignore
      if (window.external && typeof window.external.notify === 'function') {
        // @ts-ignore
        window.external.notify(JSON.stringify(message));
      }
      
      // Try any injected host objects
      // @ts-ignore - These properties would be injected by the .NET host
      if (window.tarkovHost && typeof window.tarkovHost.receiveMessage === 'function') {
        // @ts-ignore
        window.tarkovHost.receiveMessage(JSON.stringify(message));
      }
      
      // @ts-ignore
      if (window.dmaHost && typeof window.dmaHost.receiveMessage === 'function') {
        // @ts-ignore
        window.dmaHost.receiveMessage(JSON.stringify(message));
      }
      
      // @ts-ignore
      if (window.externalHost && typeof window.externalHost.receiveMessage === 'function') {
        // @ts-ignore
        window.externalHost.receiveMessage(JSON.stringify(message));
      }
      
      // @ts-ignore
      if (window.hostApp && typeof window.hostApp.receiveMessage === 'function') {
        // @ts-ignore
        window.hostApp.receiveMessage(JSON.stringify(message));
      }
      
      console.log(`[InteropService] Sent message: ${type}`);
    } catch (error) {
      console.error("[InteropService] Error sending message:", error);
    }
  }
  
  /**
   * Update settings in the host application
   */
  public updateSettings(category: SettingsCategory, settingsData: any): void {
    this.sendMessage('SETTINGS_UPDATE', {
      category,
      settings: settingsData
    });
  }
  
  /**
   * Toggle a feature in the host application
   */
  public toggleFeature(featureName: string, enabled: boolean): void {
    this.sendMessage('FEATURE_TOGGLE', {
      feature: featureName,
      enabled
    });
  }
  
  /**
   * Update radar entities (can be called by .NET host)
   */
  public updateRadarEntities(entities: RadarEntity[]): void {
    // This method would typically be called by the .NET host
    // but we expose it for testing and direct calls
    const message: InteropMessage = {
      type: 'ENTITY_UPDATE',
      payload: { entities },
      timestamp: Date.now()
    };
    
    this.processIncomingMessage(message);
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
  
  /**
   * Check if connected to host
   */
  public isHostConnected(): boolean {
    return this.isConnected;
  }
  
  /**
   * Force connection status (useful for development/testing)
   */
  public forceConnectionStatus(status: boolean): void {
    this.isConnected = status;
    
    // Trigger appropriate events
    if (status) {
      this.processIncomingMessage({
        type: 'CONNECT',
        payload: { forced: true },
        timestamp: Date.now()
      });
    } else {
      this.processIncomingMessage({
        type: 'DISCONNECT',
        payload: { forced: true },
        timestamp: Date.now()
      });
    }
  }
}

export default InteropService.getInstance();
