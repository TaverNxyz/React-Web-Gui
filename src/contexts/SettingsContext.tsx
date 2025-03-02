
import React, { createContext, useContext, useState, useEffect } from "react";
import { useInterop } from "./InteropContext";
import { useToast } from "@/hooks/use-toast";

// Define types for our settings
interface MemorySettings {
  memoryEnabled: boolean;
  advancedMemoryEnabled: boolean;
  antiPageEnabled: boolean;
  infiniteStaminaEnabled: boolean;
  fastLoadEnabled: boolean;
  lootThroughWallsEnabled: boolean;
  hideRaidInfoEnabled: boolean;
  disableInventoryBlurEnabled: boolean;
  moveSpeedEnabled: boolean;
  noWrapMalfunctionsEnabled: boolean;
  fullBrightEnabled: boolean;
  rageModeEnabled: boolean;
  gymHackEnabled: boolean;
  antiAFKEnabled: boolean;
}

interface AimbotSettings {
  aimbotEnabled: boolean;
  headshotAimEnabled: boolean;
  noRecoilEnabled: boolean;
  autoBoneEnabled: boolean;
  randomBoneEnabled: boolean;
  safeLockEnabled: boolean;
  disableReLockEnabled: boolean;
  fov: number[];
  targetBone: string;
}

interface ESPSettings {
  espEnabled: boolean;
  itemEspEnabled: boolean;
  thermalVisionEnabled: boolean;
  nightVisionEnabled: boolean;
  alwaysDayEnabled: boolean;
  wideLeanEnabled: boolean;
  playerDistance: number[];
  itemDistance: number[];
}

interface SettingsContextType {
  // Memory settings
  memorySettings: MemorySettings;
  setMemoryEnabled: (value: boolean) => void;
  setAdvancedMemoryEnabled: (value: boolean) => void;
  setAntiPageEnabled: (value: boolean) => void;
  setInfiniteStaminaEnabled: (value: boolean) => void;
  setFastLoadEnabled: (value: boolean) => void;
  setLootThroughWallsEnabled: (value: boolean) => void;
  setHideRaidInfoEnabled: (value: boolean) => void;
  setDisableInventoryBlurEnabled: (value: boolean) => void;
  setMoveSpeedEnabled: (value: boolean) => void;
  setNoWrapMalfunctionsEnabled: (value: boolean) => void;
  setFullBrightEnabled: (value: boolean) => void;
  setRageModeEnabled: (value: boolean) => void;
  setGymHackEnabled: (value: boolean) => void;
  setAntiAFKEnabled: (value: boolean) => void;

  // Aimbot settings
  aimbotSettings: AimbotSettings;
  setAimbotEnabled: (value: boolean) => void;
  setHeadshotAimEnabled: (value: boolean) => void;
  setNoRecoilEnabled: (value: boolean) => void;
  setAutoBoneEnabled: (value: boolean) => void;
  setRandomBoneEnabled: (value: boolean) => void;
  setSafeLockEnabled: (value: boolean) => void;
  setDisableReLockEnabled: (value: boolean) => void;
  setFov: (value: number[]) => void;
  setTargetBone: (value: string) => void;

  // ESP settings
  espSettings: ESPSettings;
  setEspEnabled: (value: boolean) => void;
  setItemEspEnabled: (value: boolean) => void;
  setThermalVisionEnabled: (value: boolean) => void;
  setNightVisionEnabled: (value: boolean) => void;
  setAlwaysDayEnabled: (value: boolean) => void;
  setWideLeanEnabled: (value: boolean) => void;
  setPlayerDistance: (value: number[]) => void;
  setItemDistance: (value: number[]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected, updateSettings } = useInterop();
  const { toast } = useToast();

  // Memory settings
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [advancedMemoryEnabled, setAdvancedMemoryEnabled] = useState(false);
  const [antiPageEnabled, setAntiPageEnabled] = useState(false);
  
