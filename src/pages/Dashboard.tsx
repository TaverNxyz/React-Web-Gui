
import React from "react";
import SettingsLayout from "@/components/settings/SettingsLayout";
import SauceDispenserTab from "@/components/settings/SauceDispenserTab";
import AimbotTab from "@/components/settings/AimbotTab";
import ESPTab from "@/components/settings/ESPTab";
import UITab from "@/components/settings/UITab";
import { useSettings } from "@/contexts/SettingsContext";

const Dashboard = () => {
  const {
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
  } = useSettings();

  return (
    <SettingsLayout
      sauceDispenserContent={
        <SauceDispenserTab
          memoryEnabled={memorySettings.memoryEnabled}
          setMemoryEnabled={setMemoryEnabled}
          advancedMemoryEnabled={memorySettings.advancedMemoryEnabled}
          setAdvancedMemoryEnabled={setAdvancedMemoryEnabled}
          antiPageEnabled={memorySettings.antiPageEnabled}
          setAntiPageEnabled={setAntiPageEnabled}
          infiniteStaminaEnabled={memorySettings.infiniteStaminaEnabled}
          setInfiniteStaminaEnabled={setInfiniteStaminaEnabled}
          fastLoadEnabled={memorySettings.fastLoadEnabled}
          setFastLoadEnabled={setFastLoadEnabled}
          lootThroughWallsEnabled={memorySettings.lootThroughWallsEnabled}
          setLootThroughWallsEnabled={setLootThroughWallsEnabled}
          hideRaidInfoEnabled={memorySettings.hideRaidInfoEnabled}
          setHideRaidInfoEnabled={setHideRaidInfoEnabled}
          disableInventoryBlurEnabled={memorySettings.disableInventoryBlurEnabled}
          setDisableInventoryBlurEnabled={setDisableInventoryBlurEnabled}
          moveSpeedEnabled={memorySettings.moveSpeedEnabled}
          setMoveSpeedEnabled={setMoveSpeedEnabled}
          noWrapMalfunctionsEnabled={memorySettings.noWrapMalfunctionsEnabled}
          setNoWrapMalfunctionsEnabled={setNoWrapMalfunctionsEnabled}
          fullBrightEnabled={memorySettings.fullBrightEnabled}
          setFullBrightEnabled={setFullBrightEnabled}
          rageModeEnabled={memorySettings.rageModeEnabled}
          setRageModeEnabled={setRageModeEnabled}
          gymHackEnabled={memorySettings.gymHackEnabled}
          setGymHackEnabled={setGymHackEnabled}
          antiAFKEnabled={memorySettings.antiAFKEnabled}
          setAntiAFKEnabled={setAntiAFKEnabled}
        />
      }
      aimbotContent={
        <AimbotTab
          aimbotEnabled={aimbotSettings.aimbotEnabled}
          setAimbotEnabled={setAimbotEnabled}
          headshotAimEnabled={aimbotSettings.headshotAimEnabled}
          setHeadshotAimEnabled={setHeadshotAimEnabled}
          noRecoilEnabled={aimbotSettings.noRecoilEnabled}
          setNoRecoilEnabled={setNoRecoilEnabled}
          autoBoneEnabled={aimbotSettings.autoBoneEnabled}
          setAutoBoneEnabled={setAutoBoneEnabled}
          randomBoneEnabled={aimbotSettings.randomBoneEnabled}
          setRandomBoneEnabled={setRandomBoneEnabled}
          safeLockEnabled={aimbotSettings.safeLockEnabled}
          setSafeLockEnabled={setSafeLockEnabled}
          disableReLockEnabled={aimbotSettings.disableReLockEnabled}
          setDisableReLockEnabled={setDisableReLockEnabled}
          fov={aimbotSettings.fov}
          setFov={setFov}
          targetBone={aimbotSettings.targetBone}
          setTargetBone={setTargetBone}
        />
      }
      espContent={
        <ESPTab
          espEnabled={espSettings.espEnabled}
          setEspEnabled={setEspEnabled}
          itemEspEnabled={espSettings.itemEspEnabled}
          setItemEspEnabled={setItemEspEnabled}
          thermalVisionEnabled={espSettings.thermalVisionEnabled}
          setThermalVisionEnabled={setThermalVisionEnabled}
          nightVisionEnabled={espSettings.nightVisionEnabled}
          setNightVisionEnabled={setNightVisionEnabled}
          alwaysDayEnabled={espSettings.alwaysDayEnabled}
          setAlwaysDayEnabled={setAlwaysDayEnabled}
          wideLeanEnabled={espSettings.wideLeanEnabled}
          setWideLeanEnabled={setWideLeanEnabled}
          lootThroughWallsEnabled={memorySettings.lootThroughWallsEnabled}
          setLootThroughWallsEnabled={setLootThroughWallsEnabled}
          playerDistance={espSettings.playerDistance}
          setPlayerDistance={setPlayerDistance}
          itemDistance={espSettings.itemDistance}
          setItemDistance={setItemDistance}
        />
      }
      uiContent={<UITab />}
    />
  );
};

export default Dashboard;
