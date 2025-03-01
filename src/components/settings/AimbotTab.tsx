
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface AimbotTabProps {
  aimbotEnabled: boolean;
  setAimbotEnabled: (value: boolean) => void;
  headshotAimEnabled: boolean;
  setHeadshotAimEnabled: (value: boolean) => void;
  noRecoilEnabled: boolean;
  setNoRecoilEnabled: (value: boolean) => void;
  autoBoneEnabled: boolean;
  setAutoBoneEnabled: (value: boolean) => void;
  randomBoneEnabled: boolean;
  setRandomBoneEnabled: (value: boolean) => void;
  safeLockEnabled: boolean;
  setSafeLockEnabled: (value: boolean) => void;
  disableReLockEnabled: boolean;
  setDisableReLockEnabled: (value: boolean) => void;
  fov: number[];
  setFov: (value: number[]) => void;
  targetBone: string;
  setTargetBone: (value: string) => void;
}

const AimbotTab: React.FC<AimbotTabProps> = ({
  aimbotEnabled,
  setAimbotEnabled,
  headshotAimEnabled,
  setHeadshotAimEnabled,
  noRecoilEnabled,
  setNoRecoilEnabled,
  autoBoneEnabled,
  setAutoBoneEnabled,
  randomBoneEnabled,
  setRandomBoneEnabled,
  safeLockEnabled,
  setSafeLockEnabled,
  disableReLockEnabled,
  setDisableReLockEnabled,
  fov,
  setFov,
  targetBone,
  setTargetBone,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">Aimbot Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="aimbotEnabled"
            checked={aimbotEnabled}
            onCheckedChange={(checked) => setAimbotEnabled(!!checked)}
          />
          <label
            htmlFor="aimbotEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enable Aimbot (Risky)
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="noRecoilEnabled"
            checked={noRecoilEnabled}
            onCheckedChange={(checked) => setNoRecoilEnabled(!!checked)}
          />
          <label
            htmlFor="noRecoilEnabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            No Recoil/Sway (Risky)
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">FOV</label>
          <Slider
            value={fov}
            min={0}
            max={180}
            step={1}
            onValueChange={setFov}
          />
          <div className="text-right text-xs text-cyan-400">{fov}°</div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Target Bone</label>
          <select
            value={targetBone}
            onChange={(e) => setTargetBone(e.target.value)}
            className="w-full p-2 rounded-md bg-slate-800 border border-slate-700"
          >
            <option value="head">Head</option>
            <option value="neck">Neck</option>
            <option value="chest">Chest</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="safeLockEnabled"
              checked={safeLockEnabled}
              onCheckedChange={(checked) => setSafeLockEnabled(!!checked)}
            />
            <label
              htmlFor="safeLockEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Safe Lock
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="autoBoneEnabled"
              checked={autoBoneEnabled}
              onCheckedChange={(checked) => setAutoBoneEnabled(!!checked)}
            />
            <label
              htmlFor="autoBoneEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Auto Bone
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="disableReLockEnabled"
              checked={disableReLockEnabled}
              onCheckedChange={(checked) => setDisableReLockEnabled(!!checked)}
            />
            <label
              htmlFor="disableReLockEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Disable Re-Lock
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="randomBoneEnabled"
              checked={randomBoneEnabled}
              onCheckedChange={(checked) => setRandomBoneEnabled(!!checked)}
            />
            <label
              htmlFor="randomBoneEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Random Bone
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="headshotAimEnabled"
              checked={headshotAimEnabled}
              onCheckedChange={(checked) => setHeadshotAimEnabled(!!checked)}
            />
            <label
              htmlFor="headshotAimEnabled"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Headshot AI
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AimbotTab;
