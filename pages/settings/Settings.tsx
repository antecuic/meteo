import React from "react";
import Head from "next/head";
import RadioSetting from "@/components/RadioSetting";
import { SettingKey } from "utils/applicationSettings";
import Selector from "@/components/Selector";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import useFavourites from "hooks/useFavourites";
import useAppSettings from "hooks/useAppSettings";

import styles from "./Settings.module.css";

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
              unitKey={SettingKey.temperature_unit}
              checkedSetting={appSettings?.temperature_unit}
              updateValue={updateSettings}
            />
            <RadioSetting
              unitKey={SettingKey.windspeed_unit}
              checkedSetting={appSettings?.windspeed_unit}
              updateValue={updateSettings}
            />
            <RadioSetting
              unitKey={SettingKey.precipitation_unit}
              checkedSetting={appSettings?.precipitation_unit}
              updateValue={updateSettings}
            />
            <Selector
              settingKey={SettingKey.timezone}
              selected={appSettings?.timezone}
              updateValue={updateSettings}
            />
            <Selector
              settingKey={SettingKey.past_days}
              selected={appSettings?.past_days}
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
