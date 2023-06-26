import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { userContext } from "~/context";
import md5 from "blueimp-md5";

export default function Home() {
  const { data: session } = useSession();
  const context = userContext();
  const user = useContext(context);

  useEffect(() => {
    user.updateUser({
      email: session?.user.email as string,
      name: session?.user.name as string,
      userHash: md5(session?.user.email as string),
    });
  }, [session]);
  if (session) {
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center gap-5">
          <p className="text-h2"> Home page</p>
          <div className="rounded-[10px] bg-black px-4 py-3 text-white">
            {user.user?.userHash}
          </div>
          <button
            className="text-grey"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
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
