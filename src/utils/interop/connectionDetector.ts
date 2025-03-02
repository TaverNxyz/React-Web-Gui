
/**
 * Detects available connection methods to .NET host
 */

import type { WindowWithHostObjects } from './types';
import { CONNECTION_CONFIG } from './config';

export class ConnectionDetector {
  private connectionAttempts: number = 0;
  private maxConnectionAttempts: number = CONNECTION_CONFIG.MAX_CONNECTION_ATTEMPTS;
  private connectionCheckInterval: number | null = null;
  private onConnectionDetectedCallback: (() => void) | null = null;

  constructor() {}

  public setConnectionDetectedCallback(callback: () => void): void {
    this.onConnectionDetectedCallback = callback;
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
        console.log("[ConnectionDetector] Host object detected, connection established");
        
        if (this.connectionCheckInterval !== null) {
          clearInterval(this.connectionCheckInterval);
          this.connectionCheckInterval = null;
        }
        
        if (this.onConnectionDetectedCallback) {
          this.onConnectionDetectedCallback();
        }
      }
      
      // Give up after max attempts
      if (this.connectionAttempts >= this.maxConnectionAttempts) {
        console.log("[ConnectionDetector] No host object detected after max attempts, giving up");
        if (this.connectionCheckInterval !== null) {
          clearInterval(this.connectionCheckInterval);
          this.connectionCheckInterval = null;
        }
      }
    }, CONNECTION_CONFIG.RECONNECT_INTERVAL);
  }

  public setupWebView2Detection(): boolean {
    // Access custom window properties using type assertion
    const customWindow = window as unknown as WindowWithHostObjects;
    
    // Check if window.chrome.webview is available (WebView2 integration)
    if (customWindow.chrome && customWindow.chrome.webview) {
      console.log("[ConnectionDetector] WebView2 detected");
      
      // Listen for messages from the .NET host via WebView2
      customWindow.chrome.webview.addEventListener('message', (event: any) => {
        // Note: Message handling will be done in the ConnectionHandler
      });
      
      return true;
    }
    
    return false;
  }

  public cleanup(): void {
    if (this.connectionCheckInterval !== null) {
      clearInterval(this.connectionCheckInterval);
      this.connectionCheckInterval = null;
    }
  }
}

export default ConnectionDetector;
