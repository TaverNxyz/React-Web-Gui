
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Monitor,
  Crosshair,
  Settings,
  Eye,
} from "lucide-react";

const Index = () => {
  // Sauce Dispenser settings
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [advancedMemoryEnabled, setAdvancedMemoryEnabled] = useState(false);
  const [antiPageEnabled, setAntiPageEnabled] = useState(false);
  
  // Aimbot settings
  const [aimbotEnabled, setAimbotEnabled] = useState(false);
  const [headshotAimEnabled, setHeadshotAimEnabled] = useState(false);
  const [noRecoilEnabled, setNoRecoilEnabled] = useState(false);
  const [autoBoneEnabled, setAutoBoneEnabled] = useState(false);
  const [randomBoneEnabled, setRandomBoneEnabled] = useState(false);
  const [safeLockEnabled, setSafeLockEnabled] = useState(false);
  const [disableReLockEnabled, setDisableReLockEnabled] = useState(false);
  const [fov, setFov] = useState([90]);
  const [targetBone, setTargetBone] = useState("head");
  
  // ESP settings
  const [espEnabled, setEspEnabled] = useState(true);
  const [itemEspEnabled, setItemEspEnabled] = useState(true);
  const [thermalVisionEnabled, setThermalVisionEnabled] = useState(false);
  const [nightVisionEnabled, setNightVisionEnabled] = useState(false);
  const [alwaysDayEnabled, setAlwaysDayEnabled] = useState(false);
  const [wideLeanEnabled, setWideLeanEnabled] = useState(false);
  const [playerDistance, setPlayerDistance] = useState([500]);
  const [itemDistance, setItemDistance] = useState([300]);
  
  // Misc features
  const [infiniteStaminaEnabled, setInfiniteStaminaEnabled] = useState(false);
  const [fastLoadEnabled, setFastLoadEnabled] = useState(false);
  const [lootThroughWallsEnabled, setLootThroughWallsEnabled] = useState(false);
  const [hideRaidInfoEnabled, setHideRaidInfoEnabled] = useState(false);
  const [disableInventoryBlurEnabled, setDisableInventoryBlurEnabled] = useState(false);
  const [moveSpeedEnabled, setMoveSpeedEnabled] = useState(false);
  const [noWrapMalfunctionsEnabled, setNoWrapMalfunctionsEnabled] = useState(false);
  const [fullBrightEnabled, setFullBrightEnabled] = useState(false);
  const [rageModeEnabled, setRageModeEnabled] = useState(false);
  const [gymHackEnabled, setGymHackEnabled] = useState(false);
  const [antiAFKEnabled, setAntiAFKEnabled] = useState(false);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-400">Settings Panel</h1>
        <Link to="/radar">
          <Button className="bg-cyan-600 hover:bg-cyan-500">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Radar
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="memory" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="memory" className="flex items-center">
            <Monitor className="mr-2 h-4 w-4" /> Sauce Dispenser
          </TabsTrigger>
          <TabsTrigger value="aimbot" className="flex items-center">
            <Crosshair className="mr-2 h-4 w-4" /> Aimbot
          </TabsTrigger>
          <TabsTrigger value="esp" className="flex items-center">
            <Eye className="mr-2 h-4 w-4" /> ESP
          </TabsTrigger>
          <TabsTrigger value="ui" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" /> UI
          </TabsTrigger>
        </TabsList>

        <div className="bg-slate-900 rounded-md p-6 shadow-lg">
          {/* Sauce Dispenser Tab (formerly Memory) */}
          <TabsContent value="memory" className="space-y-4">
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
          </TabsContent>

          {/* Aimbot Tab */}
          <TabsContent value="aimbot" className="space-y-4">
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
          </TabsContent>

          {/* ESP Tab */}
          <TabsContent value="esp" className="space-y-4">
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
          </TabsContent>

          {/* UI Tab */}
          <TabsContent value="ui" className="space-y-4">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">UI Settings</h2>
            <div className="space-y-4">
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
                    No Wrap Malfunctions
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
                <h3 className="text-lg font-medium text-cyan-400 mb-2">Additional Options</h3>
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
              
              <div className="mt-4">
                <h3 className="text-lg font-medium text-cyan-400 mb-2">Monitor Info (Aimbot/ESP)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Width</label>
                    <input 
                      type="text" 
                      placeholder="1920" 
                      className="w-full p-2 rounded-md bg-slate-800 border border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Height</label>
                    <input 
                      type="text" 
                      placeholder="1080" 
                      className="w-full p-2 rounded-md bg-slate-800 border border-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