  // Aimbot settings
  const [aimbotEnabled, setAimbotEnabled] = useState(false);
  const [headshotAimEnabled, setHeadshotAimEnabled] = useState(false);
  const [noRecoilEnabled, setNoRecoilEnabled] = useState(false);
  const [autoBoneEnabled, setAutoBoneEnabled] = useState(false);
  const [randomBoneEnabled, setRandomBoneEnabled] = useState(false);
  const [safeLockEnabled, setSafeLockEnabled] = useState(false);
  const [disableReLockEnabled, setDisableReLockEnabled] = useState(false);
  const [fov, setFov] = useState([90]);
  const [targetBone, setTargetBone] = useState("head");
  
  // ESP settings
  const [espEnabled, setEspEnabled] = useState(true);
  const [itemEspEnabled, setItemEspEnabled] = useState(true);
  const [thermalVisionEnabled, setThermalVisionEnabled] = useState(false);
  const [nightVisionEnabled, setNightVisionEnabled] = useState(false);
  const [alwaysDayEnabled, setAlwaysDayEnabled] = useState(false);
  const [wideLeanEnabled, setWideLeanEnabled] = useState(false);
  const [playerDistance, setPlayerDistance] = useState([500]);
  const [itemDistance, setItemDistance] = useState([300]);
  
  // Misc features (moved from UI to Sauce Dispenser)
  const [infiniteStaminaEnabled, setInfiniteStaminaEnabled] = useState(false);
  const [fastLoadEnabled, setFastLoadEnabled] = useState(false);
  const [lootThroughWallsEnabled, setLootThroughWallsEnabled] = useState(false);
  const [hideRaidInfoEnabled, setHideRaidInfoEnabled] = useState(false);
  const [disableInventoryBlurEnabled, setDisableInventoryBlurEnabled] = useState(false);
  const [moveSpeedEnabled, setMoveSpeedEnabled] = useState(false);
  const [noWrapMalfunctionsEnabled, setNoWrapMalfunctionsEnabled] = useState(false);
  const [fullBrightEnabled, setFullBrightEnabled] = useState(false);
  const [rageModeEnabled, setRageModeEnabled] = useState(false);
  const [gymHackEnabled, setGymHackEnabled] = useState(false);
  const [antiAFKEnabled, setAntiAFKEnabled] = useState(false);

  // Function to sync all settings with host application
  const syncAllSettings = () => {
    // Only sync if connected to host
    if (!isConnected) return;
    
    // Sync memory settings
    updateSettings('memory', {
      memoryEnabled,
      advancedMemoryEnabled,
      antiPageEnabled,
      infiniteStaminaEnabled,
      fastLoadEnabled,
      lootThroughWallsEnabled,
      hideRaidInfoEnabled,
      disableInventoryBlurEnabled,
      moveSpeedEnabled,
      noWrapMalfunctionsEnabled,
      fullBrightEnabled,
      rageModeEnabled,
      gymHackEnabled,
      antiAFKEnabled
    });
    
    // Sync aimbot settings
    updateSettings('aimbot', {
      aimbotEnabled,
      headshotAimEnabled,
      noRecoilEnabled,
      autoBoneEnabled,
      randomBoneEnabled,
      safeLockEnabled,
      disableReLockEnabled,
      fov: fov[0],
      targetBone
    });
    
    // Sync ESP settings
    updateSettings('esp', {
      espEnabled,
      itemEspEnabled,
      thermalVisionEnabled,
      nightVisionEnabled,
      alwaysDayEnabled,
      wideLeanEnabled,
      lootThroughWallsEnabled,
      playerDistance: playerDistance[0],
      itemDistance: itemDistance[0]
    });
  };

  // Setup event handlers for settings changes
  useEffect(() => {
    // Sync all settings with host on initial load and when connection changes
    syncAllSettings();
    
    // Show toast when connection status changes
    if (isConnected) {
      toast({
        title: "Connected to Host",
        description: "Settings will be synced automatically",
      });
    }
  }, [isConnected]);

  // Sync individual settings when they change
  useEffect(() => {
    // Memory settings
    if (isConnected) {
      updateSettings('memory', {
        memoryEnabled,
        advancedMemoryEnabled,
        antiPageEnabled
      });
    }
  }, [memoryEnabled, advancedMemoryEnabled, antiPageEnabled, isConnected]);

