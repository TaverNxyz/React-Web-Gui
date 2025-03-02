
/**
 * Enhanced security utilities for the interop service
 * Adds secure message exchange for .NET WebView2 integration
 */

import { CONNECTION_CONFIG } from './config';

export class SecurityUtils {
  // Use a stronger obfuscation key for production
  private static obfuscationKey = "SECURE_WEBVIEW2_INTEGRATION_KEY";
  
  /**
   * Enhanced payload obfuscation
   * More secure than the previous implementation
   */
  public static obfuscatePayload(payload: any): string {
    if (!CONNECTION_CONFIG.SECURITY.ENCRYPT_PAYLOADS) {
      return JSON.stringify(payload);
    }
    
    const payloadString = JSON.stringify(payload);
    let result = "";
    
    // Add a random salt to the beginning to prevent identical payloads
    // from producing identical obfuscated results
    const salt = Math.random().toString(36).substring(2, 10);
    result = salt;
    
    // More complex XOR with rotating key
    for (let i = 0; i < payloadString.length; i++) {
      const charCode = payloadString.charCodeAt(i);
      const keyIndex = (i + salt.length) % this.obfuscationKey.length;
      const keyChar = this.obfuscationKey.charCodeAt(keyIndex);
      result += String.fromCharCode(charCode ^ keyChar);
    }
    
    // Base64 encode for transport
    return btoa(result);
  }
  
  /**
   * Enhanced deobfuscation of a received payload
   */
  public static deobfuscatePayload(obfuscatedData: string): any {
    if (!CONNECTION_CONFIG.SECURITY.ENCRYPT_PAYLOADS) {
      return typeof obfuscatedData === 'string' ? JSON.parse(obfuscatedData) : obfuscatedData;
    }
    
    try {
      // Base64 decode
      const decoded = atob(obfuscatedData);
      
      // Extract the salt (first 8 characters)
      const salt = decoded.substring(0, 8);
      const encodedPayload = decoded.substring(8);
      
      let result = "";
      
      // Reverse the XOR operation with rotating key
      for (let i = 0; i < encodedPayload.length; i++) {
        const charCode = encodedPayload.charCodeAt(i);
        const keyIndex = (i + salt.length) % this.obfuscationKey.length;
        const keyChar = this.obfuscationKey.charCodeAt(keyIndex);
        result += String.fromCharCode(charCode ^ keyChar);
      }
      
      return JSON.parse(result);
    } catch (error) {
      console.error("[SecurityUtils] Failed to deobfuscate payload:", error);
      return null;
    }
  }
  
  /**
   * Improved message signing with HMAC-like approach
   */
  public static signMessage(message: any): string {
    if (!CONNECTION_CONFIG.SECURITY.ENABLE_MESSAGE_AUTH) {
      return "";
    }
    
    const messageStr = JSON.stringify(message);
    let hashValue = 0;
    
    // More complex hashing algorithm (still not cryptographically secure,
    // but better than the simple implementation)
    for (let i = 0; i < messageStr.length; i++) {
      const char = messageStr.charCodeAt(i);
      hashValue = ((hashValue << 5) - hashValue + char) * 1566083941;
      hashValue = hashValue & hashValue; // Convert to 32bit integer
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
   * Generate a session ID with additional security measures
   */
  public static generateSessionId(): string {
    const timestamp = Date.now().toString(36);
    const randomChars = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return `${timestamp}-${randomChars}-${this.getPseudoHardwareId()}`;
  }
  
  /**
   * Generate a pseudo hardware ID based on browser characteristics
   * Does not collect personally identifiable information
   */
  private static getPseudoHardwareId(): string {
    const navigatorData = [
      navigator.userAgent,
      navigator.language,
      window.screen.colorDepth,
      window.screen.width + "x" + window.screen.height,
      new Date().getTimezoneOffset()
    ].join('_');
    
    let hashValue = 0;
    
    // Hash the navigator data
    for (let i = 0; i < navigatorData.length; i++) {
      const char = navigatorData.charCodeAt(i);
      hashValue = ((hashValue << 5) - hashValue) + char;
      hashValue |= 0;
    }
    
    // Format like a device ID
    return Math.abs(hashValue).toString(16).padStart(8, '0');
  }
  
  /**
   * Generate a secure challenge response for authentication
   * Can be used when connecting to the .NET host
   */
  public static generateChallengeResponse(challenge: string): string {
    const timestamp = Date.now().toString();
    const combined = challenge + this.obfuscationKey + timestamp;
    
    let hashValue = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hashValue = ((hashValue << 5) - hashValue) + char;
      hashValue |= 0;
    }
    
    return hashValue.toString(16) + "." + timestamp;
  }
}

export default SecurityUtils;
