export interface Params {
  [key: string]: string;
}

export const fetchMeteoData = async (params: Params) => {
  const fetchUrl = new URL(
    "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m"
  );
  const paramKeys = Object.keys(params);
  paramKeys.forEach((key) => {
    fetchUrl.searchParams.set(key, params[key]);
  });

  const res = await fetch(fetchUrl);

  const data = await res.json();
  return data;
};
