import * as Checkbox from "@radix-ui/react-checkbox";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Card, OverflowCard, Text } from "~/components";
import { BsCheck2 } from "react-icons/bs";

const LabPage: NextPage = () => {
  const currentTask = 2;
  const tasks = [
    {
      name: "Task 1",
      description:
        "Nam sollicitudin maximus nisl, id venenatis justo. Proin aliquet tortor vel justo gravida, mollis eleifend nisi pulvinar. Suspendisse ac maximus magna.",
      isComplete: true,
    },
    {
      name: "Task 2",
      description:
        "Nam sollicitudin maximus nisl, id venenatis justo. Proin aliquet tortor vel justo gravida, mollis eleifend nisi pulvinar. Suspendisse ac maximus magna.",
      isComplete: false,
    },
    {
      name: "Task 3",
      description:
        "Nam sollicitudin maximus nisl, id venenatis justo. Proin aliquet tortor vel justo gravida, mollis eleifend nisi pulvinar. Suspendisse ac maximus magna.",
      isComplete: false,
    },
    {
      name: "Task 4",
      description:
        "Nam sollicitudin maximus nisl, id venenatis justo. Proin aliquet tortor vel justo gravida, mollis eleifend nisi pulvinar. Suspendisse ac maximus magna.",
      isComplete: false,
    },
  ];

  return (
    <>
      <Head>
        <title>Lab Info</title>
      </Head>
      <main className="mt-1 grid w-full grid-cols-[auto_70%_auto]">
        <div></div>
        <div className="flex flex-col gap-2">
          <Card shadow>
            <div className="mt-3 grid grid-cols-[70%_auto]">
              <Text variant="h1">Lab Name</Text>
              <div className="flex w-full items-center justify-end">
                <button className="h-fit w-fit rounded-meap bg-black px-4 py-2 text-white">
                  Start Next Task
                </button>
              </div>
            </div>
            <Text variant="h3">
              <span className="text-grey">Description</span>
            </Text>
            <Text>
              <span className="my-3">
                Cras vel interdum lorem. Fusce erat leo, consequat at lorem sit
                amet, porttitor lacinia dolor. Donec laoreet sapien a lorem
                tincidunt hendrerit. Nam sollicitudin maximus nisl, id venenatis
                justo. Proin aliquet tortor vel justo gravida, mollis eleifend
                nisi pulvinar. Suspendisse ac maximus magna. Phasellus sodales
                nisi sed efficitur venenatis. Sed eget ante a dolor bibendum
                tincidunt at sit amet sem. Aenean pretium aliquam efficitur.
                Nullam eget enim laoreet, posuere nulla quis, tempus magna.
                Proin vulputate ante quam, nec mattis augue volutpat et.
                <br />
                <br />
                Vestibulum tempor scelerisque augue, eu rutrum magna rhoncus
                sed. Quisque condimentum, odio in pulvinar interdum, erat purus
                semper tortor, vitae fermentum quam sem sed ipsum. Aliquam
                pretium dapibus placerat. Orci varius natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Proin
                dictum felis eros, in eleifend enim aliquet eget. Proin libero
                sapien, accumsan at metus vitae, sollicitudin semper diam.
              </span>
            </Text>
          </Card>
          <div className="grid grid-cols-[45%_33%_auto] gap-1">
            <div>
              <OverflowCard title="Tasks:" height={450}>
                {tasks.map((task, index) => {
                  return (
                    <div
                      className="relative my-1 rounded-meap bg-deepBlack px-3 py-4 pl-4"
                      key={task.name}
                    >
                      <div className="absolute left-0 top-0 h-full w-2 rounded-bl-meap rounded-tl-meap bg-yellow"></div>
                      <div className="flex gap-3">
                        <div>
                          <Text>{task.name}</Text>
                          <div className="text-grey">
                            <Text>{task.description}</Text>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <Checkbox.Root
                            defaultChecked
                            checked={task.isComplete}
                            className={`flex h-6 w-6 appearance-none items-center justify-center rounded-full outline-none ${
                              task.isComplete ? "bg-green" : "bg-white"
                            }`}
                          >
                            <Checkbox.CheckboxIndicator>
                              <BsCheck2 className="h-5 w-5 text-deepBlack" />
                            </Checkbox.CheckboxIndicator>
                          </Checkbox.Root>
                        </div>
                      </div>
                      <div
                        className={`mt-2 flex justify-end ${
                          currentTask === index + 1 ? "" : "hidden"
                        } `}
                      >
                        <button className="h-fit w-fit rounded-meap bg-black px-3 py-1 text-white">
                          Start Task
                        </button>
                      </div>
                    </div>
                  );
                })}
              </OverflowCard>
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-fit w-fit">
                <Card>
                  <Text variant="h3">Status: Incomplete</Text>
                </Card>
              </div>
              <Card dark>
                <div className="flex flex-col gap-3">
                  <div>
                    <Text inline>Due date: </Text>
                    <Text inline variant="h2">
                      30 June 2023
                    </Text>
                  </div>
                  <div>
                    <Text inline>Time: </Text>
                    <Text inline variant="h2">
                      23:59
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex flex-col justify-end">
              <button className="rounded-meap bg-deepBlack px-3 py-4 text-h3 text-white">
                Start Next Task
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </main>
    </>
  );
};

export default LabPage;
