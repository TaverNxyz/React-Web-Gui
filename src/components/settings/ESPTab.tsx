
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface ESPTabProps {
  espEnabled: boolean;
  setEspEnabled: (value: boolean) => void;
  itemEspEnabled: boolean;
  setItemEspEnabled: (value: boolean) => void;
  thermalVisionEnabled: boolean;
  setThermalVisionEnabled: (value: boolean) => void;
  nightVisionEnabled: boolean;
  setNightVisionEnabled: (value: boolean) => void;
  alwaysDayEnabled: boolean;
  setAlwaysDayEnabled: (value: boolean) => void;
  wideLeanEnabled: boolean;
  setWideLeanEnabled: (value: boolean) => void;
  lootThroughWallsEnabled: boolean;
  setLootThroughWallsEnabled: (value: boolean) => void;
  playerDistance: number[];
  setPlayerDistance: (value: number[]) => void;
  itemDistance: number[];
  setItemDistance: (value: number[]) => void;
}

const ESPTab: React.FC<ESPTabProps> = ({
  espEnabled,
  setEspEnabled,
  itemEspEnabled,
  setItemEspEnabled,
  thermalVisionEnabled,
  setThermalVisionEnabled,
  nightVisionEnabled,
  setNightVisionEnabled,
  alwaysDayEnabled,
  setAlwaysDayEnabled,
  wideLeanEnabled,
  setWideLeanEnabled,
  lootThroughWallsEnabled,
  setLootThroughWallsEnabled,
  playerDistance,
  setPlayerDistance,
  itemDistance,
  setItemDistance,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">ESP Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="espEnabled"
            checked={espEnabled}
            onCheckedChange={(checked) => setEspEnabled(!!checked)}
          />
          <label
            htmlFor="espEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enable Player ESP
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="itemEspEnabled"
            checked={itemEspEnabled}
            onCheckedChange={(checked) => setItemEspEnabled(!!checked)}
          />
          <label
            htmlFor="itemEspEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enable Item ESP
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="thermalVisionEnabled"
            checked={thermalVisionEnabled}
            onCheckedChange={(checked) => setThermalVisionEnabled(!!checked)}
          />
          <label
            htmlFor="thermalVisionEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Thermal Vision
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="nightVisionEnabled"
            checked={nightVisionEnabled}
            onCheckedChange={(checked) => setNightVisionEnabled(!!checked)}
          />
          <label
            htmlFor="nightVisionEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Night Vision
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="alwaysDayEnabled"
            checked={alwaysDayEnabled}
            onCheckedChange={(checked) => setAlwaysDayEnabled(!!checked)}
          />
          <label
            htmlFor="alwaysDayEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Always Day/Sunny
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="lootThroughWallsEnabled"
            checked={lootThroughWallsEnabled}
            onCheckedChange={(checked) => setLootThroughWallsEnabled(!!checked)}
          />
          <label
            htmlFor="lootThroughWallsEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Loot Through Walls (Risky)
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="wideLeanEnabled"
            checked={wideLeanEnabled}
            onCheckedChange={(checked) => setWideLeanEnabled(!!checked)}
          />
          <label
            htmlFor="wideLeanEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Wide Lean (Risky)
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Player Render Distance</label>
          <Slider
            value={playerDistance}
            min={0}
            max={1000}
            step={10}
            onValueChange={setPlayerDistance}
          />
          <div className="text-right text-xs text-cyan-400">{playerDistance}m</div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Item Render Distance</label>
          <Slider
            value={itemDistance}
            min={0}
            max={500}
            step={10}
            onValueChange={setItemDistance}
          />
          <div className="text-right text-xs text-cyan-400">{itemDistance}m</div>
        </div>
      </div>
    </div>
  );
};

export default ESPTab;
