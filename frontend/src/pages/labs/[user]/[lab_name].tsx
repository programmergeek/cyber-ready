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
        <GuacamoleClient />
      </main>
    </>
  );
};

export default Lab;
