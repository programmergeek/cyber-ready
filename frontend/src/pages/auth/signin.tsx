import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import React from "react";
import { authOptions } from "~/server/auth";
import { IoLogoGoogle } from "react-icons/io5";

const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id)}
              className="flex gap-2 rounded-meap border border-gray-500 px-4 py-3 transition-all hover:shadow-md"
            >
              <div className="flex h-full items-center justify-center">
                <IoLogoGoogle size={25} />
              </div>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}

export default SignIn;
