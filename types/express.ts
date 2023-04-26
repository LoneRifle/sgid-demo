import type { SgidClient } from '@opengovsg/sgid-client'

type UserInfo = Awaited<ReturnType<typeof SgidClient.prototype.userinfo>>

declare module 'express-session' {
  interface SessionData {
    sgid: UserInfo
  }
}

export {}
