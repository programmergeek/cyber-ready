import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { userContext } from "~/context";
import md5 from "blueimp-md5";
import { Card, Text } from "~/components";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const context = userContext();
  const user = useContext(context);

  useEffect(() => {
    user.updateUser({
      email: session?.user.email as string,
      name: session?.user.name as string,
      userHash: md5(session?.user.id as string),
    });
  }, [session]);
  if (session) {
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <main className="grid w-full grid-cols-[25%_auto_5%] gap-2">
          <div className="h-screen pt-2">
            <Card dark>
              <div className="flex flex-col items-center justify-center gap-4 p-10">
                <img
                  src={session.user.image as string}
                  alt="profile picture"
                  className="mx-auto rounded-full"
                />
                <Text variant="h3" dark>
                  {user.user?.name}
                </Text>
                <button
                  className="rounded-meap bg-darkGrey px-20 py-1"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </button>
              </div>
            </Card>
          </div>
          <div className="grid h-screen grid-rows-[10%_50%_15%_15%] gap-5 pt-2">
            <div className="h-full w-full rounded-meap bg-darkGrey bg-opacity-95 pl-5 pt-7">
              <Text variant="h3" dark>
                21 June 2023
              </Text>
            </div>
            <Card shadow>
              <div className="">
                <Text variant="h1">Labs</Text>
                <Text variant="h3">
                  <span className="pl-1">5 total</span>
                </Text>
              </div>
              <table className=" w-full">
                <thead>
                  <tr className="row- border-y border-lightGrey">
                    <th className="text-start">Name</th>
                    <th className="text-start">Course</th>
                    <th className="text-start">Status</th>
                    <th className="text-start">Due</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="overflow-auto">
                  <tr>
                    <td>Brute force encryption cracking </td>
                    <td>CSI 344</td>
                    <td>Not started</td>
                    <td>30 June 2023 at 23:59</td>
                    <td>
                      {" "}
                      <Link
                        href={{
                          pathname: "/labinfo/brute_force_encryption_cracking",
                        }}
                        className="text-blue-500 underline"
                      >
                        Go to Lab
                      </Link>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Brute force encryption cracking </td>
                    <td>CSI 344</td>
                    <td>Not started</td>
                    <td>30 June 2023 at 23:59</td>
                    <td>
                      {" "}
                      <Link
                        href={{
                          pathname: "/labinfo/brute_force_encryption_cracking",
                        }}
                        className="text-blue-500 underline"
                      >
                        Go to Lab
                      </Link>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Brute force encryption cracking </td>
                    <td>CSI 344</td>
                    <td>Not started</td>
                    <td>30 June 2023 at 23:59</td>
                    <td>
                      {" "}
                      <Link
                        href={{
                          pathname: "/labinfo/brute_force_encryption_cracking",
                        }}
                        className="text-blue-500 underline"
                      >
                        Go to Lab
                      </Link>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Brute force encryption cracking </td>
                    <td>CSI 344</td>
                    <td>Not started</td>
                    <td>30 June 2023 at 23:59</td>
                    <td>
                      {" "}
                      <Link
                        href={{
                          pathname: "/labinfo/brute_force_encryption_cracking",
                        }}
                        className="text-blue-500 underline"
                      >
                        Go to Lab
                      </Link>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Brute force encryption cracking </td>
                    <td>CSI 344</td>
                    <td>Not started</td>
                    <td>30 June 2023 at 23:59</td>
                    <td>
                      {" "}
                      <Link
                        href={{
                          pathname: "/labinfo/brute_force_encryption_cracking",
                        }}
                        className="text-blue-500 underline"
                      >
                        Go to Lab
                      </Link>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <div className="grid h-full w-full grid-cols-4 gap-2">
              <Card>
                <div className="flex flex-col">
                  <Text variant="h1">1 Lab</Text>
                  <Text>Not Started</Text>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col">
                  <Text variant="h1">1 Lab</Text>
                  <Text>Completed</Text>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col">
                  <Text variant="h1">2 Labs</Text>
                  <Text>Incomplete</Text>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col">
                  <Text variant="h1">1 Lab</Text>
                  <Text>Overdue</Text>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="A training platform for students at the University of Botswana"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-5">
        <div className="flex max-w-sm flex-col gap-5">
          <p className="text-center text-h1">Sign In to Continue</p>
          <button
            className="rounded-[10px] bg-black px-4 py-2 text-center text-white"
            onClick={() => {
              signIn();
            }}
          >
            Continue
          </button>
        </div>
      </main>
    </>
  );
}
