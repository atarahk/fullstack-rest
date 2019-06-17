const todoRouter = require('./todos')
const userRouter = require('./user')

const apiPrefix = '/api/'

const routes = app => {
  app.use(apiPrefix, todoRouter)
  app.use(apiPrefix, userRouter)
  return app
}

export default routes
