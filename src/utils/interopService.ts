
/**
 * Re-export from the new module structure
 * This maintains backward compatibility
 */

import InteropService from './interop';
import type { 
  InteropMessage, 
  InteropMessageType, 
  SettingsCategory, 
  RadarEntity,
  AuthRequest,
  AuthResponse
} from './interop/types';

export type { 
  InteropMessage, 
  InteropMessageType, 
  SettingsCategory, 
  RadarEntity,
  AuthRequest,
  AuthResponse
};
export default InteropService;
