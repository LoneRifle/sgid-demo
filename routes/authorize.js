import express from 'express'
import { SgidClient } from '@opengovsg/sgid-client'

const sgidParameters = {
  clientId: process.env.SGID_CLIENT_ID,
  clientSecret: process.env.SGID_CLIENT_SECRET,
  privateKey: process.env.SGID_PRIVATE_KEY,
  redirectUri: process.env.SGID_REDIRECT_URI,
}

if (process.env.NODE_ENV === 'development') {
  sgidParameters.hostname = 'http://localhost:5156/sgid'
}

const sessionIdToNonce = {}

const client = new SgidClient(sgidParameters)

const authorize = express()

authorize.get('/', (req, res) => {
  const { landingUrl } = req.query
  const { url, nonce } = client.authorizationUrl(JSON.stringify({ landingUrl }), ['openid', 'myinfo.name'])
  sessionIdToNonce[req.sessionID] = nonce
  res.redirect(url)
})

authorize.get('/callback', async (req, res) => {
  const { state, code } = req.query
  const { landingUrl } = JSON.parse(state)
  const nonce = sessionIdToNonce[req.sessionID]
  const { sub: userId, accessToken } = await client.callback(code, nonce)
  delete sessionIdToNonce[req.sessionID]
  console.log(`Successful login for ${userId}`)
  const { sub, data } = await client.userinfo(accessToken)
  req.session.sgid = { sub, data }
  res.redirect(landingUrl)
})

authorize.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

export default authorize
