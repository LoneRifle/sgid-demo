import express from 'express'

const routes = express()
routes.get('/', (_, res) => res.json('Hello World'))

export default routes
