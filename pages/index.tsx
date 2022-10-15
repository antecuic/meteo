import Head from "next/head";
import CitiesSearch from "../components/CitiesSearch";

import styles from "./index.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Meteo</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading}>Meteo App</h1>
        <CitiesSearch />
      </main>
    </div>
  );
}
