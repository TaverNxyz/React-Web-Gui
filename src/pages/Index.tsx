
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const Index = () => {
  // Radar related state
  const [showRadar, setShowRadar] = useState(true);
  const [mapFree, setMapFree] = useState(false);
  
  return (
    <div className="radar-app min-h-screen flex flex-col">
      {/* Window title bar */}
      <div className="window-titlebar flex justify-between items-center py-2 px-4">
        <div className="text-lg font-bold">Radar Control Panel</div>
        <Button 
          className="btn-cyan"
          onClick={() => setShowRadar(!showRadar)}
        >
          {showRadar ? "Hide Radar" : "Show Radar"}
        </Button>
      </div>
      
      {/* Content container with conditional display */}
      <div className="flex-1 flex">
        {/* Settings panel (always visible, but width changes) */}
        <div className={`p-4 border-r border-[#2a2a35] ${showRadar ? 'w-1/3' : 'w-full'}`}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="tab-header">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">General Settings</h3>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="scan-mode">Scan Mode</Label>
                  <select id="scan-mode" className="drop-down">
                    <option>Local Mode</option>
                    <option>Network Mode</option>
                  </select>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center space-x-2">
                  <Label htmlFor="auto-start">Auto Start</Label>
                  <Switch id="auto-start" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="display">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Display Settings</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="brightness">Brightness</Label>
                    <Slider id="brightness" defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="theme">Theme</Label>
                    <select id="theme" className="drop-down">
                      <option>Dark</option>
                      <option>Light</option>
                    </select>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="audio">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Audio Settings</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="volume">Volume</Label>
                    <Slider id="volume" defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="audio-device">Audio Device</Label>
                    <select id="audio-device" className="drop-down">
                      <option>Default</option>
                      <option>Headphones</option>
                    </select>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="alerts">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Alerts Settings</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="alert-sound">Alert Sound</Label>
                    <select id="alert-sound" className="drop-down">
                      <option>Default</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="alert-volume">Alert Volume</Label>
                    <Slider id="alert-volume" defaultValue={[50]} max={100} step={1} />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="network">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Network Settings</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="server-ip">Server IP</Label>
                    <Input id="server-ip" placeholder="127.0.0.1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="server-port">Server Port</Label>
                    <Input id="server-port" placeholder="8080" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Radar display (conditionally visible) */}
        {showRadar && (
          <div className="flex-1 relative bg-black">
            {/* Top navigation bar */}
            <div className="flex items-center justify-between px-2 py-1 bg-[#0a0a0c] border-b border-[#2a2a35]">
              <div className="flex space-x-4">
                <div className="font-semibold text-cyan-400">Radar [ DEFAULT ]</div>
                <div className="text-gray-400 hover:text-cyan-400 cursor-pointer">Player Loadouts</div>
                <div className="text-gray-400 hover:text-cyan-400 cursor-pointer">Player History</div>
                <div className="text-gray-400 hover:text-cyan-400 cursor-pointer">Player Watchlist</div>
                <div className="text-gray-400 hover:text-cyan-400 cursor-pointer">Loot Filters</div>
              </div>
            </div>
            
            {/* Map Free button */}
            <div className="absolute top-[40px] left-2 z-10">
              <Button 
                variant="outline" 
                className={`text-xs px-2 py-1 h-auto ${mapFree ? 'bg-cyan-900/20 border-cyan-800' : 'bg-black/80 border-gray-800'}`}
                onClick={() => setMapFree(!mapFree)}
              >
                Map Free
              </Button>
            </div>
            
            {/* Error message in red */}
            <div className="absolute top-[40px] w-full text-center text-red-500 text-sm">
              {`>>> Scan Mode [Local Mode]`}
            </div>
            
            {/* Main radar display area */}
            <div className="flex-1 h-[calc(100%-30px)] pt-[60px] relative bg-black flex items-center justify-center">
              {/* Waiting for raid start message */}
              <div className="text-[#d946ef] text-2xl font-medium">
                Waiting for Raid Start N.
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Status bar */}
      <div className="status-bar py-2 px-4">
        Status: Ready
      </div>
    </div>
  );
};

export default Index;
