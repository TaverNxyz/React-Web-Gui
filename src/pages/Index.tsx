
import { useState } from "react";
import SettingsLayout from "@/components/settings/SettingsLayout";
import SauceDispenserTab from "@/components/settings/SauceDispenserTab";
import AimbotTab from "@/components/settings/AimbotTab";
import ESPTab from "@/components/settings/ESPTab";
import UITab from "@/components/settings/UITab";

const Index = () => {
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
