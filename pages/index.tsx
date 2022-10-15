import Sidebar from "@/components/Sidebar";
import useFavourites from "hooks/useFavourites";
import Head from "next/head";
import CitiesSearch from "../components/CitiesSearch";

import styles from "./index.module.css";

export default function Home() {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <div>
      <Head>
        <title>Meteo</title>
      </Head>
      <main className={styles.main}>
        <Sidebar favourites={favourites} />
        <div className={styles.content}>
          <h1 className={styles.heading}>Meteo App</h1>
          <CitiesSearch
            favourites={favourites}
            handleStarClick={toggleFavourite}
          />
        </div>
      </main>
    </div>
  );
}
