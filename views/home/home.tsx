import React from "react";
import styles from "./home.module.scss";
import useTranslation from "next-translate/useTranslation";
import Whiteboard from "@/layouts/whiteboard";

const Home: React.FC = () => {
  const translate = useTranslation();
  return <Whiteboard className={styles.whiteboard} />;
};

export default Home;
