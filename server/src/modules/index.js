const todoRouter = require('./todos')

const apiPrefix = '/api/'

const routes = app => {
  app.use(apiPrefix, todoRouter)
  return app
}

export default routes
