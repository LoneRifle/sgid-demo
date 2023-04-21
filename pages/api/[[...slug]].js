import express from 'express'
import routes from './routes'

const app = express()
app.use('/api', routes)

export default app

export const config = {
  api: {
    externalResolver: true,
  },
}
