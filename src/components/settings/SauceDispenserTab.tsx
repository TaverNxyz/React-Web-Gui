
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface SauceDispenserTabProps {
  memoryEnabled: boolean;
  setMemoryEnabled: (value: boolean) => void;
  advancedMemoryEnabled: boolean;
  setAdvancedMemoryEnabled: (value: boolean) => void;
  antiPageEnabled: boolean;
  setAntiPageEnabled: (value: boolean) => void;
  infiniteStaminaEnabled: boolean;
  setInfiniteStaminaEnabled: (value: boolean) => void;
  fastLoadEnabled: boolean;
  setFastLoadEnabled: (value: boolean) => void;
  lootThroughWallsEnabled: boolean;
  setLootThroughWallsEnabled: (value: boolean) => void;
  hideRaidInfoEnabled: boolean;
  setHideRaidInfoEnabled: (value: boolean) => void;
  disableInventoryBlurEnabled: boolean;
  setDisableInventoryBlurEnabled: (value: boolean) => void;
  moveSpeedEnabled: boolean;
  setMoveSpeedEnabled: (value: boolean) => void;
  noWrapMalfunctionsEnabled: boolean;
  setNoWrapMalfunctionsEnabled: (value: boolean) => void;
  fullBrightEnabled: boolean;
  setFullBrightEnabled: (value: boolean) => void;
  rageModeEnabled: boolean;
  setRageModeEnabled: (value: boolean) => void;
  gymHackEnabled: boolean;
  setGymHackEnabled: (value: boolean) => void;
  antiAFKEnabled: boolean;
  setAntiAFKEnabled: (value: boolean) => void;
}

const SauceDispenserTab: React.FC<SauceDispenserTabProps> = ({
  memoryEnabled,
  setMemoryEnabled,
  advancedMemoryEnabled,
  setAdvancedMemoryEnabled,
  antiPageEnabled,
  setAntiPageEnabled,
  infiniteStaminaEnabled,
  setInfiniteStaminaEnabled,
  fastLoadEnabled,
  setFastLoadEnabled,
  lootThroughWallsEnabled,
  setLootThroughWallsEnabled,
  hideRaidInfoEnabled,
  setHideRaidInfoEnabled,
  disableInventoryBlurEnabled,
  setDisableInventoryBlurEnabled,
  moveSpeedEnabled,
  setMoveSpeedEnabled,
  noWrapMalfunctionsEnabled,
  setNoWrapMalfunctionsEnabled,
  fullBrightEnabled,
  setFullBrightEnabled,
  rageModeEnabled,
  setRageModeEnabled,
  gymHackEnabled,
  setGymHackEnabled,
  antiAFKEnabled,
  setAntiAFKEnabled,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">Sauce Dispenser Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="memoryEnabled"
            checked={memoryEnabled}
            onCheckedChange={(checked) => setMemoryEnabled(!!checked)}
          />
          <label
            htmlFor="memoryEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enable Sauce Dispenser
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="advancedMemoryEnabled"
            checked={advancedMemoryEnabled}
            onCheckedChange={(checked) => setAdvancedMemoryEnabled(!!checked)}
          />
          <label
            htmlFor="advancedMemoryEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enable Advanced MemWrites (Very Risky)
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="antiPageEnabled"
            checked={antiPageEnabled}
            onCheckedChange={(checked) => setAntiPageEnabled(!!checked)}
          />
          <label
            htmlFor="antiPageEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Anti-Page
          </label>
        </div>
      </div>
      
      {/* Additional features */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-cyan-400 mb-2">Additional Features</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="infiniteStaminaEnabled"
              checked={infiniteStaminaEnabled}
              onCheckedChange={(checked) => setInfiniteStaminaEnabled(!!checked)}
            />
            <label
              htmlFor="infiniteStaminaEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Infinite Stamina (Risky)
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fastLoadEnabled"
              checked={fastLoadEnabled}
              onCheckedChange={(checked) => setFastLoadEnabled(!!checked)}
            />
            <label
              htmlFor="fastLoadEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Fast Load/Unload
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="moveSpeedEnabled"
              checked={moveSpeedEnabled}
              onCheckedChange={(checked) => setMoveSpeedEnabled(!!checked)}
            />
            <label
              htmlFor="moveSpeedEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              1.2x Move Speed (Risky)
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="noWrapMalfunctionsEnabled"
              checked={noWrapMalfunctionsEnabled}
              onCheckedChange={(checked) => setNoWrapMalfunctionsEnabled(!!checked)}
            />
            <label
              htmlFor="noWrapMalfunctionsEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              No Weapon Malfunctions
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hideRaidInfoEnabled"
              checked={hideRaidInfoEnabled}
              onCheckedChange={(checked) => setHideRaidInfoEnabled(!!checked)}
            />
            <label
              htmlFor="hideRaidInfoEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hide Raid Info
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="disableInventoryBlurEnabled"
              checked={disableInventoryBlurEnabled}
              onCheckedChange={(checked) => setDisableInventoryBlurEnabled(!!checked)}
            />
            <label
              htmlFor="disableInventoryBlurEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Disable Inventory Blur
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullBrightEnabled"
              checked={fullBrightEnabled}
              onCheckedChange={(checked) => setFullBrightEnabled(!!checked)}
            />
            <label
              htmlFor="fullBrightEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Full Bright
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rageModeEnabled"
              checked={rageModeEnabled}
              onCheckedChange={(checked) => setRageModeEnabled(!!checked)}
            />
            <label
              htmlFor="rageModeEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Rage Mode (Risky)
            </label>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-medium text-cyan-400 mb-2">Toggle Options</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="bg-slate-800 border-slate-700 hover:bg-slate-700"
              onClick={() => setAntiAFKEnabled(!antiAFKEnabled)}
            >
              Anti-AFK {antiAFKEnabled ? '(ON)' : '(OFF)'}
            </Button>
            <Button 
              variant="outline" 
              className="bg-slate-800 border-slate-700 hover:bg-slate-700"
              onClick={() => setGymHackEnabled(!gymHackEnabled)}
            >
              Gym Hack {gymHackEnabled ? '(ON)' : '(OFF)'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-cyan-400 mb-2">Web Radar Server</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bind IP</label>
            <input 
              type="text" 
              placeholder="192.168.1.72" 
              className="w-full p-2 rounded-md bg-slate-800 border border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Port</label>
            <input 
              type="text" 
              placeholder="57777" 
              className="w-full p-2 rounded-md bg-slate-800 border border-slate-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SauceDispenserTab;
