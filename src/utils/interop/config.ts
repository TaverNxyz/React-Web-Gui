
/**
 * Enhanced configuration settings for .NET WebView2 integration
 */

export const CONNECTION_CONFIG = {
  // How long to wait between connection attempts (ms)
  RECONNECT_INTERVAL: 500,
  
  // Maximum number of connection attempts before giving up
  MAX_CONNECTION_ATTEMPTS: 20,
  
  // Heartbeat interval (ms)
  HEARTBEAT_INTERVAL: 5000,
  
  // Timeout for waiting for response (ms)
  RESPONSE_TIMEOUT: 3000,
  
  // Security settings - Enhanced for WebView2 integration
  SECURITY: {
    // Whether to encrypt payloads - Enable for production
    ENCRYPT_PAYLOADS: true,
    
    // Whether to enable message authentication
    ENABLE_MESSAGE_AUTH: true,
    
    // Whether to use challenge-response for authentication
    ENABLE_CHALLENGE_RESPONSE: true,
    
    // Auth scheme to use - "none", "basic", or "challenge"
    AUTH_SCHEME: "challenge",
    
    // Token refresh interval (ms)
    TOKEN_REFRESH_INTERVAL: 60000 * 15, // 15 minutes
  },
  
  // Communication channels available
  CHANNELS: {
    // WebView2 is the preferred channel for .NET integration
    WEBVIEW2: true,
    
    // Fallback channels
    PARENT_WINDOW: true,
    EXTERNAL_NOTIFY: true,
    CUSTOM_OBJECTS: true,
  },
  
  // Debug mode settings
  DEBUG: {
    VERBOSE_LOGGING: false,
    LOG_MESSAGES: false,
    SIMULATE_LATENCY: false,
    SIMULATE_LATENCY_MS: 100,
  }
};

// Enhanced network security recommendations
export const NETWORK_SECURITY_TIPS = [
  "Use TLS/HTTPS for all external API communication",
  "Implement certificate pinning for external APIs",
  "Consider using a VPN or proxy for external connections",
  "Avoid direct socket connections that bypass system proxies",
  "Use encrypted local communication between UI and backend",
  "Implement application-level message signing",
  "Randomize connection timings to avoid patterns",
  "Consider obfuscating connection metadata",
  "Use challenge-response for WebView2 authentication",
  "Implement token-based authentication with short-lived tokens",
  "Add rate limiting on authentication attempts",
  "Monitor and log unusual connection patterns",
];

// Authentication related configurations
export const AUTH_CONFIG = {
  // Maximum failed login attempts before temporary lockout
  MAX_LOGIN_ATTEMPTS: 5,
  
  // Lockout duration after exceeding max attempts (minutes)
  LOCKOUT_DURATION: 15,
  
  // Token expiration time (minutes)
  TOKEN_EXPIRATION: 60,
  
  // Allow biometric authentication if available
  ALLOW_BIOMETRIC: true,
  
  // When true, send authentication state in every message
  PERSISTENT_AUTH: true,
  
  // Required authentication level (0-3, where 3 is highest)
  AUTH_LEVEL: 2,
};
