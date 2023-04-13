import express from 'express'
import session from 'express-session'
import routes from '../../routes'

const secret = process.env.SESSION_SECRET || 'toomanysecrets'

const sessionOptions = {
  secret,
  cookie: { 
    maxAge: 4 * 3600 * 1000, 
    secure: false, 
    httpOnly: true 
  },
  resave: false,
  saveUninitialized: true,
}

const app = express()

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionOptions.cookie.secure = true // serve secure cookies
}

app.use(session(sessionOptions))
app.use('/api', routes)

export default app

export const config = {
  api: {
    externalResolver: true,
  },
}
