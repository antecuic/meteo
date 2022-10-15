import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { fetchMeteoData, Params } from "utils/fetchMeteoData";
import Sidebar from "@/components/Sidebar";
import useFavourites from "hooks/useFavourites";
import City from "types/City";
import hourlyVariables from "../../hourlyWeatherVariables.json";
import dailyVariables from "../../dailyWeatherVariables.json";
import Data from "types/Data";

import styles from "./index.module.css";

interface Props {
  city: City;
  meteoData: Data;
}
type CurrentView = "daily" | "hourly";

export default function Details({ city, meteoData }: Props) {
  const { favourites, toggleFavourite } = useFavourites();
  const [variables, setVariables] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<CurrentView>("hourly");

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
    if (value !== "daily" && value !== "hourly") {
      setCurrentView("hourly");
      return;
    }
    setCurrentView(value);
  };

  return (
    <>
      <Head>
        <title>Meteo for {city.name}</title>
      </Head>
      <main className={styles.main}>
        <Sidebar favourites={favourites} handleStarClick={toggleFavourite} />
        <div className={styles.content}>
          <h1 className={styles.heading}>Meteorologic data for {city.name}</h1>
          <select onChange={selectView}>
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
                  <div key={variable.value} className={styles.variable}>
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      value={variable.value}
                      onChange={onCheckboxToggle}
                    />
                    <label htmlFor={variable.value}>{variable.label}</label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const meteoData = await fetchMeteoData(query as Params);

  return {
    props: { meteoData, city: query as City } as Props,
  };
};
