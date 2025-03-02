
import React, { useEffect, useState } from "react";
import { Shield } from "lucide-react";

export const SplashScreen: React.FC = () => {
  const [loadProgress, setLoadProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        const next = prev + Math.random() * 15;
        return next > 100 ? 100 : next;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900">
      <div className="relative mb-8">
        <Shield size={80} className="text-cyan-400" />
        <div className="absolute -top-1 -right-1 h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></span>
        </div>
      </div>
      
      <h1 className="mb-2 text-3xl font-bold text-white">
        Secure <span className="text-cyan-400">System</span>
      </h1>
      <p className="mb-8 text-slate-400">Initializing components...</p>
      
      <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-cyan-500 transition-all duration-200 ease-out"
          style={{ width: `${loadProgress}%` }}
        ></div>
      </div>
      
      <div className="mt-2 text-xs text-slate-500">
        v1.0.0 | © 2023 SecureSystems Inc.
      </div>
    </div>
  );
};
