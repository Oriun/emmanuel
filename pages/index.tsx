import Head from "next/head";
import Home from "@/views/home";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Emmanuel</title>
        <meta
          name="description"
          content="Emmanuel est un développeur fullstack qui design et réalise des expériences utilisateurs mémorables et des architectures robustes."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}
