# Auth

Authentication library: NextAuth

Authentication Provider: Google

> Warning: NextAuth may sometimes timeout while you are trying to authenticate using the google provider. This has to do with your local network configuration and is unlikely to occure when it is deployed to the cloud.

>Warining: Make sure to disable IPv6 addresses on your machine.

## Setup

I would recommend using [`create-t3-app`](https://create.t3.gg/en/installation) and selecting NextAuth in the setup configuration. This will give you a project with NextAuth preconfigured. If you are instead using the create-next-app then you can follow the instructions [here](https://next-auth.js.org/getting-started/example).

## Sign In with Google

These instructions assumes you created your project using `create t3-app` with typescript.

1. Head to `src/server/auth.ts`, and import the google provider

```typescript
... // other imports
import GoogleProvider from "next-auth/providers/google";
```

2. Add `GoogleProvider` to the list of providers in `authOptions`.

```typescript
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ...// other options
    ]
}
```

3. Create your client id and client secret [here](https://console.cloud.google.com/apis/credentials). Click the **CREATE CREDENTIALS** button select OAuth 2.0 Client IDs.

4. Add your client id and client secret to the project as environment varables named `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` respectively.
