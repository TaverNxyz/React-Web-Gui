
import React, { useState, useEffect, useRef } from "react";
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

const Radar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [range, setRange] = useState(100);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("radar");
  const [statusMessage, setStatusMessage] = useState("Initializing system...");
  const [entities, setEntities] = useState<any[]>([]);

  // Simulate radar activity
  useEffect(() => {
    if (isActive) {
      setStatusMessage("System active - scanning...");
      
      // Simulate entities appearing on radar
      const interval = setInterval(() => {
        const newEntity = {
          id: Math.random().toString(36).substring(7),
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          type: Math.random() > 0.7 ? 'hostile' : 'friendly',
          distance: Math.random() * range,
          heading: Math.random() * 360,
        };
        
        setEntities(prev => [...prev.slice(-15), newEntity]);
      }, 2000);
      
      return () => clearInterval(interval);
    } else {
      setStatusMessage("System in standby mode");
      setEntities([]);
    }
  }, [isActive, range]);

  // Handle system activation
  const toggleSystem = () => {
    setIsActive(!isActive);
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
        </div>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="border-cyan-800/20 hover:bg-cyan-900/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Settings
            </Button>
          </Link>
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
                  {isActive ? 'Live data feed' : 'Feed inactive'}
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
