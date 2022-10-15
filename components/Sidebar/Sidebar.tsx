import React, { useState } from "react";
import cn from "clsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

import City from "types/City";

import styles from "./Sidebar.module.css";

interface Props {
  favourites: City[];
}

function Sidebar({ favourites }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <GiHamburgerMenu
        size={35}
        className={styles.burgerMenu}
        onClick={() => setShowSidebar(true)}
      />
      <div className={cn([styles.sidebar, showSidebar && styles.show])}>
        <VscChromeClose
          size={35}
          className={styles.close}
          onClick={() => setShowSidebar(false)}
        />
        <h2>Favourites</h2>
        {favourites.map((city) => (
          <p key={city.name}>{city.name}</p>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
