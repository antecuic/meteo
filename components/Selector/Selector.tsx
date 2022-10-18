import React, { useEffect, useState } from "react";
import settingsJSON from "@/pages/settings/settings.json";
import {
  getSetting,
  saveSettings,
  SettingKey,
} from "utils/applicationSettings";

import styles from "./Selector.module.css";

interface Props {
  settingKey: SettingKey;
}

function Selector({ settingKey }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const options = settingsJSON[settingKey];
  const optionSelected = getSetting(settingKey);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  const handleSelectOption = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    saveSettings({ [settingKey]: value });
  };

  return (
    <select
      defaultValue={optionSelected}
      className={styles.selector}
      onChange={handleSelectOption}
    >
      {options.setting.map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default Selector;
