import React from "react";
import settings from "@/pages/settings/settings.json";
import { SettingKey, NewSettings } from "utils/applicationSettings";

import styles from "./RadioSetting.module.css";

interface Props {
  unitKey: SettingKey;
  checkedSetting?: string;
  updateValue: (newSetting: NewSettings) => void;
}

function RadioSetting({ unitKey, checkedSetting, updateValue }: Props) {
  const radios = settings[unitKey];

  const onCheckboxToggle = ({
    target: { checked, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      updateValue({ [unitKey]: value });
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
              checked={value === checkedSetting}
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
