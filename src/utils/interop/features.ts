
/**
 * Feature-specific interop methods
 */

import type { SettingsCategory, RadarEntity } from './types';
import messagingService from './messagingService';

export class FeatureService {
  /**
   * Update settings in the host application
   */
  public updateSettings(category: SettingsCategory, settingsData: any): void {
    messagingService.sendMessage('SETTINGS_UPDATE', {
      category,
      settings: settingsData
    });
  }
  
  /**
   * Toggle a feature in the host application
   */
  public toggleFeature(featureName: string, enabled: boolean): void {
    messagingService.sendMessage('FEATURE_TOGGLE', {
      feature: featureName,
      enabled
    });
  }
  
  /**
   * Update radar entities (can be called by .NET host)
   */
  public updateRadarEntities(entities: RadarEntity[]): void {
    // This method would typically be called by the .NET host
    // but we expose it for testing and direct calls
    messagingService.simulateIncomingMessage('ENTITY_UPDATE', { entities });
  }
}

export default new FeatureService();
