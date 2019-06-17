import Todo from '../../database/models/todo'

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
          message: 'Nothing found',
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
    const createDate = new Date()
    const newTodo = { text, userId, isDone, createDate }

    Todo.create(newTodo, (error, newItem) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Unable to create todo',
          error
        })
      }

      return res.status(201).json({
        success: true,
        message: 'Successfuly created a todo',
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
          message: 'Unable to create todo',
          error
        })
      }

      return Todo.findOne({ userId, _id: todoId }, (err, updatedTodo) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: 'Cannot find this todo',
            error
          })
        }
        return res.status(200).json({
          success: true,
          message: 'Successfuly updated a todo',
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
          message: 'Unable to delete todos',
          error
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Successfuly deleted a todo'
      })
    })
  }
}

export default TodoController
