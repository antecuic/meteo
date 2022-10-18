import React from "react";

import styles from "./Button.module.css";

interface Props {
  title: string;
  onClick: () => void;
}

function Button({ title, onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
