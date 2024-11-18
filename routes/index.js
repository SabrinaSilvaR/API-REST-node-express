const express = require('express')
const productsRouter = require('./products.router')
const userRouter = require('./user.router')
const categorysRouter = require('./categorys.router')
const app = express()

function routeApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/users', userRouter)
  router.use('/categorys', categorysRouter)

}

module.exports = routeApi;
