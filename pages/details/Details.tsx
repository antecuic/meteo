import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";

import { fetchMeteoData, Params } from "utils/fetchMeteoData";
import Sidebar from "@/components/Sidebar";
import useFavourites from "hooks/useFavourites";
import hourlyVariables from "../../hourlyWeatherVariables.json";
import dailyVariables from "../../dailyWeatherVariables.json";
import Data from "types/Data";

import styles from "./Details.module.css";
import { useRouter } from "next/router";

const DEFAULT_HOURLY_VARIABLES = [hourlyVariables[0].value];
const DEFAULT_DAILY_VARIABLES = [dailyVariables[0].value];

type CurrentView = "daily" | "hourly";

export default function Details() {
  const router = useRouter();
  const { favourites, toggleFavourite } = useFavourites();
  const [variables, setVariables] = useState<string[]>(
    DEFAULT_HOURLY_VARIABLES
  );
  const [currentView, setCurrentView] = useState<CurrentView>("hourly");
  const [meteoData, setMeteoData] = useState<Data>();

  const fetchData = useCallback(async () => {
    const data = await fetchMeteoData({
      ...(router.query as Params),
      [currentView]: variables.join(","),
    });
    setMeteoData(data);
  }, [variables]);

  useEffect(() => {
    fetchData();
  }, [fetchData, variables]);

  const onCheckboxToggle = ({
    target: { checked, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      setVariables((prevState) => [...prevState, value]);
    } else {
      const filteredVariables = variables.filter(
        (variable) => variable !== value
      );
      setVariables(filteredVariables);
    }
  };

  const selectView = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setVariables([]);
    const isDaily = value === "daily";

    if (value !== "daily" && value !== "hourly") {
      setCurrentView("hourly");
      setVariables(DEFAULT_HOURLY_VARIABLES);
      return;
    }

    setCurrentView(value);
    setVariables(() =>
      isDaily ? DEFAULT_DAILY_VARIABLES : DEFAULT_HOURLY_VARIABLES
    );
  };

  return (
    <>
      <Head>
        <title>Meteo Details</title>
      </Head>
      <main className={styles.main}>
        <Sidebar favourites={favourites} handleStarClick={toggleFavourite} />
        <div className={styles.content}>
          <h1 className={styles.heading}>
            Meteorologic data for {router.query?.name}
          </h1>
          <select className={styles.variableSelector} onChange={selectView}>
            <option value="hourly">Hourly View</option>
            <option value="daily">Daily View</option>
          </select>
          <div>
            <h2>
              {currentView === "daily" ? "Daily" : "Hourly"} Weather Variables
            </h2>
            <div className={styles.variablesContainer}>
              {(currentView === "daily" ? dailyVariables : hourlyVariables).map(
                (variable) => (
                  <div key={variable.label} className={styles.variable}>
                    <input
                      type="checkbox"
                      checked={variables.includes(variable.value)}
                      value={variable.value}
                      onChange={onCheckboxToggle}
                    />
                    <label htmlFor={variable.value}>{variable.label}</label>
                  </div>
                )
              )}
            </div>
            <p>{meteoData?.latitude}</p>
          </div>
        </div>
      </main>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { query } = context;
//   const meteoData = await fetchMeteoData(query as Params);

//   return {
//     props: { meteoData, city: query as City } as Props,
//   };
// };
