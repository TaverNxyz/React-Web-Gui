
/**
 * Handles heartbeat monitoring for .NET integration
 */

import { CONNECTION_CONFIG } from './config';

export class HeartbeatMonitor {
  private heartbeatInterval: number | null = null;
  private lastMessageTimestamp: number = 0;
  private connectionMonitorInterval: number | null = null;
  private onConnectionLostCallback: (() => void) | null = null;

  constructor() {
    this.lastMessageTimestamp = Date.now();
  }

  public setConnectionLostCallback(callback: () => void): void {
    this.onConnectionLostCallback = callback;
  }

  public updateLastMessageTimestamp(): void {
    this.lastMessageTimestamp = Date.now();
  }

  public startHeartbeat(sendHeartbeatCallback: () => void): void {
    // Clear any existing heartbeat
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
    }
    
    // Send heartbeat at specified interval
    this.heartbeatInterval = window.setInterval(() => {
      sendHeartbeatCallback();
    }, CONNECTION_CONFIG.HEARTBEAT_INTERVAL);
  }

  public stopHeartbeat(): void {
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
  
  public startConnectionMonitoring(): void {
    // Update the last message timestamp
    this.lastMessageTimestamp = Date.now();
    
    // Check for connection timeout
    this.connectionMonitorInterval = window.setInterval(() => {
      const now = Date.now();
      // If no messages received for too long, consider disconnected
      if (now - this.lastMessageTimestamp > CONNECTION_CONFIG.HEARTBEAT_INTERVAL * 3) {
        if (this.onConnectionLostCallback) {
          console.log("[HeartbeatMonitor] Connection timeout detected");
          this.onConnectionLostCallback();
        }
      }
    }, CONNECTION_CONFIG.HEARTBEAT_INTERVAL);
  }

  public stopConnectionMonitoring(): void {
    if (this.connectionMonitorInterval !== null) {
      clearInterval(this.connectionMonitorInterval);
      this.connectionMonitorInterval = null;
    }
  }

  public cleanup(): void {
    this.stopHeartbeat();
    this.stopConnectionMonitoring();
  }
}

export default HeartbeatMonitor;
