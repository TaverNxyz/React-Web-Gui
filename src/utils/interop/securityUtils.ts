
/**
 * Security utilities for the interop service
 */

import { CONNECTION_CONFIG } from './config';

export class SecurityUtils {
  // Simple XOR-based obfuscation (not true encryption, but adds some obfuscation)
  private static obfuscationKey = "DMA_INTEGRATION_KEY";
  
  /**
   * Basic payload obfuscation
   * Note: This is NOT secure encryption, just basic obfuscation
   * Use only to avoid trivial packet inspection
   */
  public static obfuscatePayload(payload: any): string {
    if (!CONNECTION_CONFIG.SECURITY.ENCRYPT_PAYLOADS) {
      return JSON.stringify(payload);
    }
    
    const payloadString = JSON.stringify(payload);
    let result = "";
    
    for (let i = 0; i < payloadString.length; i++) {
      const charCode = payloadString.charCodeAt(i);
      const keyChar = this.obfuscationKey.charCodeAt(i % this.obfuscationKey.length);
      result += String.fromCharCode(charCode ^ keyChar);
    }
    
    // Base64 encode for transport
    return btoa(result);
  }
  
  /**
   * Deobfuscate a received payload
   */
  public static deobfuscatePayload(obfuscatedData: string): any {
    if (!CONNECTION_CONFIG.SECURITY.ENCRYPT_PAYLOADS) {
      return typeof obfuscatedData === 'string' ? JSON.parse(obfuscatedData) : obfuscatedData;
    }
    
    try {
      // Base64 decode
      const decoded = atob(obfuscatedData);
      let result = "";
      
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i);
        const keyChar = this.obfuscationKey.charCodeAt(i % this.obfuscationKey.length);
        result += String.fromCharCode(charCode ^ keyChar);
      }
      
      return JSON.parse(result);
    } catch (error) {
      console.error("[SecurityUtils] Failed to deobfuscate payload:", error);
      return null;
    }
  }
  
  /**
   * Add a simple signature to messages
   * This helps verify message integrity but is not cryptographically secure
   */
  public static signMessage(message: any): string {
    if (!CONNECTION_CONFIG.SECURITY.ENABLE_MESSAGE_AUTH) {
      return "";
    }
    
    const messageStr = JSON.stringify(message);
    let hashValue = 0;
    
    // Simple string hashing algorithm
    for (let i = 0; i < messageStr.length; i++) {
      const char = messageStr.charCodeAt(i);
      hashValue = ((hashValue << 5) - hashValue) + char;
      hashValue |= 0; // Convert to 32bit integer
    }
    
    return hashValue.toString(16);
  }
  
  /**
   * Verify message signature
   */
  public static verifySignature(message: any, signature: string): boolean {
    if (!CONNECTION_CONFIG.SECURITY.ENABLE_MESSAGE_AUTH) {
      return true;
    }
    
    const calculatedSignature = this.signMessage(message);
    return calculatedSignature === signature;
  }

  /**
   * Generate a random identifier that looks like a legitimate system ID
   * Useful for session identifiers
   */
  public static generateSessionId(): string {
    const timestamp = Date.now().toString(36);
    const randomChars = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomChars}-${this.getPseudoHardwareId()}`;
  }
  
  /**
   * Generate a pseudo hardware ID that looks legitimate
   * but doesn't actually use any real hardware identifiers
   */
  private static getPseudoHardwareId(): string {
    const navigatorData = [
      navigator.userAgent,
      navigator.language,
      window.screen.colorDepth,
      window.screen.width + "x" + window.screen.height
    ].join('_');
    
    let hashValue = 0;
    
    // Simple string hashing
    for (let i = 0; i < navigatorData.length; i++) {
      const char = navigatorData.charCodeAt(i);
      hashValue = ((hashValue << 5) - hashValue) + char;
      hashValue |= 0;
    }
    
    // Format like a device ID
    return Math.abs(hashValue).toString(16).padStart(8, '0');
  }
}

export default SecurityUtils;
