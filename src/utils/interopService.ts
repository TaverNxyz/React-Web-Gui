
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
  | 'HEARTBEAT';

// Message interface
export interface InteropMessage {
  type: InteropMessageType;
  payload: any;
  timestamp: number;
}

// Settings categories
export type SettingsCategory = 'memory' | 'aimbot' | 'esp' | 'ui' | 'misc';

class InteropService {
  private static instance: InteropService;
  private isConnected: boolean = false;
  private messageHandlers: Map<InteropMessageType, ((message: InteropMessage) => void)[]> = new Map();
  
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
  }
  
  private checkForHostObjects(): void {
    // Check if host has injected any special objects for communication
    const checkInterval = setInterval(() => {
      // @ts-ignore - Check for potential objects injected by the .NET WebView host
      if (window.tarkovHost || window.dmaHost || window.externalHost) {
        this.isConnected = true;
        console.log("[InteropService] Host object detected, connection established");
        clearInterval(checkInterval);
        
        // Send connection acknowledgment
        this.sendMessage('CONNECT', { version: "1.0.0", capabilities: ["settings", "radar", "esp", "aimbot"] });
      }
    }, 500);
    
    // Only try for 10 seconds then give up
    setTimeout(() => clearInterval(checkInterval), 10000);
  }
  
  private processIncomingMessage(message: InteropMessage): void {
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
      // Try standard postMessage to parent
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(message, '*');
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
   * Check if connected to host
   */
  public isHostConnected(): boolean {
    return this.isConnected;
  }
}

export default InteropService.getInstance();
