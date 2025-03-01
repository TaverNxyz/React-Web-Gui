
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
  // State hooks for settings
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [aimbotEnabled, setAimbotEnabled] = useState(false);
  const [espEnabled, setEspEnabled] = useState(true);
  const [itemEspEnabled, setItemEspEnabled] = useState(true);
  const [playerDistance, setPlayerDistance] = useState([500]);
  const [itemDistance, setItemDistance] = useState([300]);
  const [fov, setFov] = useState([90]);
  const [targetBone, setTargetBone] = useState("head");

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
            <Monitor className="mr-2 h-4 w-4" /> Memory
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
          {/* Memory Tab */}
          <TabsContent value="memory" className="space-y-4">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Memory Settings</h2>
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
                  Enable Memory Reader
                </label>
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
                  Enable Aimbot
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
              <div className="text-sm text-gray-400">
                UI customization options can be configured here.
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
