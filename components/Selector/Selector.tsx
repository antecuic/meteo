import React, { useEffect, useState } from "react";
import settingsJSON from "@/pages/settings/settings.json";
import { NewSettings, SettingKey } from "utils/applicationSettings";

import styles from "./Selector.module.css";

interface Props {
  settingKey: SettingKey;
  selected?: string;
  updateValue: (newSetting: NewSettings) => void;
}

function Selector({ settingKey, selected, updateValue }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const options = settingsJSON[settingKey];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  const handleSelectOption = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    updateValue({ [settingKey]: value });
  };

  return (
    <select
      value={selected}
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
