
import React from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import Dashboard from "./Dashboard";

const Index = () => {
  return (
    <SettingsProvider>
      <Dashboard />
    </SettingsProvider>
  );
};

export default Index;
