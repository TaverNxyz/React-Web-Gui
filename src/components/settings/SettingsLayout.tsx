
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Crosshair, Eye, Settings, Radar } from "lucide-react";
import ConnectionStatus from "./ConnectionStatus";

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
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-cyan-400">Settings Panel</h1>
          <ConnectionStatus />
        </div>
        <Link to="/radar">
          <Button className="bg-cyan-600 hover:bg-cyan-500">
            <Radar className="mr-2 h-4 w-4" /> Go to Radar
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="memory" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="memory">
            <Monitor className="mr-2 h-4 w-4" /> Sauce Dispenser
          </TabsTrigger>
          <TabsTrigger value="aimbot">
            <Crosshair className="mr-2 h-4 w-4" /> Aimbot
          </TabsTrigger>
          <TabsTrigger value="esp">
            <Eye className="mr-2 h-4 w-4" /> ESP
          </TabsTrigger>
          <TabsTrigger value="ui">
            <Settings className="mr-2 h-4 w-4" /> UI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="memory">{sauceDispenserContent}</TabsContent>
        <TabsContent value="aimbot">{aimbotContent}</TabsContent>
        <TabsContent value="esp">{espContent}</TabsContent>
        <TabsContent value="ui">{uiContent}</TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsLayout;
