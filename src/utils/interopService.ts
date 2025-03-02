
/**
 * Re-export from the new module structure
 * This maintains backward compatibility
 */

import InteropService from './interop';
import type { 
  InteropMessage, 
  InteropMessageType, 
  SettingsCategory, 
  RadarEntity 
} from './interop/types';

export type { 
  InteropMessage, 
  InteropMessageType, 
  SettingsCategory, 
  RadarEntity 
};
export default InteropService;