  useEffect(() => {
    // Aimbot settings
    if (isConnected) {
      updateSettings('aimbot', {
        aimbotEnabled,
        headshotAimEnabled,
        noRecoilEnabled,
        autoBoneEnabled,
        randomBoneEnabled,
        safeLockEnabled,
        disableReLockEnabled,
        fov: fov[0],
        targetBone
      });
    }
  }, [
    aimbotEnabled, headshotAimEnabled, noRecoilEnabled, 
    autoBoneEnabled, randomBoneEnabled, safeLockEnabled, 
    disableReLockEnabled, fov, targetBone, isConnected
  ]);

  useEffect(() => {
    // ESP settings
    if (isConnected) {
      updateSettings('esp', {
        espEnabled,
        itemEspEnabled,
        thermalVisionEnabled,
        nightVisionEnabled,
        alwaysDayEnabled,
        wideLeanEnabled,
        lootThroughWallsEnabled,
        playerDistance: playerDistance[0],
        itemDistance: itemDistance[0]
      });
    }
  }, [
    espEnabled, itemEspEnabled, thermalVisionEnabled, 
    nightVisionEnabled, alwaysDayEnabled, wideLeanEnabled, 
    lootThroughWallsEnabled, playerDistance, itemDistance, isConnected
  ]);

  // Misc features
  useEffect(() => {
    if (isConnected) {
      updateSettings('misc', {
        infiniteStaminaEnabled,
        fastLoadEnabled,
        hideRaidInfoEnabled,
        disableInventoryBlurEnabled,
        moveSpeedEnabled,
        noWrapMalfunctionsEnabled,
        fullBrightEnabled,
        rageModeEnabled,
        gymHackEnabled,
        antiAFKEnabled
      });
    }
  }, [
    infiniteStaminaEnabled, fastLoadEnabled, hideRaidInfoEnabled,
    disableInventoryBlurEnabled, moveSpeedEnabled, noWrapMalfunctionsEnabled,
    fullBrightEnabled, rageModeEnabled, gymHackEnabled, antiAFKEnabled, isConnected
  ]);

  // Create organized settings objects for easier access
  const memorySettings: MemorySettings = {
    memoryEnabled,
    advancedMemoryEnabled,
    antiPageEnabled,
    infiniteStaminaEnabled,
    fastLoadEnabled,
    lootThroughWallsEnabled,
    hideRaidInfoEnabled,
    disableInventoryBlurEnabled,
    moveSpeedEnabled,
    noWrapMalfunctionsEnabled,
    fullBrightEnabled,
    rageModeEnabled,
    gymHackEnabled,
    antiAFKEnabled
  };

  const aimbotSettings: AimbotSettings = {
    aimbotEnabled,
    headshotAimEnabled,
    noRecoilEnabled,
    autoBoneEnabled,
    randomBoneEnabled,
    safeLockEnabled,
    disableReLockEnabled,
    fov,
    targetBone
  };

  const espSettings: ESPSettings = {
    espEnabled,
    itemEspEnabled,
    thermalVisionEnabled,
    nightVisionEnabled,
    alwaysDayEnabled,
    wideLeanEnabled,
    playerDistance,
    itemDistance
  };

  const value = {
    // Memory settings
    memorySettings,
    setMemoryEnabled,
    setAdvancedMemoryEnabled,
    setAntiPageEnabled,
    setInfiniteStaminaEnabled,
    setFastLoadEnabled,
    setLootThroughWallsEnabled,
    setHideRaidInfoEnabled,
    setDisableInventoryBlurEnabled,
    setMoveSpeedEnabled,
    setNoWrapMalfunctionsEnabled,
    setFullBrightEnabled,
    setRageModeEnabled,
    setGymHackEnabled,
    setAntiAFKEnabled,

    // Aimbot settings
    aimbotSettings,
    setAimbotEnabled,
    setHeadshotAimEnabled,
    setNoRecoilEnabled,
    setAutoBoneEnabled,
    setRandomBoneEnabled,
    setSafeLockEnabled,
    setDisableReLockEnabled,
    setFov,
    setTargetBone,

    // ESP settings
    espSettings,
    setEspEnabled,
    setItemEspEnabled,
    setThermalVisionEnabled,
    setNightVisionEnabled,
    setAlwaysDayEnabled,
    setWideLeanEnabled,
    setPlayerDistance,
    setItemDistance,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
