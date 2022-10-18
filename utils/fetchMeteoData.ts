import Data from "types/Data";
import { ApplicationSettings, getSettings } from "./applicationSettings";

export interface Params {
  [key: string]: string;
}

export const fetchMeteoData = async (params: Params) => {
  const appSettings = getSettings() || ({} as ApplicationSettings);
  const fetchUrl = new URL("https://api.open-meteo.com/v1/forecast");

  for (const key in params) {
    fetchUrl.searchParams.set(key, params[key]);
  }

  let setting: keyof ApplicationSettings;
  for (setting in appSettings) {
    fetchUrl.searchParams.set(setting, appSettings[setting]);
  }

  const res = await fetch(fetchUrl.toString().replace(/%2C/g, ","));

  const data = await res.json();
  return data as Data;
};
