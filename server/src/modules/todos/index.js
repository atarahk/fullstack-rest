const express = require('express')
const TodoController = require('./TodoController')

const Router = express.Router()

Router.get('/users/:userId/todos', TodoController.fetchTodos)

Router.post('/users/:userId/todos', TodoController.createTodo)

Router.patch('/users/:userId/todos/:todoId', TodoController.updateTodo)

Router.delete('/users/:userId/todos/:todoId', TodoController.deleteTodo)

export default Router
