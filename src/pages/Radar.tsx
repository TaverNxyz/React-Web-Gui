
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Radar = () => {
  // State to track if map is free (used for the toggle button)
  const [mapFree, setMapFree] = useState(false);
  
  return (
    <div className="flex flex-col h-screen w-full bg-black">
      {/* Top navigation bar */}
      <div className="flex items-center justify-between px-2 py-1 bg-[#0a0a0c] border-b border-[#2a2a35]">
        <div className="flex space-x-4">
          <div className="font-semibold text-cyan-400">Radar [ DEFAULT ]</div>
          
          {/* File menu dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-400 hover:text-cyan-400 cursor-pointer">
              File
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0e0e10] border-[#2a2a35] text-cyan-400">
              <DropdownMenuItem className="hover:bg-[#2a2a35] cursor-pointer">
                <Link to="/" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a35] cursor-pointer">Save Config</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a35] cursor-pointer">Load Config</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a35] cursor-pointer">Export Data</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a35] cursor-pointer text-red-400">Exit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-gray-400 hover:text-cyan-400 cursor-pointer">Player Loadouts</div>
          <div className="text-gray-400 hover:text-cyan-400 cursor-pointer">Player History</div>
          <div className="text-gray-400 hover:text-cyan-400 cursor-pointer">Player Watchlist</div>
          <div className="text-gray-400 hover:text-cyan-400 cursor-pointer">Loot Filters</div>
        </div>
      </div>
      
      {/* Map Free button */}
      <div className="absolute top-[40px] left-2 z-10">
        <Button 
          variant="outline" 
          className={`text-xs px-2 py-1 h-auto ${mapFree ? 'bg-cyan-900/20 border-cyan-800' : 'bg-black/80 border-gray-800'}`}
          onClick={() => setMapFree(!mapFree)}
        >
          Map Free
        </Button>
      </div>
      
      {/* Error message in red */}
      <div className="absolute top-[40px] w-full text-center text-red-500 text-sm">
        {`>>> Scan Mode [Local Mode]`}
      </div>
      
      {/* Main radar display area */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        {/* Waiting for raid start message */}
        <div className="text-[#d946ef] text-2xl font-medium">
          Waiting for Raid Start N.
        </div>
      </div>
    </div>
  );
};

export default Radar;
