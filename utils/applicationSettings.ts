import settings from "../pages/settings/settings.json";

const KEY = "@settings";

export enum SettingKey {
  temp = "temperature",
  windSpeed = "windSpeed",
  precipitation = "precipitation",
  timezones = "timezones",
  pastDays = "pastDays",
}

export interface ApplicationSettings {
  temperature: string;
  windSpeed: string;
  precipitation: string;
  timezones: string;
  pastDays: string;
}

export interface NewSettings {
  [key: string]: string;
}

export const defaultSettings: ApplicationSettings = {
  temperature: settings.temperature.setting[0].value,
  windSpeed: settings.windSpeed.setting[0].value,
  precipitation: settings.precipitation.setting[0].value,
  timezones:
    settings.timezones.setting.find((zone) => zone.value === "auto")?.value ||
    "GMT",
  pastDays: "0",
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

export const getSetting = (key: SettingKey) => {
  const currentSettings = getSettings();
  return currentSettings?.[key];
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
