
/**
 * Handles the actual transport of messages to the .NET host
 */

import type { InteropMessage, WindowWithHostObjects } from './types';
import { CONNECTION_CONFIG } from './config';

export class MessageTransport {
  /**
   * Send a message to the host via available channels
   */
  public sendMessageToHost(messageToSend: string): boolean {
    try {
      // Access custom window properties using type assertion
      const customWindow = window as unknown as WindowWithHostObjects;
      
      let sent = false;
      
      // Try WebView2 communication first (most modern .NET + WebView2 integration)
      if (CONNECTION_CONFIG.CHANNELS.WEBVIEW2 && customWindow.chrome && customWindow.chrome.webview) {
        customWindow.chrome.webview.postMessage(messageToSend);
        sent = true;
      }
      
      // Try standard postMessage to parent
      if (!sent && CONNECTION_CONFIG.CHANNELS.PARENT_WINDOW && window.parent && window.parent !== window) {
        window.parent.postMessage(JSON.parse(messageToSend), '*');
        sent = true;
      }
      
      // Try WPF/WinForms WebBrowser control
      if (!sent && CONNECTION_CONFIG.CHANNELS.EXTERNAL_NOTIFY && 
          customWindow.external && typeof customWindow.external.notify === 'function') {
        customWindow.external.notify(messageToSend);
        sent = true;
      }
      
      // Try any injected host objects
      if (!sent && CONNECTION_CONFIG.CHANNELS.CUSTOM_OBJECTS) {
        if (customWindow.tarkovHost && typeof customWindow.tarkovHost.receiveMessage === 'function') {
          customWindow.tarkovHost.receiveMessage(messageToSend);
          sent = true;
        } else if (customWindow.dmaHost && typeof customWindow.dmaHost.receiveMessage === 'function') {
          customWindow.dmaHost.receiveMessage(messageToSend);
          sent = true;
        } else if (customWindow.externalHost && typeof customWindow.externalHost.receiveMessage === 'function') {
          customWindow.externalHost.receiveMessage(messageToSend);
          sent = true;
        } else if (customWindow.hostApp && typeof customWindow.hostApp.receiveMessage === 'function') {
          customWindow.hostApp.receiveMessage(messageToSend);
          sent = true;
        }
      }
      
      if (CONNECTION_CONFIG.DEBUG.LOG_MESSAGES && sent) {
        console.log(`[MessageTransport] Sent message via transport channel`);
      } else if (!sent) {
        console.warn(`[MessageTransport] Failed to send message - No available channels`);
      }
      
      return sent;
    } catch (error) {
      console.error("[MessageTransport] Error sending message:", error);
      return false;
    }
  }
}

export default MessageTransport;
