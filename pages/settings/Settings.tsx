import React from "react";
import Head from "next/head";
import RadioSetting from "@/components/RadioSetting";

import styles from "./Settings.module.css";
import { AvailableUnits } from "utils/applicationSettings";

function Settings() {
  return (
    <>
      <Head>Application Settings</Head>
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Settings page</h1>
          <div className={styles.settingsContent}>
            <RadioSetting unitKey={AvailableUnits.temp} />
            <RadioSetting unitKey={AvailableUnits.windSpeed} />
            <RadioSetting unitKey={AvailableUnits.precipitation} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Settings;
