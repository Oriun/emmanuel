import React from "react";
import styles from "./home.module.scss";
import useTranslation from "next-translate/useTranslation";
import Whiteboard from "@/layouts/whiteboard";
import Hero from "./atoms/hero";

const Home: React.FC = () => {
  const translate = useTranslation();
  return (
    <>
      <Whiteboard className={styles.whiteboard}>
        <Hero />
      </Whiteboard>
    </>
  );
};

export default Home;
