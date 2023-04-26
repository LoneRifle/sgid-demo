import { SgidClient } from '@opengovsg/sgid-client'

// Just to generate the type
const client = new SgidClient({
  clientId: process.env.SGID_CLIENT_ID ?? '',
  clientSecret: process.env.SGID_CLIENT_SECRET ?? '',
  privateKey: process.env.SGID_PRIVATE_KEY ?? '',
  redirectUri: process.env.SGID_REDIRECT_URI,
})

type UserInfo = Awaited<ReturnType<typeof client.userinfo>>

declare module 'express-session' {
  interface SessionData {
    sgid: UserInfo
  }
}

export {}
