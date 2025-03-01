
/**
 * Type definitions for the interop service
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
  | 'ENTITY_UPDATE';

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
}
