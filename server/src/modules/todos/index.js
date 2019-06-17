const express = require('express')
const TodoController = require('./TodoController')
const tokenizer = require('../../helpers/tokenizer')

const Router = express.Router()

Router.get(
  '/users/:userId/todos',
  tokenizer.verifyToken,
  TodoController.fetchTodos
)

Router.post(
  '/users/:userId/todos',
  tokenizer.verifyToken,
  TodoController.createTodo
)

Router.patch(
  '/users/:userId/todos/:todoId',
  tokenizer.verifyToken,
  TodoController.updateTodo
)

Router.delete(
  '/users/:userId/todos/:todoId',
  tokenizer.verifyToken,
  TodoController.deleteTodo
)

export default Router
