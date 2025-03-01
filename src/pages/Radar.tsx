
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings, ArrowLeft, Target, Radar as RadarIcon, MapPin, Signal, Compass } from "lucide-react";
import { RadarDisplay } from "@/components/radar/RadarDisplay";
import { StatusBar } from "@/components/radar/StatusBar";
import { ControlPanel } from "@/components/radar/ControlPanel";
import { MiniMap } from "@/components/radar/MiniMap";
import { useInterop } from "@/contexts/InteropContext";
import { RadarEntity } from "@/utils/interopService";

const Radar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [range, setRange] = useState(100);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("radar");
  const [statusMessage, setStatusMessage] = useState("Initializing system...");
  const { isConnected, radarEntities = [], sendMessage, forceConnect } = useInterop();
  const [simulationMode, setSimulationMode] = useState(false);
  const [simulatedEntities, setSimulatedEntities] = useState<RadarEntity[]>([]);

  // Use either real entities from the .NET host or simulated ones
  const entities = radarEntities.length > 0 ? radarEntities : simulatedEntities;

  // Simulate radar activity when in simulation mode
  useEffect(() => {
    if (isActive && simulationMode) {
      setStatusMessage("System active - SIMULATION MODE");
      
      // Simulate entities appearing on radar
      const interval = setInterval(() => {
        const newEntity: RadarEntity = {
          id: Math.random().toString(36).substring(7),
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          type: Math.random() > 0.7 ? 'hostile' : 'friendly',
          distance: Math.random() * range,
          heading: Math.random() * 360,
        };
        
        setSimulatedEntities(prev => [...prev.slice(-15), newEntity]);
      }, 2000);
      
      return () => clearInterval(interval);
    } else if (isActive && !simulationMode) {
      setStatusMessage("System active - scanning for .NET data stream");
      
      // Real mode - here we'd wait for data from the .NET application
      // The radarEntities from useInterop will be populated when the .NET app
      // sends ENTITY_UPDATE messages
    } else {
      setStatusMessage("System in standby mode");
      setSimulatedEntities([]);
    }
  }, [isActive, range, simulationMode]);

  // Handle system activation
  const toggleSystem = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    
    // Notify the .NET host about the radar system state
    sendMessage('FEATURE_TOGGLE', {
      feature: 'radar',
      enabled: newActiveState
    });
    
    // If no connection to .NET, switch to simulation mode
    if (!isConnected && newActiveState) {
      setSimulationMode(true);
    }
  };

  // Toggle between real and simulation mode
  const toggleSimulationMode = () => {
    setSimulationMode(!simulationMode);
  };

  // Force connection to .NET for development/testing
  const handleForceConnect = () => {
    forceConnect();
    setSimulationMode(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-cyan-900/30 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <RadarIcon size={24} className="text-cyan" />
          <h1 className="text-2xl font-bold text-gradient">T.A.R.S. Radar System</h1>
          <Badge variant="outline" className={`${isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isActive ? 'ACTIVE' : 'STANDBY'}
          </Badge>
          {simulationMode && (
            <Badge variant="outline" className="bg-amber-500/20 text-amber-400">SIMULATION</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="border-cyan-800/20 hover:bg-cyan-900/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Settings
            </Button>
          </Link>
          
          {!isConnected && !simulationMode && (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleForceConnect}
              className="border-cyan-800/20 hover:bg-cyan-900/20 mr-2"
            >
              <Signal className="mr-2 h-4 w-4" />
              Force Connect
            </Button>
          )}
          
          {!isConnected && (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={toggleSimulationMode}
              className="border-cyan-800/20 hover:bg-cyan-900/20 mr-2"
            >
              {simulationMode ? "Exit Simulation" : "Simulation Mode"}
            </Button>
          )}
          
          <Button 
            variant={isActive ? "destructive" : "default"}
            onClick={toggleSystem}
            className={!isActive ? "bg-cyan hover:bg-cyan/90" : ""}
          >
            {isActive ? "Deactivate" : "Activate"} System
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4">
        {/* Left panel - Display */}
        <div className="flex-1 flex flex-col gap-4">
          <Card className="flex-1 neo-blur p-1 overflow-hidden rounded-lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="px-4 pt-3 flex items-center justify-between">
                <TabsList className="grid grid-cols-2 bg-black/40">
                  <TabsTrigger value="radar" className="data-[state=active]:bg-cyan/20 data-[state=active]:text-cyan">
                    <RadarIcon className="mr-2 h-4 w-4" />
                    Radar
                  </TabsTrigger>
                  <TabsTrigger value="map" className="data-[state=active]:bg-cyan/20 data-[state=active]:text-cyan">
                    <MapPin className="mr-2 h-4 w-4" />
                    Map
                  </TabsTrigger>
                </TabsList>
                <div className="text-sm text-cyan-400/60 animate-pulse">
                  {isActive ? (
                    isConnected ? 'Connected to .NET host' : 'Simulation mode active'
                  ) : 'Feed inactive'}
                </div>
              </div>
              
              <TabsContent value="radar" className="flex-1 m-0 p-3">
                <RadarDisplay 
                  isActive={isActive} 
                  range={range} 
                  zoomLevel={zoomLevel} 
                  entities={entities} 
                />
              </TabsContent>
              
              <TabsContent value="map" className="flex-1 m-0 p-3">
                <MiniMap isActive={isActive} entities={entities} />
              </TabsContent>
            </Tabs>
          </Card>
          
          <StatusBar 
            message={statusMessage} 
            isActive={isActive}
            isConnected={isConnected}
            entities={entities} 
          />
        </div>
        
        {/* Right panel - Controls */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <ControlPanel 
            isActive={isActive}
            range={range}
            setRange={setRange}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            entities={entities}
          />
        </div>
      </div>
    </div>
  );
};

export default Radar;
