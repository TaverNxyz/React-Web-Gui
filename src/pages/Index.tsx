
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
import { Textarea } from "@/components/ui/textarea";
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
  Save,
  Target,
  Database,
  ExternalLink,
  GitBranch,
  Crosshair,
  RefreshCw,
  LayoutGrid,
  Map,
  Shield,
  Server,
  Terminal,
  AlertCircle,
  FileText,
  Key,
  Lock,
  MessageSquare,
  Zap
} from "lucide-react";

// Custom Windows .NET like title bar component
const WinTitleBar = () => {
  return (
    <div className="flex justify-between items-center bg-[#0e0e10] border-b border-cyan-900/30 py-2 px-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
        <span className="text-sm text-cyan-400 font-semibold">Radar Control v3.1.5 - Windows .NET 9 Application</span>
      </div>
      <div className="flex space-x-2">
        <button className="text-cyan-300 hover:text-cyan-100 focus:outline-none">
          <span className="text-xl">−</span>
        </button>
        <button className="text-cyan-300 hover:text-cyan-100 focus:outline-none">
          <span className="text-xl">□</span>
        </button>
        <button className="text-cyan-300 hover:text-red-400 focus:outline-none">
          <span className="text-xl">×</span>
        </button>
      </div>
    </div>
  );
};

// Status bar component
const StatusBar = () => {
  return (
    <div className="flex justify-between items-center bg-[#0e0e10] border-t border-cyan-900/30 py-1 px-4 text-xs text-cyan-300/70">
      <div>Memory: 128 MB | CPU: 2%</div>
      <div>Last saved: 2 minutes ago</div>
      <div className="flex items-center space-x-2">
        <span className="flex items-center"><Shield size={10} className="mr-1"/> Protected</span>
        <span className="flex items-center"><Wifi size={10} className="mr-1"/> Connected</span>
      </div>
    </div>
  );
};

