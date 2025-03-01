
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Monitor, Crosshair, Eye, Settings } from "lucide-react";

interface SettingsLayoutProps {
  sauceDispenserContent: React.ReactNode;
  aimbotContent: React.ReactNode;
  espContent: React.ReactNode;
  uiContent: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  sauceDispenserContent,
  aimbotContent,
  espContent,
  uiContent,
}) => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-400">Settings Panel</h1>
        <Link to="/radar">
          <Button className="bg-cyan-600 hover:bg-cyan-500">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Radar
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="memory" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="memory" className="flex items-center">
            <Monitor className="mr-2 h-4 w-4" /> Sauce Dispenser
          </TabsTrigger>
          <TabsTrigger value="aimbot" className="flex items-center">
            <Crosshair className="mr-2 h-4 w-4" /> Aimbot
          </TabsTrigger>
          <TabsTrigger value="esp" className="flex items-center">
            <Eye className="mr-2 h-4 w-4" /> ESP
          </TabsTrigger>
          <TabsTrigger value="ui" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" /> UI
          </TabsTrigger>
        </TabsList>

        <div className="bg-slate-900 rounded-md p-6 shadow-lg">
          <TabsContent value="memory">{sauceDispenserContent}</TabsContent>
          <TabsContent value="aimbot">{aimbotContent}</TabsContent>
          <TabsContent value="esp">{espContent}</TabsContent>
          <TabsContent value="ui">{uiContent}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsLayout;
