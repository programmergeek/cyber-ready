import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Card, Text } from "~/components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="grid w-full grid-cols-[25%_auto_10%] gap-2">
        <div className="h-screen pt-2">
          <Card dark></Card>
        </div>
        <div className="grid h-screen grid-rows-[10%_50%_15%_15%] gap-5 pt-2">
          <div className="h-full w-full rounded-meap bg-darkGrey bg-opacity-95 pl-10 pt-7">
            <Text variant="h3" dark>
              21 June 2023
            </Text>
          </div>
          <Card shadow></Card>
          <div className="grid h-full w-full grid-cols-2 gap-2">
            <Card></Card>
            <Card></Card>
          </div>
          <div className="grid h-full w-full grid-cols-2 gap-2">
            <Card></Card>
            <Card></Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
