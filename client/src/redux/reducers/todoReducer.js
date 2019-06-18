import * as ActionTypes from '../actionTypes'

const initialState = {
  isFetching: false,
  isUpdating: false,
  isDeleting: false,
  isCreating: false,
  todos: [],
  error: null
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TODO_ITEMS:
      return { ...state, isFetching: true }
    case ActionTypes.FETCH_TODO_SUCCESS:
      return { ...state, isFetching: false, todos: action.items, error: null }
    case ActionTypes.FETCH_TODO_FAILURE:
      return { ...state, isFetching: false, error: action.error }

    case ActionTypes.ADD_TODO_ITEM:
      return { ...state, isCreating: true }
    case ActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        isCreating: false,
        todos: [...state.todos, action.newItem],
        error: null
      }
    case ActionTypes.ADD_TODO_FAILURE:
      return { ...state, isCreating: false, error: action.error }

    case ActionTypes.EDIT_TODO_ITEM:
      return { ...state, isUpdating: true }
    case ActionTypes.EDIT_TODO_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        todos: state.todos.map(item =>
          item._id === action.id ? action.updatedItem : item
        ),
        error: null
      }
    case ActionTypes.EDIT_TODO_FAILURE:
      return { ...state, isUpdating: false, error: action.error }

    case ActionTypes.DELETE_TODO_ITEM:
      return { ...state, isDeleting: true }
    case ActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        todos: state.todos.filter(item => item._id !== action.id),
        error: null
      }
    case ActionTypes.DELETE_TODO_FAILURE:
      return { ...state, isDeleting: false, error: action.error }
    default:
      return state
  }
}

export default todoReducer
