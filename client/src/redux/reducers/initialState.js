export default {
  alertReducer: {
    alerts: []
  },
  authReducer: {
    userId: '',
    username: '',
    signup: false,
    isLoading: false,
    error: null
  },
  todoReducer: {
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
    isCreating: false,
    todos: [],
    error: null
  }
}
