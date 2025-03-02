
import React from 'react';
import RadarDisplay from '@/components/radar/RadarDisplay';
import ControlPanel from '@/components/radar/ControlPanel';
import StatusBar from '@/components/radar/StatusBar';
import Navigation from '@/components/layout/Navigation';

const Radar: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-200">
      <Navigation />
      <div className="flex-1 flex">
        <div className="w-3/4 p-4">
          <RadarDisplay />
        </div>
        <div className="w-1/4 bg-slate-800 p-4 border-l border-slate-700">
          <ControlPanel />
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default Radar;
