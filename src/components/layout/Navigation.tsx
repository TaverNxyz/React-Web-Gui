
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Radar, Settings } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <div className="bg-slate-900 border-b border-slate-800 py-2 px-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-cyan-400 text-lg font-bold">Control Panel</div>
        
        <div className="flex gap-4">
          <Link to="/radar">
            <Button 
              variant={location.pathname === "/radar" ? "default" : "outline"}
              className={location.pathname === "/radar" ? "bg-cyan-700 hover:bg-cyan-600" : "text-cyan-400 border-cyan-800"}
            >
              <Radar className="mr-2 h-4 w-4" /> Radar
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button 
              variant={location.pathname === "/dashboard" ? "default" : "outline"}
              className={location.pathname === "/dashboard" ? "bg-cyan-700 hover:bg-cyan-600" : "text-cyan-400 border-cyan-800"}
            >
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
