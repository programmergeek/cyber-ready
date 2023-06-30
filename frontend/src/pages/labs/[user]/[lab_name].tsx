import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import GuacamoleClient, { Card } from "~/components";

const Lab: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lab</title>
      </Head>
      <main>
        <div className="grid grid-cols-[1008px_auto] gap-2 pr-2">
          <GuacamoleClient hostname="192.168.56.5" />
          <div>
            <Card dark>This is Sparta!</Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Lab;