const Index = () => {
  // General settings
  const [showMines, setShowMines] = useState(true);
  const [showPlayerInfo, setShowPlayerInfo] = useState(true);
  const [showMapSetup, setShowMapSetup] = useState(false);
  const [hideNames, setHideNames] = useState(false);
  const [espWidget, setEspWidget] = useState(true);
  const [aiAimlines, setAiAimlines] = useState(true);
  const [teammateAimlines, setTeammateAimlines] = useState(true);
  const [connectGroups, setConnectGroups] = useState(true);
  const [selectedMap, setSelectedMap] = useState("streets");
  const [debugMode, setDebugMode] = useState(false);
  
  // Loot settings
  const [showLoot, setShowLoot] = useState(true);
  const [showLootWishlist, setShowLootWishlist] = useState(true);
  const [showStaticContainers, setShowStaticContainers] = useState(true);
  const [hideSearched, setHideSearched] = useState(true);
  const [lootHistory, setLootHistory] = useState(false);
  const [lootValue, setLootValue] = useState(100000);
  const [selectedContainers, setSelectedContainers] = useState<string[]>([
    "bankCashRegister",
    "bankSafe1",
    "bankSafe2",
    "buriedBarrelCache",
    "cashRegister"
  ]);
  
  // Quest settings
  const [questHelperEnabled, setQuestHelperEnabled] = useState(false);
  const [questFilter, setQuestFilter] = useState("all");
  const [highlightObjectives, setHighlightObjectives] = useState(true);
  const [questNotifications, setQuestNotifications] = useState(true);
  
  // Server settings
  const [udpEnabled, setUdpEnabled] = useState(true);
  const [ipAddress, setIpAddress] = useState("192.168.1.72");
  const [port, setPort] = useState("7777");
  const [tickRate, setTickRate] = useState("60");
  const [password, setPassword] = useState("w3yRaMk3");
  const [serverStatus, setServerStatus] = useState("offline");
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [allowRemoteAccess, setAllowRemoteAccess] = useState(false);
  
  // Cheat features
  const [enableMemoryWrites, setEnableMemoryWrites] = useState(true);
  const [enableAdvancedMemWrites, setEnableAdvancedMemWrites] = useState(true);
  const [antiPage, setAntiPage] = useState(true);
  const [aimbot, setAimbot] = useState(true);
  const [noRecoil, setNoRecoil] = useState(false);
  const [chams, setChams] = useState(true);
  const [infiniteStamina, setInfiniteStamina] = useState(false);
  const [wallhack, setWallhack] = useState(false);
  const [speedHack, setSpeedHack] = useState(false);
  const [flyHack, setFlyHack] = useState(false);
  const [noCost, setNoCost] = useState(false);
  const [autoFire, setAutoFire] = useState(false);
  
  // Aimbot settings
  const [safeLock, setSafeLock] = useState(false);
  const [autoBone, setAutoBone] = useState(true);
  const [fov, setFov] = useState(true);
  const [target, setTarget] = useState("neck");
  const [headshot, setHeadshot] = useState(true);
  const [aimSpeed, setAimSpeed] = useState(45);
  const [aimFov, setAimFov] = useState(150);
  const [aimSmoothing, setAimSmoothing] = useState(35);
  const [triggerBot, setTriggerBot] = useState(false);
  const [silentAim, setSilentAim] = useState(false);
  
  // UI settings
  const [uiScale, setUiScale] = useState(78);
  const [containerDist, setContainerDist] = useState(270);
  const [maxDist, setMaxDist] = useState(350);
  const [aimlineLength, setAimlineLength] = useState(55);
  const [colorScheme, setColorScheme] = useState("cyan");
  const [fontFamily, setFontFamily] = useState("default");
  const [showFps, setShowFps] = useState(true);
  
  // Chams settings
  const [chamsMode, setChamsMode] = useState("basic");
  const [visibleColor, setVisibleColor] = useState("#ff0000");
  const [invisibleColor, setInvisibleColor] = useState("#00ff00");
  const [chamsOpacity, setChamsOpacity] = useState(85);
  const [chamsGlow, setChamsGlow] = useState(true);
  
  // Monitor settings
  const [monitorResolution, setMonitorResolution] = useState("1920x1080");
  const [displayMode, setDisplayMode] = useState("fullscreen");
  const [vsync, setVsync] = useState(false);
  const [refreshRate, setRefreshRate] = useState(144);
  
  // Log settings
  const [enableLogs, setEnableLogs] = useState(true);
  const [logDetails, setLogDetails] = useState("detailed");
  const [saveLogsToDisk, setSaveLogsToDisk] = useState(true);
  const [logDirectory, setLogDirectory] = useState("C:\\RadarLogs");
  
  // Action handlers
  const handleSave = () => {
    // Simulate sending settings to .NET backend
    console.log("Sending settings to .NET backend");
    
    // Create settings data object with all configurations
    const settingsData = {
      general: {
        showMines,
        showPlayerInfo,
        showMapSetup,
        hideNames,
        espWidget,
        aiAimlines,
        teammateAimlines,
        connectGroups,
        selectedMap,
        debugMode
      },
      loot: {
        showLoot,
        showLootWishlist,
        showStaticContainers,
        hideSearched,
        lootHistory,
        lootValue,
        selectedContainers
      },
      quest: {
        questHelperEnabled,
        questFilter,
        highlightObjectives,
        questNotifications
      },
      server: {
        udpEnabled,
        ipAddress,
        port,
        tickRate,
        password,
        serverStatus,
        encryptionEnabled,
        allowRemoteAccess
      },
      cheats: {
        enableMemoryWrites,
        enableAdvancedMemWrites,
        antiPage,
        aimbot,
        noRecoil,
        chams,
        infiniteStamina,
        wallhack,
        speedHack,
        flyHack,
        noCost,
        autoFire
      },
      aimbot: {
        safeLock,
        autoBone,
        fov,
        target,
        headshot,
        aimSpeed,
        aimFov,
        aimSmoothing,
        triggerBot,
        silentAim
      },
      ui: {
        uiScale,
        containerDist,
        maxDist,
        aimlineLength,
        colorScheme,
        fontFamily,
        showFps
      },
      chams: {
        chamsMode,
        visibleColor,
        invisibleColor,
        chamsOpacity,
        chamsGlow
      },
      monitor: {
        monitorResolution,
        displayMode,
        vsync,
        refreshRate
      },
      logs: {
        enableLogs,
        logDetails,
        saveLogsToDisk,
        logDirectory
      }
    };
    
    console.log(settingsData);
    
    // Show success notification
    alert("Settings saved successfully");
  };
  
  const handleStartServer = () => {
    setServerStatus(serverStatus === "online" ? "offline" : "online");
    console.log(`Server ${serverStatus === "online" ? "stopped" : "started"}`);
  };
  
  const handleRestartRadar = () => {
    console.log("Restarting radar application");
    alert("Radar application is restarting...");
  };
  
  const handleExportConfig = () => {
    console.log("Exporting configuration");
    alert("Configuration exported successfully");
  };
  
  const handleAutoDetect = () => {
    console.log("Auto-detecting monitor settings");
    setMonitorResolution("1920x1080");
    setRefreshRate(144);
    alert("Monitor settings detected successfully");
  };
  
  const handleClearLogs = () => {
    console.log("Clearing application logs");
    alert("Logs cleared successfully");
  };
  
  const handleOpenLogDirectory = () => {
    console.log("Opening log directory");
    // This would launch the file explorer in a real application
    alert(`Opening ${logDirectory}`);
  };
  
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <WinTitleBar />
      
      <div className="container mx-auto py-6 px-4 max-w-7xl bg-background text-foreground">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Radar Control Panel</h1>
            <p className="text-cyan-300/80">Configure your radar and game enhancement settings</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black">
              <Save size={16} /> Save Configuration
            </Button>
            <Button variant="outline" onClick={handleExportConfig} className="flex items-center gap-2">
              <ExternalLink size={16} /> Export
            </Button>
          </div>
        </header>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid grid-cols-9 w-full bg-[#0e0e10] text-secondary-foreground">
            <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <Settings size={16} /> General
            </TabsTrigger>
            <TabsTrigger value="loot" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <Package size={16} /> Loot
            </TabsTrigger>
            <TabsTrigger value="quest" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <HelpCircle size={16} /> Quest
            </TabsTrigger>
            <TabsTrigger value="server" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <Wifi size={16} /> Server
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <Cpu size={16} /> Memory
            </TabsTrigger>
            <TabsTrigger value="aimbot" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <Eye size={16} /> Aimbot
            </TabsTrigger>
            <TabsTrigger value="ui" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <LayoutGrid size={16} /> UI
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <Monitor size={16} /> Monitor
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              <FileText size={16} /> Logs
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-4">
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">Radar/General Settings</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure hotkeys and basic settings</CardDescription>
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
                    <div className="flex items-center justify-between">
                      <Label>Toggle Loot Display: F3</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Toggle Quest Markers: F4</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Toggle ESP: F5</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Panic Mode (Hide All): F12</Label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={handleRestartRadar} className="flex items-center gap-2">
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
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Map size={16} /> Map Selection
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <RefreshCw size={16} /> Sync Data
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="mb-2 block">Select Map</Label>
                      <Select value={selectedMap} onValueChange={setSelectedMap}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select map" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="streets">Streets of Tarkov</SelectItem>
                          <SelectItem value="customs">Customs</SelectItem>
                          <SelectItem value="woods">Woods</SelectItem>
                          <SelectItem value="interchange">Interchange</SelectItem>
                          <SelectItem value="reserve">Reserve</SelectItem>
                          <SelectItem value="shoreline">Shoreline</SelectItem>
                          <SelectItem value="labs">The Lab</SelectItem>
                          <SelectItem value="factory">Factory</SelectItem>
                          <SelectItem value="lighthouse">Lighthouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="debugMode" 
                        checked={debugMode} 
                        onCheckedChange={(value) => setDebugMode(value as boolean)}
                      />
                      <Label htmlFor="debugMode">Debug Mode (Advanced Users Only)</Label>
                    </div>
                  </div>

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
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">Loot Settings</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure loot display options</CardDescription>
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
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lootHistory" 
                      checked={lootHistory} 
                      onCheckedChange={(value) => setLootHistory(value as boolean)}
                    />
                    <Label htmlFor="lootHistory">Track Loot History</Label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="mb-2 block">Minimum Loot Value to Display (₽)</Label>
                  <Slider 
                    value={[lootValue]} 
                    onValueChange={(value) => setLootValue(value[0])}
                    max={500000}
                    step={1000}
                  />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">₽0</span>
                    <span className="text-sm text-muted-foreground">₽{lootValue.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">₽500,000</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-[#12121a]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Static Containers</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Select All</Button>
                      <Button variant="outline" size="sm">Hide Searched</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-h-56 overflow-y-auto border rounded-md p-2 bg-[#0e0e10]">
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
                    <div className="flex items-center space-x-2">
                      <Checkbox id="jacket" defaultChecked />
                      <Label htmlFor="jacket">Jacket</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="safe" defaultChecked />
                      <Label htmlFor="safe">Safe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duffle" defaultChecked />
                      <Label htmlFor="duffle">Duffle bag</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="toolbox" defaultChecked />
                      <Label htmlFor="toolbox">Toolbox</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weapon" defaultChecked />
                      <Label htmlFor="weapon">Weapon crate</Label>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-[#12121a]">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Loot Wishlist</h3>
                    <p className="text-sm text-muted-foreground">Items in your wishlist will be highlighted with a special color</p>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <Input placeholder="Add item to wishlist..." className="bg-[#0e0e10]" />
                    <Button variant="outline">Add</Button>
                  </div>
                  
                  <div className="space-y-2 max-h-56 overflow-y-auto border rounded-md p-2 bg-[#0e0e10]">
                    <div className="flex items-center justify-between p-2 hover:bg-[#1a1a1f]">
                      <span>GPU</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">×</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-[#1a1a1f]">
                      <span>LEDX</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">×</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-[#1a1a1f]">
                      <span>Bitcoin</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">×</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-[#1a1a1f]">
                      <span>Military Cable</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">×</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quest Helper Tab */}
          <TabsContent value="quest" className="space-y-4">
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">Quest Helper</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure quest assistance options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="enabledQuest" 
                      checked={questHelperEnabled}
                      onCheckedChange={(value) => setQuestHelperEnabled(value as boolean)}
                    />
                    <Label htmlFor="enabledQuest">Enabled</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label htmlFor="questFilter">Filter by Trader</Label>
                      <Select value={questFilter} onValueChange={setQuestFilter}>
                        <SelectTrigger id="questFilter">
                          <SelectValue placeholder="Select trader" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Traders</SelectItem>
                          <SelectItem value="prapor">Prapor</SelectItem>
                          <SelectItem value="therapist">Therapist</SelectItem>
                          <SelectItem value="skier">Skier</SelectItem>
                          <SelectItem value="peacekeeper">Peacekeeper</SelectItem>
                          <SelectItem value="mechanic">Mechanic</SelectItem>
                          <SelectItem value="ragman">Ragman</SelectItem>
                          <SelectItem value="jaeger">Jaeger</SelectItem>
                          <SelectItem value="fence">Fence</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="highlightObjectives" 
                          checked={highlightObjectives}
                          onCheckedChange={(value) => setHighlightObjectives(value as boolean)}
                        />
                        <Label htmlFor="highlightObjectives">Highlight Quest Objectives</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="questNotifications" 
                          checked={questNotifications}
                          onCheckedChange={(value) => setQuestNotifications(value as boolean)}
                        />
                        <Label htmlFor="questNotifications">Quest Completion Notifications</Label>
                      </div>
                    </div>
                    
                    <div className="border rounded-md h-64 w-full bg-[#0e0e10] flex items-center justify-center">
                      <p className="text-cyan-300/50">Quest data will appear here in-game</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Web Server Tab */}
          <TabsContent value="server" className="space-y-4">
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">Web Radar Server</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure web server settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={serverStatus === "online" ? "destructive" : "outline"} 
                    size="sm"
                    onClick={handleStartServer}
                  >
                    {serverStatus === "online" ? "Stop" : "Start"}
                  </Button>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className={`w-3 h-3 rounded-full ${serverStatus === "online" ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="text-sm text-muted-foreground capitalize">{serverStatus}</span>
                  </div>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="encryptionEnabled" 
                      checked={encryptionEnabled}
                      onCheckedChange={(value) => setEncryptionEnabled(value as boolean)}
                    />
                    <Label htmlFor="encryptionEnabled">Enable Encryption</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="allowRemoteAccess" 
                      checked={allowRemoteAccess}
                      onCheckedChange={(value) => setAllowRemoteAccess(value as boolean)}
                    />
                    <Label htmlFor="allowRemoteAccess">Allow Remote Access</Label>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Server Status</Label>
                  <div className="border rounded-md p-3 bg-[#12121a] h-24 overflow-y-auto text-xs font-mono">
                    {serverStatus === "online" ? (
                      <>
                        <p className="text-green-400">[System] Server started on {ipAddress}:{port}</p>
                        <p className="text-cyan-300">[System] UDP/IP mode: {udpEnabled ? "Enabled" : "Disabled"}</p>
                        <p className="text-cyan-300">[System] Tick rate: {tickRate}Hz</p>
                        <p className="text-cyan-300">[System] Encryption: {encryptionEnabled ? "Enabled" : "Disabled"}</p>
                        <p className="text-cyan-300">[System] Remote access: {allowRemoteAccess ? "Allowed" : "Disallowed"}</p>
                        <p className="text-green-400">[System] Ready for connections</p>
                      </>
                    ) : (
                      <p className="text-red-400">[System] Server is offline</p>
                    )}
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
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">Memory Write Features</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure memory modification options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="enableAdvancedMemWrites" 
                      checked={enableAdvancedMemWrites}
                      onCheckedChange={(value) => setEnableAdvancedMemWrites(value as boolean)}
                    />
                    <Label htmlFor="enableAdvancedMemWrites">Enable Advanced MemWrites</Label>
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
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wallhack" 
                      checked={wallhack}
                      onCheckedChange={(value) => setWallhack(value as boolean)}
                    />
                    <Label htmlFor="wallhack">Wallhack</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="speedHack" 
                      checked={speedHack}
                      onCheckedChange={(value) => setSpeedHack(value as boolean)}
                    />
                    <Label htmlFor="speedHack">Speed Hack</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="flyHack" 
                      checked={flyHack}
                      onCheckedChange={(value) => setFlyHack(value as boolean)}
                    />
                    <Label htmlFor="flyHack">Fly Hack</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="noCost" 
                      checked={noCost}
                      onCheckedChange={(value) => setNoCost(value as boolean)}
                    />
                    <Label htmlFor="noCost">No Cost</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="autoFire" 
                      checked={autoFire}
                      onCheckedChange={(value) => setAutoFire(value as boolean)}
                    />
                    <Label htmlFor="autoFire">Auto Fire</Label>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="col-span-1 bg-[#12121a]">
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

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="triggerBot" 
                          checked={triggerBot}
                          onCheckedChange={(value) => setTriggerBot(value as boolean)}
                        />
                        <Label htmlFor="triggerBot">Trigger Bot</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="silentAim" 
                          checked={silentAim}
                          onCheckedChange={(value) => setSilentAim(value as boolean)}
                        />
                        <Label htmlFor="silentAim">Silent Aim</Label>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-1 bg-[#12121a]">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">No Recoil</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="mb-2 block">Recoil %</Label>
                          <Slider defaultValue={[25]} max={100} step={1} />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0% (None)</span>
                            <span>25%</span>
                            <span>100% (Full)</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="mb-2 block">Sway %</Label>
                          <Slider defaultValue={[25]} max={100} step={1} />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0% (None)</span>
                            <span>25%</span>
                            <span>100% (Full)</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-1 bg-[#12121a]">
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
                        
                        <div className="space-y-2">
                          <Label className="mb-2 block">Opacity</Label>
                          <Slider 
                            value={[chamsOpacity]} 
                            onValueChange={(value) => setChamsOpacity(value[0])}
                            max={100}
                            step={1}
                          />
                          <span className="text-sm text-muted-foreground">{chamsOpacity}%</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="chamsGlow" 
                            checked={chamsGlow}
                            onCheckedChange={(value) => setChamsGlow(value as boolean)}
                          />
                          <Label htmlFor="chamsGlow">Enable Glow Effect</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Memory Operation Log</Label>
                  <div className="border rounded-md p-3 bg-[#12121a] h-24 overflow-y-auto text-xs font-mono">
                    <p className="text-cyan-300">[System] Memory scanner initialized</p>
                    <p className="text-green-400">[System] Process attached: Tarkov.exe (ID: 24680)</p>
                    <p className="text-cyan-300">[System] Memory region scanned: 0x00007FF61E240000 - 0x00007FF61E340000</p>
                    <p className="text-yellow-400">[Warning] Anti-cheat monitoring detected, enabling anti-detection</p>
                    <p className="text-cyan-300">[System] Hooks installed: 5/5 successful</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Reset Memory Features</Button>
                  <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black">Apply Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aimbot Tab */}
          <TabsContent value="aimbot" className="space-y-4">
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">Aimbot/ESP Configuration</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure aiming and ESP settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">FOV Settings</h3>
                    <div className="space-y-2">
                      <Label className="mb-2 block">FOV Size</Label>
                      <Slider 
                        value={[aimFov]} 
                        onValueChange={(value) => setAimFov(value[0])}
                        max={360}
                        step={1}
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{aimFov}°</span>
                        <div className="relative w-16 h-16 border border-cyan-500/50 rounded-full flex items-center justify-center">
                          <div 
                            className="absolute bg-cyan-500/20 border border-cyan-500/50 rounded-full"
                            style={{ 
                              width: `${(aimFov/360) * 100}%`, 
                              height: `${(aimFov/360) * 100}%`,
                              maxWidth: '100%',
                              maxHeight: '100%'
                            }}
                          ></div>
                          <div className="w-1 h-1 bg-cyan-500 rounded-full z-10"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Aim Speed</h3>
                    <div className="space-y-2">
                      <Label className="mb-2 block">Smoothing</Label>
                      <Slider 
                        value={[aimSmoothing]} 
                        onValueChange={(value) => setAimSmoothing(value[0])}
                        max={100}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0 (Fast/Snap)</span>
                        <span>{aimSmoothing}</span>
                        <span>100 (Slow)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="mb-2 block">Speed</Label>
                      <Slider 
                        value={[aimSpeed]} 
                        onValueChange={(value) => setAimSpeed(value[0])}
                        max={100}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0 (Slow)</span>
                        <span>{aimSpeed}</span>
                        <span>100 (Fast)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <div className="flex items-center space-x-2">
                        <Checkbox defaultChecked id="prioritizeDistance" />
                        <Label htmlFor="prioritizeDistance">Prioritize Distance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="prioritizeVisible" />
                        <Label htmlFor="prioritizeVisible">Prioritize Visible</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Target Filtering</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox defaultChecked id="targetPlayers" />
                        <Label htmlFor="targetPlayers">Target Players</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox defaultChecked id="targetScavs" />
                        <Label htmlFor="targetScavs">Target Scavs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="targetBosses" />
                        <Label htmlFor="targetBosses">Target Bosses</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ignoreTeam" />
                        <Label htmlFor="ignoreTeam">Ignore Team</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">ESP Options</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox defaultChecked id="showHealthbar" />
                        <Label htmlFor="showHealthbar">Show Health Bar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox defaultChecked id="showDistance" />
                        <Label htmlFor="showDistance">Show Distance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox defaultChecked id="showWeapon" />
                        <Label htmlFor="showWeapon">Show Weapon</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox defaultChecked id="showSkeleton" />
                        <Label htmlFor="showSkeleton">Show Skeleton</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-[#12121a]">
                  <h3 className="text-lg font-medium mb-4">Hotkeys</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="aimKey">Aim Key</Label>
                      <Select defaultValue="mouse2">
                        <SelectTrigger id="aimKey">
                          <SelectValue placeholder="Select key" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mouse1">Mouse 1 (Left Click)</SelectItem>
                          <SelectItem value="mouse2">Mouse 2 (Right Click)</SelectItem>
                          <SelectItem value="mouse4">Mouse 4 (Side)</SelectItem>
                          <SelectItem value="mouse5">Mouse 5 (Side)</SelectItem>
                          <SelectItem value="shift">Shift</SelectItem>
                          <SelectItem value="ctrl">Ctrl</SelectItem>
                          <SelectItem value="alt">Alt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="triggerKey">Trigger Key</Label>
                      <Select defaultValue="mouse4">
                        <SelectTrigger id="triggerKey">
                          <SelectValue placeholder="Select key" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mouse1">Mouse 1 (Left Click)</SelectItem>
                          <SelectItem value="mouse2">Mouse 2 (Right Click)</SelectItem>
                          <SelectItem value="mouse4">Mouse 4 (Side)</SelectItem>
                          <SelectItem value="mouse5">Mouse 5 (Side)</SelectItem>
                          <SelectItem value="shift">Shift</SelectItem>
                          <SelectItem value="ctrl">Ctrl</SelectItem>
                          <SelectItem value="alt">Alt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toggleAimbot">Toggle Aimbot</Label>
                      <Select defaultValue="f6">
                        <SelectTrigger id="toggleAimbot">
                          <SelectValue placeholder="Select key" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="f6">F6</SelectItem>
                          <SelectItem value="f7">F7</SelectItem>
                          <SelectItem value="f8">F8</SelectItem>
                          <SelectItem value="f9">F9</SelectItem>
                          <SelectItem value="f10">F10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toggleESP">Toggle ESP</Label>
                      <Select defaultValue="f7">
                        <SelectTrigger id="toggleESP">
                          <SelectValue placeholder="Select key" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="f6">F6</SelectItem>
                          <SelectItem value="f7">F7</SelectItem>
                          <SelectItem value="f8">F8</SelectItem>
                          <SelectItem value="f9">F9</SelectItem>
                          <SelectItem value="f10">F10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* UI Settings Tab */}
          <TabsContent value="ui" className="space-y-4">
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">UI Settings</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure user interface options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="colorScheme">Color Scheme</Label>
                    <Select value={colorScheme} onValueChange={setColorScheme}>
                      <SelectTrigger id="colorScheme">
                        <SelectValue placeholder="Select color scheme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cyan">Cyan (Default)</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger id="fontFamily">
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="consolas">Consolas</SelectItem>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="verdana">Verdana</SelectItem>
                        <SelectItem value="tahoma">Tahoma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="mb-2 block">UI Scale</Label>
                  <Slider 
                    value={[uiScale]} 
                    onValueChange={(value) => setUiScale(value[0])}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50% (Small)</span>
                    <span>{uiScale}%</span>
                    <span>100% (Large)</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showFps" 
                    checked={showFps}
                    onCheckedChange={(value) => setShowFps(value as boolean)}
                  />
                  <Label htmlFor="showFps">Show FPS Counter</Label>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">ESP Box Style</h3>
                    <RadioGroup defaultValue="3d">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2d" id="2d" />
                        <Label htmlFor="2d">2D Box</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3d" id="3d" />
                        <Label htmlFor="3d">3D Box</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="corner" id="corner" />
                        <Label htmlFor="corner">Corner Box</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Radar Style</h3>
                    <RadioGroup defaultValue="square">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="square" id="square" />
                        <Label htmlFor="square">Square</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="circle" id="circle" />
                        <Label htmlFor="circle">Circle</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-[#12121a]">
                  <h3 className="text-lg font-medium mb-4">Color Customization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="playerColor">Player Color</Label>
                      <div className="flex">
                        <Input id="playerColor" type="text" defaultValue="#00ff00" className="rounded-r-none" />
                        <div className="w-10 h-10 border border-l-0 rounded-r-md bg-green-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="enemyColor">Enemy Color</Label>
                      <div className="flex">
                        <Input id="enemyColor" type="text" defaultValue="#ff0000" className="rounded-r-none" />
                        <div className="w-10 h-10 border border-l-0 rounded-r-md bg-red-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neutralColor">Neutral Color</Label>
                      <div className="flex">
                        <Input id="neutralColor" type="text" defaultValue="#ffff00" className="rounded-r-none" />
                        <div className="w-10 h-10 border border-l-0 rounded-r-md bg-yellow-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lootColor">Loot Color</Label>
                      <div className="flex">
                        <Input id="lootColor" type="text" defaultValue="#00ffff" className="rounded-r-none" />
                        <div className="w-10 h-10 border border-l-0 rounded-r-md bg-cyan-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialLootColor">Special Loot Color</Label>
                      <div className="flex">
                        <Input id="specialLootColor" type="text" defaultValue="#ff00ff" className="rounded-r-none" />
                        <div className="w-10 h-10 border border-l-0 rounded-r-md bg-fuchsia-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="containerColor">Container Color</Label>
                      <div className="flex">
                        <Input id="containerColor" type="text" defaultValue="#0000ff" className="rounded-r-none" />
                        <div className="w-10 h-10 border border-l-0 rounded-r-md bg-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitor Info Tab */}
          <TabsContent value="monitor" className="space-y-4">
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">Monitor Info (Aimbot/ESP)</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure display settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Resolution</Label>
                    <Select value={monitorResolution} onValueChange={setMonitorResolution}>
                      <SelectTrigger id="resolution">
                        <SelectValue placeholder="Select resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1920x1080">1920x1080</SelectItem>
                        <SelectItem value="2560x1440">2560x1440</SelectItem>
                        <SelectItem value="3840x2160">3840x2160 (4K)</SelectItem>
                        <SelectItem value="1280x720">1280x720</SelectItem>
                        <SelectItem value="1440x900">1440x900</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refreshRate">Refresh Rate</Label>
                    <Select value={refreshRate.toString()} onValueChange={(val) => setRefreshRate(parseInt(val))}>
                      <SelectTrigger id="refreshRate">
                        <SelectValue placeholder="Select refresh rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60 Hz</SelectItem>
                        <SelectItem value="75">75 Hz</SelectItem>
                        <SelectItem value="120">120 Hz</SelectItem>
                        <SelectItem value="144">144 Hz</SelectItem>
                        <SelectItem value="165">165 Hz</SelectItem>
                        <SelectItem value="240">240 Hz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayMode">Display Mode</Label>
                    <Select value={displayMode} onValueChange={setDisplayMode}>
                      <SelectTrigger id="displayMode">
                        <SelectValue placeholder="Select display mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullscreen">Fullscreen</SelectItem>
                        <SelectItem value="windowed">Windowed</SelectItem>
                        <SelectItem value="borderless">Borderless</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" onClick={handleAutoDetect}>Auto-Detect</Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="vsync" 
                    checked={vsync}
                    onCheckedChange={(value) => setVsync(value as boolean)}
                  />
                  <Label htmlFor="vsync">Enable V-Sync</Label>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Monitor Identification</h3>
                    <div className="border rounded-md p-4 bg-[#12121a] h-40 flex items-center justify-center text-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Current Monitor</p>
                        <div className="relative w-32 h-18 border border-cyan-900/50 mx-auto">
                          <div className="absolute inset-0 border-t-4 border-cyan-500"></div>
                          <div className="flex justify-center items-center h-full">
                            <p className="text-xs">{monitorResolution}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Primary Display</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Performance</h3>
                    <div className="space-y-2">
                      <Label className="mb-2 block">Radar Update Rate (Hz)</Label>
                      <Slider defaultValue={[30]} max={60} step={1} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>10 (Low CPU)</span>
                        <span>30</span>
                        <span>60 (Smooth)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-2 block">ESP Render Distance</Label>
                      <Slider defaultValue={[500]} max={1000} step={10} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>100m</span>
                        <span>500m</span>
                        <span>1000m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <Card className="border-cyan-900/30 bg-[#0e0e10]">
              <CardHeader>
                <CardTitle className="text-cyan-400">Application Logs</CardTitle>
                <CardDescription className="text-cyan-300/70">Configure logging and view application events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="enableLogs" 
                        checked={enableLogs}
                        onCheckedChange={(value) => setEnableLogs(value as boolean)}
                      />
                      <Label htmlFor="enableLogs">Enable Logging</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="logDetails">Log Detail Level</Label>
                      <Select value={logDetails} onValueChange={setLogDetails}>
                        <SelectTrigger id="logDetails">
                          <SelectValue placeholder="Select detail level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                          <SelectItem value="debug">Debug</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="saveLogsToDisk" 
                        checked={saveLogsToDisk}
                        onCheckedChange={(value) => setSaveLogsToDisk(value as boolean)}
                      />
                      <Label htmlFor="saveLogsToDisk">Save Logs to Disk</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="logDirectory">Log Directory</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="logDirectory" 
                          value={logDirectory} 
                          onChange={(e) => setLogDirectory(e.target.value)} 
                        />
                        <Button variant="outline" onClick={handleOpenLogDirectory}>
                          <FolderOpen size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Event Log</h3>
                      <Button variant="outline" size="sm" onClick={handleClearLogs}>Clear</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-[#12121a] h-64 overflow-y-auto text-xs font-mono">
                      <p className="text-green-400">[12:05:32] Application started</p>
                      <p className="text-cyan-300">[12:05:33] Loading configuration from disk</p>
                      <p className="text-cyan-300">[12:05:34] Configuration loaded successfully</p>
                      <p className="text-yellow-400">[12:05:35] Warning: Unable to connect to update server</p>
                      <p className="text-cyan-300">[12:05:36] Initializing radar module</p>
                      <p className="text-cyan-300">[12:05:37] Radar module initialized</p>
                      <p className="text-cyan-300">[12:05:38] Initializing memory scanner</p>
                      <p className="text-cyan-300">[12:05:39] Memory scanner initialized</p>
                      <p className="text-green-400">[12:05:40] System ready</p>
                      <p className="text-red-400">[12:06:10] Error: Failed to attach to process (retry 1/3)</p>
                      <p className="text-cyan-300">[12:06:15] Retrying process attachment</p>
                      <p className="text-green-400">[12:06:20] Successfully attached to process</p>
                      <p className="text-cyan-300">[12:06:25] Loading map data: Streets of Tarkov</p>
                      <p className="text-green-400">[12:06:30] Map data loaded successfully</p>
                      <p className="text-cyan-300">[12:06:35] ESP module enabled</p>
                      <p className="text-cyan-300">[12:06:40] Aimbot module enabled</p>
                      <p className="text-cyan-300">[12:06:45] Loot tracking enabled</p>
                      <p className="text-cyan-300">[12:06:50] Auto-updating player database</p>
                      <p className="text-green-400">[12:06:55] All systems operational</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-muted-foreground">Log files are stored for 7 days by default</Label>
                      <Button variant="outline" size="sm">Export Logs</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <footer className="mt-8 py-4 border-t border-cyan-900/30 text-cyan-300/50 text-sm">
          <div className="flex justify-between items-center">
            <div>Radar Control Panel v3.1.5 | Windows .NET 9 Application</div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><User size={12} className="mr-1"/> Licensed to: Developer</span>
              <span className="flex items-center"><Clock size={12} className="mr-1"/> Expires: Never</span>
            </div>
          </div>
        </footer>
      </div>
      
      <StatusBar />
    </div>
  );
};

export default Index;

// Missing imports to add
import { FolderOpen } from "lucide-react";
