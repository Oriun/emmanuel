import React from "react";
import styles from "./home.module.scss";
import Whiteboard from "@/layouts/whiteboard";
import Hero from "./atoms/hero";

const Home: React.FC = () => {
  const [sections, setSections] = React.useState<React.FC[]>([Hero]);
  return (
    <Whiteboard className={styles.whiteboard}>
      {sections.map((Section, index) => (
        <Section key={index} />
      ))}
    </Whiteboard>
  );
};

export default Home;
