import settings from "../pages/settings/settings.json";

const KEY = "@settings";

export enum AvailableUnits {
  temp = "temperature",
  windSpeed = "windSpeed",
  precipitation = "precipitation",
}

interface ApplicationSettings {
  temperature: string;
  windSpeed: string;
  precipitation: string;
}

interface NewSettings {
  [key: string]: string;
}

const defaultSettings: ApplicationSettings = {
  temperature: settings.temperature.setting[0].value,
  windSpeed: settings.windSpeed.setting[0].value,
  precipitation: settings.precipitation.setting[0].value,
};

export const getSettings = () => {
  if (typeof window === "undefined") {
    return;
  }
  const settings = window.localStorage.getItem(KEY);
  if (settings) {
    return JSON.parse(settings) as ApplicationSettings;
  } else {
    return defaultSettings;
  }
};

export const getUnitSetting = (unit: AvailableUnits) => {
  const currentSettings = getSettings();
  return currentSettings?.[unit];
};

export const saveSettings = (newSettings: NewSettings) => {
  const current = getSettings();
  window.localStorage.setItem(
    KEY,
    JSON.stringify({ ...current, ...newSettings })
  );
};

export const resetSettings = () => {
  window.localStorage.removeItem(KEY);
};
