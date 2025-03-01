
import React from "react";

const UITab: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">UI Settings</h2>
      <div className="space-y-4">
        <div className="mt-4">
          <h3 className="text-lg font-medium text-cyan-400 mb-2">Monitor Info (Aimbot/ESP)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Width</label>
              <input 
                type="text" 
                placeholder="1920" 
                className="w-full p-2 rounded-md bg-slate-800 border border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Height</label>
              <input 
                type="text" 
                placeholder="1080" 
                className="w-full p-2 rounded-md bg-slate-800 border border-slate-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UITab;
