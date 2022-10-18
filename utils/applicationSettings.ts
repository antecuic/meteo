import settings from "../settings.json";

const KEY = "@settings";

export enum SettingKey {
  temperature_unit = "temperature_unit",
  windspeed_unit = "windspeed_unit",
  precipitation_unit = "precipitation_unit",
  timezone = "timezone",
  past_days = "past_days",
}

export interface ApplicationSettings {
  temperature_unit: string;
  windspeed_unit: string;
  precipitation_unit: string;
  timezone: string;
  past_days: string;
}

export interface NewSettings {
  [key: string]: string;
}

export const defaultSettings: ApplicationSettings = {
  temperature_unit: settings.temperature_unit.setting[0].value,
  windspeed_unit: settings.windspeed_unit.setting[0].value,
  precipitation_unit: settings.precipitation_unit.setting[0].value,
  timezone:
    settings.timezone.setting.find((zone) => zone.value === "auto")?.value ||
    "GMT",
  past_days: "0",
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
