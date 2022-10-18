import React from "react";
import Head from "next/head";
import RadioSetting from "@/components/RadioSetting";
import { SettingKey } from "utils/applicationSettings";
import Selector from "@/components/Selector";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import useFavourites from "hooks/useFavourites";

import styles from "./Settings.module.css";
import useAppSettings from "hooks/useAppSettings";

function Settings() {
  const { favourites, toggleFavourite, clearFavourites } = useFavourites();
  const { appSettings, settingsReset, updateSettings } = useAppSettings();

  return (
    <>
      <Head>Application Settings</Head>
      <main className={styles.main}>
        <Sidebar favourites={favourites} handleStarClick={toggleFavourite} />
        <div className={styles.content}>
          <h1 className={styles.heading}>Settings page</h1>
          <div className={styles.settingsContent}>
            <RadioSetting
              unitKey={SettingKey.temp}
              checkedSetting={appSettings?.temperature}
              updateValue={updateSettings}
            />
            <RadioSetting
              unitKey={SettingKey.windSpeed}
              checkedSetting={appSettings?.windSpeed}
              updateValue={updateSettings}
            />
            <RadioSetting
              unitKey={SettingKey.precipitation}
              checkedSetting={appSettings?.precipitation}
              updateValue={updateSettings}
            />
            <Selector
              settingKey={SettingKey.timezones}
              selected={appSettings?.timezones}
              updateValue={updateSettings}
            />
            <Selector
              settingKey={SettingKey.pastDays}
              selected={appSettings?.pastDays}
              updateValue={updateSettings}
            />
            <div className={styles.buttons}>
              <Button title="Reset settings" onClick={settingsReset} />
              <Button title="Delete favourites" onClick={clearFavourites} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Settings;
