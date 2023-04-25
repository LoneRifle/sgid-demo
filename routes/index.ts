import express from 'express'
import authorize from './authorize'
import whoami from './whoami'

const routes = express()
routes.use('/authorize', authorize)
routes.use('/whoami', whoami)

export default routes
