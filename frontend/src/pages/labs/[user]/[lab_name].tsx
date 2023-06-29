import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import GuacamoleClient from "~/components";

const Lab: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lab</title>
      </Head>
      <main>
        <GuacamoleClient hostname="192.168.56.5" />
      </main>
    </>
  );
};

export default Lab;
