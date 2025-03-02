
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white">Imperium.Tech</h1>
      </div>
      
      <div className="flex space-x-4">
        <Link 
          to="/radar" 
          className={cn(
            "flex items-center px-4 py-2 rounded-md transition-colors",
            location.pathname === "/radar" 
              ? "bg-cyan-900/30 text-cyan-400" 
              : "text-white hover:bg-slate-800"
          )}
        >
          <Radar className="mr-2 h-5 w-5" />
          <span>Radar</span>
        </Link>
        
        <Link 
          to="/dashboard" 
          className={cn(
            "flex items-center px-4 py-2 rounded-md transition-colors",
            location.pathname === "/dashboard" 
              ? "bg-cyan-900/30 text-cyan-400" 
              : "text-white hover:bg-slate-800"
          )}
        >
          <Settings className="mr-2 h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
