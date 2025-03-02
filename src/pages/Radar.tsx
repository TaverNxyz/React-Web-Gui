
import React, { useState } from "react";
import { useInterop } from "@/contexts/InteropContext";
import { RadarDisplay } from "@/components/radar/RadarDisplay";
import { ControlPanel } from "@/components/radar/ControlPanel";
import { StatusBar } from "@/components/radar/StatusBar";
import Navigation from "@/components/layout/Navigation";

const Radar = () => {
  const { isConnected, radarEntities } = useInterop();
  const [isActive, setIsActive] = useState(true);
  const [range, setRange] = useState(250);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [statusMessage, setStatusMessage] = useState("System operational");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-4">
            <RadarDisplay 
              isActive={isActive}
              range={range}
              zoomLevel={zoomLevel}
              entities={radarEntities || []}
            />
          </div>
          <div className="lg:col-span-1">
            <ControlPanel 
              isActive={isActive}
              range={range}
              setRange={setRange}
              zoomLevel={zoomLevel}
              setZoomLevel={setZoomLevel}
              entities={radarEntities || []}
            />
          </div>
        </div>
        <div className="mt-6">
          <StatusBar 
            message={statusMessage}
            isActive={isActive}
            isConnected={isConnected}
            entities={radarEntities || []}
          />
        </div>
      </div>
    </div>
  );
};

export default Radar;
