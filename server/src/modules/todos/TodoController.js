const Todo = require('../../database/models/todo')

class TodoController {
  static async fetchTodos(req, res) {
    const { userId } = req.params

    Todo.find({ userId }, (error, todos) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Unable to fetch user todos',
          error
        })
      }

      if (!todos.length) {
        return res.status(200).json({
          success: true,
          message: 'No items found',
          todos
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Successfuly retrieved todos',
        todos
      })
    })
  }

  static async createTodo(req, res) {
    const { userId } = req.params
    const { text, isDone } = req.body
    const newTodo = { text, userId, isDone }

    Todo.create(newTodo, (error, newItem) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Unable to create todo items',
          error
        })
      }

      return res.status(201).json({
        success: true,
        message: 'Successfuly created a todo item',
        todo: newItem
      })
    })
  }

  static async updateTodo(req, res) {
    const { userId, todoId } = req.params
    const { text, isDone } = req.body

    Todo.findOneAndUpdate({ userId, _id: todoId }, { text, isDone }, error => {
      console.log('TodoController => ', isDone)
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Unable to create todo items',
          error
        })
      }

      return Todo.findOne({ userId, _id: todoId }, (err, updatedTodo) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: 'Cannot find this todo item',
            error
          })
        }
        return res.status(200).json({
          success: true,
          message: 'Successfuly updated a todo item',
          todo: updatedTodo
        })
      })
    })
  }

  static async deleteTodo(req, res) {
    const { userId, todoId } = req.params

    Todo.deleteOne({ userId, _id: todoId }, error => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Unable to delete todo items',
          error
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Successfuly deleted a todo item'
      })
    })
  }
}

export default TodoController
