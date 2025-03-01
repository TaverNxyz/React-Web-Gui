
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  Menu,
  Radar as RadarIcon,
  Crosshair,
  Eye,
} from "lucide-react";

const Radar = () => {
  // Radar state
  const [radarEnabled, setRadarEnabled] = useState(true);
  const [scanMode, setScanMode] = useState("normal");
  
  // Player settings
  const [aimbotEnabled, setAimbotEnabled] = useState(false);
  const [espEnabled, setEspEnabled] = useState(true);
  const [itemEspEnabled, setItemEspEnabled] = useState(true);
  
  // Distance settings
  const [playerDistance, setPlayerDistance] = useState([500]);
  const [itemDistance, setItemDistance] = useState([300]);

  return (
    <div className="window-frame h-screen w-full flex flex-col">
      {/* Title bar */}
      <div className="window-titlebar flex justify-between items-center p-2 border-b border-slate-700">
        <div className="flex items-center">
          <RadarIcon className="h-5 w-5 text-cyan-400 mr-2" />
          <span className="text-sm font-semibold text-cyan-400">Radar Display</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4 text-cyan-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Connect to Process</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to="/">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Open Settings</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 text-cyan-400" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Radar display area */}
        <div className="flex-1 bg-black p-4 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-cyan-400 relative">
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 w-full h-px bg-cyan-500 opacity-50"></div>
              <div className="absolute left-1/2 h-full w-px bg-cyan-500 opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Control panel */}
        <div className="w-64 bg-slate-900 p-3 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-cyan-400 mb-2">Radar Controls</h3>

            <div className="flex items-center justify-between">
              <label className="text-xs">Radar</label>
              <Switch 
                checked={radarEnabled} 
                onCheckedChange={setRadarEnabled} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs">Scan Mode</label>
              <select
                value={scanMode}
                onChange={(e) => setScanMode(e.target.value)}
                className="w-full text-xs p-1 rounded-sm bg-slate-800 border border-slate-700"
              >
                <option value="normal">Normal</option>
                <option value="fast">Fast Scan</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>

            <h3 className="text-sm font-medium text-cyan-400 pt-2 border-t border-slate-700">Player Display</h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Crosshair className="h-3 w-3 mr-1 text-cyan-400" />
                <label className="text-xs">Aimbot</label>
              </div>
              <Switch 
                checked={aimbotEnabled} 
                onCheckedChange={setAimbotEnabled} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1 text-cyan-400" />
                <label className="text-xs">Player ESP</label>
              </div>
              <Switch 
                checked={espEnabled} 
                onCheckedChange={setEspEnabled} 
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs">Item ESP</label>
              <Switch 
                checked={itemEspEnabled} 
                onCheckedChange={setItemEspEnabled} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs">Player Distance</label>
              <Slider
                value={playerDistance}
                min={0}
                max={1000}
                step={10}
                onValueChange={setPlayerDistance}
                className="py-0"
              />
              <div className="text-right text-xs text-cyan-400">{playerDistance}m</div>
            </div>

            <div className="space-y-1">
              <label className="text-xs">Item Distance</label>
              <Slider
                value={itemDistance}
                min={0}
                max={500}
                step={10}
                onValueChange={setItemDistance}
                className="py-0"
              />
              <div className="text-right text-xs text-cyan-400">{itemDistance}m</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="status-bar p-1 text-xs">
        <div className="flex justify-between">
          <div>Ready</div>
          <div>Players: 0</div>
        </div>
      </div>
    </div>
  );
};

export default Radar;
