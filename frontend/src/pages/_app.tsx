import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { userContext } from "~/context";
import { User } from "~/types";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const UserContext = userContext();
  const [user, updateUser] = useState<User>();
  return (
    <SessionProvider session={session}>
      <UserContext.Provider value={{ user: user, updateUser: updateUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
