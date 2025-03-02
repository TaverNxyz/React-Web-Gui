
import React from "react";
import { useInterop } from "@/contexts/InteropContext";
import { RadarDisplay } from "@/components/radar/RadarDisplay";
import { ControlPanel } from "@/components/radar/ControlPanel";
import { StatusBar } from "@/components/radar/StatusBar";
import Navigation from "@/components/layout/Navigation";

const Radar = () => {
  const { isConnected } = useInterop();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-4">
            <RadarDisplay />
          </div>
          <div className="lg:col-span-1">
            <ControlPanel />
          </div>
        </div>
        <div className="mt-6">
          <StatusBar connected={isConnected} />
        </div>
      </div>
    </div>
  );
};

export default Radar;
