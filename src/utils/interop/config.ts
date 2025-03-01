
/**
 * Configuration settings for .NET integration
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
  
  // Security settings
  SECURITY: {
    // Whether to encrypt payloads
    ENCRYPT_PAYLOADS: false,
    
    // Whether to enable message authentication
    ENABLE_MESSAGE_AUTH: false,
  },
  
  // Communication channels available
  CHANNELS: {
    WEBVIEW2: true,
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

// Network security recommendations
export const NETWORK_SECURITY_TIPS = [
  "Use TLS/HTTPS for all external API communication",
  "Implement certificate pinning for external APIs",
  "Consider using a VPN or proxy for external connections",
  "Avoid direct socket connections that bypass system proxies",
  "Use encrypted local communication between UI and backend",
  "Implement application-level message signing",
  "Randomize connection timings to avoid patterns",
  "Consider obfuscating connection metadata"
];
