
/**
 * Enhanced type definitions for the WebView2 interop service
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
  | 'ENTITY_UPDATE'
  | 'AUTH_REQUEST'
  | 'AUTH_RESPONSE'
  | 'AUTH_CHALLENGE'
  | 'AUTH_CHALLENGE_RESPONSE'
  | 'AUTH_REFRESH'
  | 'LOG_EVENT';

// Enhanced message interface with authentication support
export interface InteropMessage {
  type: InteropMessageType;
  payload: any;
  timestamp: number;
  sessionId?: string;
  correlationId?: string;
  signature?: string;
  authToken?: string;
  error?: string;
  securityLevel?: number;
  version?: string;
}

// Authentication request interface
export interface AuthRequest {
  username: string;
  password: string;
  challenge?: string;
  deviceInfo?: DeviceInfo;
}

// Authentication response interface
export interface AuthResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  expiresAt?: number;
  userId?: string;
  username?: string;
  errorMessage?: string;
  errorCode?: string;
  authLevel?: number;
}

// Device information for authentication
export interface DeviceInfo {
  platform: string;
  userAgent: string;
  screenSize: string;
  language: string;
  timeZone: string;
  deviceId: string;
}

// Settings categories
export type SettingsCategory = 'memory' | 'aimbot' | 'esp' | 'ui' | 'misc' | 'auth';

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

// Define custom host object types to avoid TypeScript errors
export interface CustomExternal {
  notify?: (message: string) => void;
  hostApp?: any;
}

// Define custom interfaces for .NET host object integration
export interface WindowWithHostObjects {
  tarkovHost?: {
    receiveMessage: (message: string) => void;
  };
  dmaHost?: {
    receiveMessage: (message: string) => void;
  };
  externalHost?: {
    receiveMessage: (message: string) => void;
  };
  hostApp?: {
    receiveMessage: (message: string) => void;
  };
  external?: CustomExternal;
  chrome?: {
    webview?: {
      addEventListener: (event: string, callback: (event: any) => void) => void;
      postMessage: (message: string) => void;
    }
  };
  secureHost?: {
    authenticate: (username: string, password: string) => string;
    receiveMessage: (message: string) => void;
    getChallengeToken: () => string;
  };
}

// User data interface
export interface UserData {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
  role: 'admin' | 'user' | 'guest';
  permissions: string[];
  lastLogin?: number;
  isActive: boolean;
}

// Log event interface for activity logging
export interface LogEvent {
  eventType: 'info' | 'warning' | 'error' | 'auth' | 'system';
  message: string;
  details?: any;
  userId?: string;
  timestamp: number;
  source: 'ui' | 'host' | 'system';
}
