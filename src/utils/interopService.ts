
/**
 * Re-export from the new module structure
 * This maintains backward compatibility
 */

import InteropService, { 
  InteropMessage, 
  InteropMessageType, 
  SettingsCategory, 
  RadarEntity 
} from './interop';

export { 
  InteropMessage, 
  InteropMessageType, 
  SettingsCategory, 
  RadarEntity 
};
export default InteropService;
