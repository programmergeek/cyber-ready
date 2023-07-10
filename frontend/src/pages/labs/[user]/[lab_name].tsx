import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import GuacamoleClient, {
  Card,
  OverflowCard,
  Progress,
  Text,
} from "~/components";
import { TextField } from "~/components/textfield/textfield";
import { GoLightBulb } from "react-icons/go";
import { IoPower } from "react-icons/io5";
import Link from "next/link";

const Lab: NextPage = () => {
  const [showHint, updateShowHint] = useState(false);

  return (
    <>
      <Head>
        <title>Lab</title>
      </Head>
      <main>
        <div className="grid grid-cols-[1008px_auto] gap-2 pr-2">
          <div className="mt-1">
            <GuacamoleClient hostname="192.168.56.5" />
          </div>
          <div className="relative mt-2 flex flex-col gap-2 transition">
            <Card shadow>
              <Progress totalTasks={3} completedTasks={1} />
              <div className="my-5 max-h-28 overflow-auto pr-3">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent sagittis pretium dolor a accumsan. Cras quis congue
                  leo. Morbi iaculis mauris quis eros elementum tempor sit amet
                  nec justo.
                </Text>
              </div>
              <TextField />
              <div className="flex w-full justify-end gap-3">
                <button
                  className={`rounded-meap border ${
                    !showHint ? "border-grey" : "border-yellow"
                  } bg-white px-3 py-2 transition-colors`}
                  onClick={() => {
                    updateShowHint(!showHint);
                  }}
                >
                  <GoLightBulb
                    className={`${
                      !showHint ? "text-grey" : "text-yellow"
                    } transition-colors`}
                  />
                </button>
                <button
                  className="rounded-meap bg-black px-4 py-2 text-white"
                  onClick={async () => {
                    const data = await window
                      .fetch("http://127.0.0.1:4000", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          filepath: "/home/vagrant/Documents/meap/test",
                        }),
                      })
                      .then((res) => res.json())
                      .catch(console.error);

                    console.log(data);
                  }}
                >
                  Check
                </button>
              </div>
              <div
                className={`mt-5 max-h-40 overflow-auto rounded-meap bg-lightGrey px-4 py-4 text-grey ${
                  showHint ? "" : "hidden"
                }`}
              >
                <span className="text-darkGrey">Hint: </span>
                <Text inline>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent sagittis pretium dolor a accumsan. Cras quis congue
                  leo. Morbi iaculis mauris quis eros elementum tempor sit amet
                  nec justo. Proin pharetra aliquet ipsum vitae posuere. Nam
                  sagittis, quam at tempus luctus, diam ipsum tristique tortor,
                  vitae maximus augue diam at lacus.
                </Text>
              </div>
            </Card>
            <OverflowCard title="Context:">
              <Text dark>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent sagittis pretium dolor a accumsan. Cras quis congue
                leo. Morbi iaculis mauris quis eros elementum tempor sit amet
                nec justo. Proin pharetra aliquet ipsum vitae posuere. Nam
                sagittis, quam at tempus luctus, diam ipsum tristique tortor,
                vitae maximus augue diam at lacus. Nullam enim nibh, finibus
                quis enim eget, eleifend hendrerit tellus. Nunc ut ullamcorper
                sem, non venenatis purus.
                <br />
                <br />
                Praesent sed sagittis risus. Nulla vehicula odio a semper
                rhoncus. Mauris molestie orci non ultricies faucibus. Sed auctor
                pellentesque velit, vitae facilisis felis tempor non. Proin
                congue sollicitudin quam id molestie. Fusce tincidunt sit amet
                purus in mattis. Fusce condimentum et justo id ultricies. Nullam
                imperdiet felis in pulvinar tempor. Donec enim eros, consectetur
                vitae convallis sed, suscipit sed neque. Etiam ornare
                consectetur gravida. Suspendisse potenti.
                <br /> <br />
                Nunc sed egestas justo. Aenean non fringilla lacus, at rhoncus
                lectus. Suspendisse posuere laoreet diam ut tempus. Fusce ut
                neque et tellus consequat tempus. Sed libero arcu, porttitor at
                diam a, efficitur viverra neque. In faucibus molestie odio id
                pulvinar. Etiam quis dapibus magna. Proin viverra sed justo vel
                vulputate. Curabitur ut convallis augue. Quisque rutrum ex
                ligula, quis commodo est hendrerit luctus. Mauris ultricies
                venenatis sapien eget hendrerit. Fusce mauris elit, volutpat eu
                neque a, porttitor mattis purus. Quisque tristique a tortor eget
                fermentum. Praesent at sem venenatis, ornare justo in, malesuada
                massa. Donec odio turpis, laoreet non pretium non, aliquam sit
                amet odio. Duis vitae purus fermentum massa aliquet imperdiet at
                eget sem. Fusce blandit vestibulum ligula, quis feugiat odio
                feugiat id.
                <br /> <br />
                Pellentesque aliquet tempus laoreet. Phasellus non feugiat
                lacus. Aenean porta fermentum eleifend. Donec tortor metus,
                euismod in odio eget, tempor dignissim eros. Morbi vitae ante a
                massa euismod tempor vitae in enim. Curabitur aliquam tortor
                eget faucibus auctor. Mauris ultricies sit amet quam in
                bibendum. Vestibulum sed nunc in augue pretium gravida a a
                turpis. Phasellus suscipit sagittis ex eu scelerisque. Curabitur
                id ante quis est vehicula lobortis. In iaculis purus pretium
                lorem congue cursus. Suspendisse pellentesque diam vitae egestas
                consectetur. Curabitur ultricies diam nec ultricies hendrerit.
                Duis auctor dictum sapien nec pulvinar. Mauris nisi lacus,
                scelerisque in sodales eget, luctus at leo. Quisque malesuada a
                elit sed mollis.
              </Text>
            </OverflowCard>
            <div className="flex justify-end">
              <button
                className="flex w-fit gap-2 rounded-meap bg-red px-4 py-2 text-white"
                onClick={async () =>
                  await fetch("http://127.0.0.1:5000/stop", {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ lab_name: "meep", id: "202005881" }),
                  }).then((res) => {
                    console.log(res.body);
                  })
                }
              >
                <IoPower className="mt-1 text-white" color="#fff" />
                <Link href={{ pathname: "/" }}>Shutdown Lab</Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Lab;
