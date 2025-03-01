
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  User, 
  Clock, 
  Package, 
  HelpCircle, 
  Wifi, 
  Cpu, 
  Eye, 
  Monitor,
  RotateCw,
  Keyboard,
  Palette,
  Save
} from "lucide-react";

const Index = () => {
  const [showMines, setShowMines] = useState(true);
  const [showPlayerInfo, setShowPlayerInfo] = useState(true);
  const [showMapSetup, setShowMapSetup] = useState(false);
  const [hideNames, setHideNames] = useState(false);
  const [espWidget, setEspWidget] = useState(true);
  const [aiAimlines, setAiAimlines] = useState(true);
  const [teammateAimlines, setTeammateAimlines] = useState(true);
  const [connectGroups, setConnectGroups] = useState(true);
  
  // Loot settings
  const [showLoot, setShowLoot] = useState(true);
  const [showLootWishlist, setShowLootWishlist] = useState(true);
  const [showStaticContainers, setShowStaticContainers] = useState(true);
  const [hideSearched, setHideSearched] = useState(true);
  
  // Server settings
  const [udpEnabled, setUdpEnabled] = useState(true);
  const [ipAddress, setIpAddress] = useState("192.168.1.72");
  const [port, setPort] = useState("7777");
  const [tickRate, setTickRate] = useState("60");
  const [password, setPassword] = useState("w3yRaMk3");
  
  // Cheat features
  const [enableMemoryWrites, setEnableMemoryWrites] = useState(true);
  const [enableAdvancedMemWrites, setEnableAdvancedMemWrites] = useState(true);
  const [antiPage, setAntiPage] = useState(true);
  const [aimbot, setAimbot] = useState(true);
  const [noRecoil, setNoRecoil] = useState(false);
  const [chams, setChams] = useState(true);
  const [infiniteStamina, setInfiniteStamina] = useState(false);
  
  // Aimbot settings
  const [safeLock, setSafeLock] = useState(false);
  const [autoBone, setAutoBone] = useState(true);
  const [fov, setFov] = useState(true);
  const [target, setTarget] = useState("neck");
  const [headshot, setHeadshot] = useState(true);
  
  // UI settings
  const [uiScale, setUiScale] = useState(78);
  const [containerDist, setContainerDist] = useState(270);
  const [maxDist, setMaxDist] = useState(350);
  const [aimlineLength, setAimlineLength] = useState(55);
  
  // Chams settings
  const [chamsMode, setChamsMode] = useState("basic");
  const [visibleColor, setVisibleColor] = useState("#ff0000");
  const [invisibleColor, setInvisibleColor] = useState("#00ff00");
  
  const handleSave = () => {
    // This function would send the settings to your .NET backend
    console.log("Sending settings to .NET backend");
    
    // Example data that would be sent
    const settingsData = {
      general: {
        showMines,
        showPlayerInfo,
        showMapSetup,
        hideNames,
        espWidget,
        aiAimlines,
        teammateAimlines,
        connectGroups
      },
      loot: {
        showLoot,
        showLootWishlist,
        showStaticContainers,
        hideSearched
      },
      server: {
        udpEnabled,
        ipAddress,
        port,
        tickRate,
        password
      },
      cheats: {
        enableMemoryWrites,
        enableAdvancedMemWrites,
        antiPage,
        aimbot,
        noRecoil,
        chams,
        infiniteStamina
      },
      aimbot: {
        safeLock,
        autoBone,
        fov,
        target,
        headshot
      },
      ui: {
        uiScale,
        containerDist,
        maxDist,
        aimlineLength
      },
      chams: {
        chamsMode,
        visibleColor,
        invisibleColor
      }
    };
    
    console.log(settingsData);
    
    // Simulating a successful save
    setTimeout(() => {
      // Success message
      alert("Settings saved successfully");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Radar Control Panel</h1>
          <p className="text-muted-foreground">Configure your radar and game enhancement settings</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save size={16} /> Save Configuration
        </Button>
      </header>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings size={16} /> General
          </TabsTrigger>
          <TabsTrigger value="loot" className="flex items-center gap-2">
            <Package size={16} /> Loot
          </TabsTrigger>
          <TabsTrigger value="quest" className="flex items-center gap-2">
            <HelpCircle size={16} /> Quest Helper
          </TabsTrigger>
          <TabsTrigger value="server" className="flex items-center gap-2">
            <Wifi size={16} /> Web Server
          </TabsTrigger>
          <TabsTrigger value="memory" className="flex items-center gap-2">
            <Cpu size={16} /> Memory Features
          </TabsTrigger>
          <TabsTrigger value="aimbot" className="flex items-center gap-2">
            <Eye size={16} /> Aimbot
          </TabsTrigger>
          <TabsTrigger value="monitor" className="flex items-center gap-2">
            <Monitor size={16} /> Monitor
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Radar/General Settings</CardTitle>
              <CardDescription>Configure hotkeys and basic settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Zoom In: F1 / Mouse Whl Up</Label>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Zoom Out: F2 / Mouse Whl Dn</Label>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Toggle Fullscreen: F11</Label>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <RotateCw size={16} /> Restart Radar
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Keyboard size={16} /> Hotkey Manager
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Palette size={16} /> Color Picker
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Save size={16} /> Backup Config
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="mb-2 block">Aimline Length</Label>
                    <Slider 
                      value={[aimlineLength]} 
                      onValueChange={(value) => setAimlineLength(value[0])}
                      max={100}
                      step={1}
                    />
                    <span className="text-sm text-muted-foreground">{aimlineLength}</span>
                  </div>
                  <div className="space-y-2">
                    <Label className="mb-2 block">Max Dist</Label>
                    <Slider 
                      value={[maxDist]} 
                      onValueChange={(value) => setMaxDist(value[0])}
                      max={500}
                      step={1}
                    />
                    <span className="text-sm text-muted-foreground">{maxDist}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="mb-2 block">UI Scale</Label>
                    <Slider 
                      value={[uiScale]} 
                      onValueChange={(value) => setUiScale(value[0])}
                      max={100}
                      step={1}
                    />
                    <span className="text-sm text-muted-foreground">{uiScale / 100}</span>
                  </div>
                  <div className="space-y-2">
                    <Label className="mb-2 block">Container Dist</Label>
                    <Slider 
                      value={[containerDist]} 
                      onValueChange={(value) => setContainerDist(value[0])}
                      max={500}
                      step={1}
                    />
                    <span className="text-sm text-muted-foreground">{containerDist}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showMapSetup" 
                    checked={showMapSetup} 
                    onCheckedChange={(value) => setShowMapSetup(value as boolean)}
                  />
                  <Label htmlFor="showMapSetup">Show Map Setup Helper</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="espWidget" 
                    checked={espWidget} 
                    onCheckedChange={(value) => setEspWidget(value as boolean)}
                  />
                  <Label htmlFor="espWidget">ESP Widget</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="playerInfo" 
                    checked={showPlayerInfo} 
                    onCheckedChange={(value) => setShowPlayerInfo(value as boolean)}
                  />
                  <Label htmlFor="playerInfo">Player Info Widget</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="connectGroups" 
                    checked={connectGroups} 
                    onCheckedChange={(value) => setConnectGroups(value as boolean)}
                  />
                  <Label htmlFor="connectGroups">Connect Groups</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hideNames" 
                    checked={hideNames} 
                    onCheckedChange={(value) => setHideNames(value as boolean)}
                  />
                  <Label htmlFor="hideNames">Hide Names</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showMines" 
                    checked={showMines} 
                    onCheckedChange={(value) => setShowMines(value as boolean)}
                  />
                  <Label htmlFor="showMines">Show Mines</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="teammateAimlines" 
                    checked={teammateAimlines} 
                    onCheckedChange={(value) => setTeammateAimlines(value as boolean)}
                  />
                  <Label htmlFor="teammateAimlines">Teammate Aimlines</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="aiAimlines" 
                    checked={aiAimlines} 
                    onCheckedChange={(value) => setAiAimlines(value as boolean)}
                  />
                  <Label htmlFor="aiAimlines">AI Aimlines</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loot Tab */}
        <TabsContent value="loot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loot Settings</CardTitle>
              <CardDescription>Configure loot display options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showLoot" 
                    checked={showLoot} 
                    onCheckedChange={(value) => setShowLoot(value as boolean)}
                  />
                  <Label htmlFor="showLoot">Show Loot (F3)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showLootWishlist" 
                    checked={showLootWishlist} 
                    onCheckedChange={(value) => setShowLootWishlist(value as boolean)}
                  />
                  <Label htmlFor="showLootWishlist">Show Loot Wishlist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showStaticContainers" 
                    checked={showStaticContainers} 
                    onCheckedChange={(value) => setShowStaticContainers(value as boolean)}
                  />
                  <Label htmlFor="showStaticContainers">Show Static Containers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hideSearched" 
                    checked={hideSearched} 
                    onCheckedChange={(value) => setHideSearched(value as boolean)}
                  />
                  <Label htmlFor="hideSearched">Hide Searched</Label>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Static Containers</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Select All</Button>
                    <Button variant="outline" size="sm">Hide Searched</Button>
                  </div>
                </div>
                
                <div className="space-y-2 max-h-56 overflow-y-auto border rounded-md p-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bankCashRegister" defaultChecked />
                    <Label htmlFor="bankCashRegister">Bank cash register</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bankSafe1" defaultChecked />
                    <Label htmlFor="bankSafe1">Bank safe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bankSafe2" defaultChecked />
                    <Label htmlFor="bankSafe2">Bank safe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="buriedBarrelCache" defaultChecked />
                    <Label htmlFor="buriedBarrelCache">Buried barrel cache</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cashRegister" defaultChecked />
                    <Label htmlFor="cashRegister">Cash register</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quest Helper Tab */}
        <TabsContent value="quest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quest Helper</CardTitle>
              <CardDescription>Configure quest assistance options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="enabledQuest" />
                  <Label htmlFor="enabledQuest">Enabled</Label>
                </div>
                
                <div className="border rounded-md h-64 w-full bg-muted/20">
                  {/* Quest helper display area */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Web Server Tab */}
        <TabsContent value="server" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Web Radar Server</CardTitle>
              <CardDescription>Configure web server settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Start</Button>
                <div className="flex items-center space-x-2 ml-4">
                  <Checkbox 
                    id="udpEnabled" 
                    checked={udpEnabled}
                    onCheckedChange={(value) => setUdpEnabled(value as boolean)}
                  />
                  <Label htmlFor="udpEnabled">UDP/IP</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bindIp">Bind IP</Label>
                  <Input 
                    id="bindIp" 
                    value={ipAddress} 
                    onChange={(e) => setIpAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input 
                    id="port" 
                    value={port} 
                    onChange={(e) => setPort(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tickRate">Tick Rate (Hz)</Label>
                  <Input 
                    id="tickRate" 
                    value={tickRate} 
                    onChange={(e) => setTickRate(e.target.value)}
                  />
                </div>
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enableMemoryWrites" 
                  checked={enableMemoryWrites}
                  onCheckedChange={(value) => setEnableMemoryWrites(value as boolean)}
                />
                <Label htmlFor="enableMemoryWrites">Enable Memory Writes (Risky)</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Memory Features Tab */}
        <TabsContent value="memory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Memory Write Features</CardTitle>
              <CardDescription>Configure memory modification options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enableAdvancedMemWrites" 
                    checked={enableAdvancedMemWrites}
                    onCheckedChange={(value) => setEnableAdvancedMemWrites(value as boolean)}
                  />
                  <Label htmlFor="enableAdvancedMemWrites">Enable Advanced MemWrites (Very Risky)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="antiPage" 
                    checked={antiPage}
                    onCheckedChange={(value) => setAntiPage(value as boolean)}
                  />
                  <Label htmlFor="antiPage">Anti-Page</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="aimbot" 
                    checked={aimbot}
                    onCheckedChange={(value) => setAimbot(value as boolean)}
                  />
                  <Label htmlFor="aimbot">Aimbot (Risky)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="noRecoil" 
                    checked={noRecoil}
                    onCheckedChange={(value) => setNoRecoil(value as boolean)}
                  />
                  <Label htmlFor="noRecoil">No Recoil/Sway (Risky)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="chams" 
                    checked={chams}
                    onCheckedChange={(value) => setChams(value as boolean)}
                  />
                  <Label htmlFor="chams">Chams</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="infiniteStamina" 
                    checked={infiniteStamina}
                    onCheckedChange={(value) => setInfiniteStamina(value as boolean)}
                  />
                  <Label htmlFor="infiniteStamina">Infinite Stamina (Risky)</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Aimbot Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="safeLock" 
                          checked={safeLock}
                          onCheckedChange={(value) => setSafeLock(value as boolean)}
                        />
                        <Label htmlFor="safeLock">Safe Lock</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="autoBone" 
                          checked={autoBone}
                          onCheckedChange={(value) => setAutoBone(value as boolean)}
                        />
                        <Label htmlFor="autoBone">Auto Bone</Label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fov" 
                          checked={fov}
                          onCheckedChange={(value) => setFov(value as boolean)}
                        />
                        <Label htmlFor="fov">FOV</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="target">Target</Label>
                        <Select value={target} onValueChange={setTarget}>
                          <SelectTrigger id="target">
                            <SelectValue placeholder="Select target" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="head">Head</SelectItem>
                            <SelectItem value="neck">Neck</SelectItem>
                            <SelectItem value="chest">Chest</SelectItem>
                            <SelectItem value="stomach">Stomach</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="headshot" 
                        checked={headshot}
                        onCheckedChange={(value) => setHeadshot(value as boolean)}
                      />
                      <Label htmlFor="headshot">Headshot AI</Label>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">No Recoil</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="mb-2 block">Recoil %</Label>
                        <Slider defaultValue={[25]} max={100} step={1} />
                      </div>
                      <div className="space-y-2">
                        <Label className="mb-2 block">Sway %</Label>
                        <Slider defaultValue={[25]} max={100} step={1} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Chams Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-4">
                      <RadioGroup value={chamsMode} onValueChange={setChamsMode} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="basic" id="basic" />
                          <Label htmlFor="basic">Basic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="visible" id="visible" />
                          <Label htmlFor="visible">Visible</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vischecks" id="vischecks" />
                          <Label htmlFor="vischecks">Vischecks</Label>
                        </div>
                      </RadioGroup>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="visibleColor">Visible Color</Label>
                          <div className="flex">
                            <Input 
                              id="visibleColor" 
                              type="text" 
                              value={visibleColor} 
                              onChange={(e) => setVisibleColor(e.target.value)}
                              className="rounded-r-none"
                            />
                            <div 
                              className="w-10 h-10 border border-l-0 rounded-r-md"
                              style={{ backgroundColor: visibleColor }}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="invisibleColor">Invisible Color</Label>
                          <div className="flex">
                            <Input 
                              id="invisibleColor" 
                              type="text" 
                              value={invisibleColor} 
                              onChange={(e) => setInvisibleColor(e.target.value)}
                              className="rounded-r-none"
                            />
                            <div 
                              className="w-10 h-10 border border-l-0 rounded-r-md"
                              style={{ backgroundColor: invisibleColor }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aimbot Tab */}
        <TabsContent value="aimbot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aimbot/ESP Configuration</CardTitle>
              <CardDescription>Configure aiming and ESP settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* More detailed aimbot settings would go here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">FOV Settings</h3>
                  <div className="space-y-2">
                    <Label className="mb-2 block">FOV Size</Label>
                    <Slider defaultValue={[78]} max={100} step={1} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Target Selection</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked id="prioritizeHead" />
                      <Label htmlFor="prioritizeHead">Prioritize Head</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="randomBone" />
                      <Label htmlFor="randomBone">Random Bone</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitor Info Tab */}
        <TabsContent value="monitor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitor Info (Aimbot/ESP)</CardTitle>
              <CardDescription>Configure display settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" type="text" defaultValue="1920" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" type="text" defaultValue="1080" />
                </div>
                <div className="col-span-2">
                  <Button variant="outline" className="mt-8">Auto-Detect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
