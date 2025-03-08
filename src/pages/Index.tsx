
import { useState, useEffect } from "react";
import SettingsLayout from "@/components/settings/SettingsLayout";
import SauceDispenserTab from "@/components/settings/SauceDispenserTab";
import AimbotTab from "@/components/settings/AimbotTab";
import ESPTab from "@/components/settings/ESPTab";
import UITab from "@/components/settings/UITab";
import { useInterop } from "@/contexts/InteropContext";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { isConnected, updateSettings } = useInterop();
  const { toast } = useToast();

  // Sauce Dispenser settings
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

  return (
    <SettingsLayout
      sauceDispenserContent={
        <SauceDispenserTab
          memoryEnabled={memoryEnabled}
          setMemoryEnabled={setMemoryEnabled}
          advancedMemoryEnabled={advancedMemoryEnabled}
          setAdvancedMemoryEnabled={setAdvancedMemoryEnabled}
          antiPageEnabled={antiPageEnabled}
          setAntiPageEnabled={setAntiPageEnabled}
          infiniteStaminaEnabled={infiniteStaminaEnabled}
          setInfiniteStaminaEnabled={setInfiniteStaminaEnabled}
          fastLoadEnabled={fastLoadEnabled}
          setFastLoadEnabled={setFastLoadEnabled}
          lootThroughWallsEnabled={lootThroughWallsEnabled}
          setLootThroughWallsEnabled={setLootThroughWallsEnabled}
          hideRaidInfoEnabled={hideRaidInfoEnabled}
          setHideRaidInfoEnabled={setHideRaidInfoEnabled}
          disableInventoryBlurEnabled={disableInventoryBlurEnabled}
          setDisableInventoryBlurEnabled={setDisableInventoryBlurEnabled}
          moveSpeedEnabled={moveSpeedEnabled}
          setMoveSpeedEnabled={setMoveSpeedEnabled}
          noWrapMalfunctionsEnabled={noWrapMalfunctionsEnabled}
          setNoWrapMalfunctionsEnabled={setNoWrapMalfunctionsEnabled}
          fullBrightEnabled={fullBrightEnabled}
          setFullBrightEnabled={setFullBrightEnabled}
          rageModeEnabled={rageModeEnabled}
          setRageModeEnabled={setRageModeEnabled}
          gymHackEnabled={gymHackEnabled}
          setGymHackEnabled={setGymHackEnabled}
          antiAFKEnabled={antiAFKEnabled}
          setAntiAFKEnabled={setAntiAFKEnabled}
        />
      }
      aimbotContent={
        <AimbotTab
          aimbotEnabled={aimbotEnabled}
          setAimbotEnabled={setAimbotEnabled}
          headshotAimEnabled={headshotAimEnabled}
          setHeadshotAimEnabled={setHeadshotAimEnabled}
          noRecoilEnabled={noRecoilEnabled}
          setNoRecoilEnabled={setNoRecoilEnabled}
          autoBoneEnabled={autoBoneEnabled}
          setAutoBoneEnabled={setAutoBoneEnabled}
          randomBoneEnabled={randomBoneEnabled}
          setRandomBoneEnabled={setRandomBoneEnabled}
          safeLockEnabled={safeLockEnabled}
          setSafeLockEnabled={setSafeLockEnabled}
          disableReLockEnabled={disableReLockEnabled}
          setDisableReLockEnabled={setDisableReLockEnabled}
          fov={fov}
          setFov={setFov}
          targetBone={targetBone}
          setTargetBone={setTargetBone}
        />
      }
      espContent={
        <ESPTab
          espEnabled={espEnabled}
          setEspEnabled={setEspEnabled}
          itemEspEnabled={itemEspEnabled}
          setItemEspEnabled={setItemEspEnabled}
          thermalVisionEnabled={thermalVisionEnabled}
          setThermalVisionEnabled={setThermalVisionEnabled}
          nightVisionEnabled={nightVisionEnabled}
          setNightVisionEnabled={setNightVisionEnabled}
          alwaysDayEnabled={alwaysDayEnabled}
          setAlwaysDayEnabled={setAlwaysDayEnabled}
          wideLeanEnabled={wideLeanEnabled}
          setWideLeanEnabled={setWideLeanEnabled}
          lootThroughWallsEnabled={lootThroughWallsEnabled}
          setLootThroughWallsEnabled={setLootThroughWallsEnabled}
          playerDistance={playerDistance}
          setPlayerDistance={setPlayerDistance}
          itemDistance={itemDistance}
          setItemDistance={setItemDistance}
        />
      }
      uiContent={<UITab />}
    />
  );
};

export default Index;
