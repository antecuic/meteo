import { useEffect, useState } from "react";
import {
  ApplicationSettings,
  getSettings,
  NewSettings,
  resetSettings,
  saveSettings,
} from "utils/applicationSettings";

function useAppSettings() {
  const [appSettings, setAppSettings] = useState<ApplicationSettings>();

  const getSetting = () => {
    const settings = getSettings();
    setAppSettings(settings);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const updateSettings = (newSettings: NewSettings) => {
    saveSettings(newSettings);
    getSetting();
  };

  const settingsReset = () => {
    resetSettings();
    getSetting();
  };

  return { appSettings, settingsReset, updateSettings };
}

export default useAppSettings;
