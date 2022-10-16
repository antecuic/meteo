import React, { useEffect } from "react";
import settings from "@/pages/settings/settings.json";
import {
  AvailableUnits,
  getSettings,
  getUnitSetting,
  saveSettings,
} from "utils/applicationSettings";

import styles from "./RadioSetting.module.css";

interface Props {
  unitKey: AvailableUnits;
}

function RadioSetting({ unitKey }: Props) {
  const radios = settings[unitKey];
  const radioChecked = getUnitSetting(unitKey);

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
          <div className={styles.choice}>
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
