
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const Index = () => {
  return (
    <div className="radar-app min-h-screen flex flex-col">
      {/* Window title bar */}
      <div className="window-titlebar flex justify-between items-center py-2 px-4">
        <div className="text-lg font-bold">Radar Control Panel</div>
        <Link to="/radar">
          <Button className="btn-cyan">
            Open Radar
          </Button>
        </Link>
      </div>
      
      {/* Content container */}
      <div className="flex-1 p-4">
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
      
      {/* Status bar */}
      <div className="status-bar py-2 px-4">
        Status: Ready
      </div>
    </div>
  );
};

export default Index;
