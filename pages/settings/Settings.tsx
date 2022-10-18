import React from "react";
import Head from "next/head";
import RadioSetting from "@/components/RadioSetting";
import { resetSettings, SettingKey } from "utils/applicationSettings";
import Selector from "@/components/Selector";
import Button from "@/components/Button";
import { removeAllFavourites } from "utils/favourites";
import Sidebar from "@/components/Sidebar";
import useFavourites from "hooks/useFavourites";

import styles from "./Settings.module.css";

function Settings() {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <>
      <Head>Application Settings</Head>
      <main className={styles.main}>
        <Sidebar favourites={favourites} handleStarClick={toggleFavourite} />
        <div className={styles.content}>
          <h1 className={styles.heading}>Settings page</h1>
          <div className={styles.settingsContent}>
            <RadioSetting unitKey={SettingKey.temp} />
            <RadioSetting unitKey={SettingKey.windSpeed} />
            <RadioSetting unitKey={SettingKey.precipitation} />
            <Selector settingKey={SettingKey.timezones} />
            <Selector settingKey={SettingKey.pastDays} />
            <div className={styles.buttons}>
              <Button title="Reset settings" onClick={resetSettings} />
              <Button title="Delete favourites" onClick={removeAllFavourites} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Settings;
