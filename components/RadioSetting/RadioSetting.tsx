import React from "react";
import settings from "@/pages/settings/settings.json";
import {
  SettingKey,
  getSetting,
  saveSettings,
} from "utils/applicationSettings";

import styles from "./RadioSetting.module.css";

interface Props {
  unitKey: SettingKey;
}

function RadioSetting({ unitKey }: Props) {
  const radios = settings[unitKey];
  const radioChecked = getSetting(unitKey);

  const onCheckboxToggle = ({
    target: { checked, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      saveSettings({ [unitKey]: value });
    }
  };

  return (
    <div className={styles.setting}>
      <p>{radios.title}</p>
      <div className={styles.choices}>
        {radios.setting.map(({ name, value }) => (
          <div key={value} className={styles.choice}>
            <input
              type="radio"
              name={name}
              value={value}
              defaultChecked={value === radioChecked}
              onChange={onCheckboxToggle}
            />
            <label>{value}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioSetting;
