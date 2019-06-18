import * as SecureStore from 'expo-secure-store'
import * as ActionTypes from '../actionTypes'
import API from '../axiosConfig'

export const fetch_todo_items = () => ({
  type: ActionTypes.FETCH_TODO_ITEMS,
  isLoading: true
})

export const fetch_todos_success = items => ({
  type: ActionTypes.FETCH_TODO_SUCCESS,
  items
})

export const fetch_todos_failure = error => ({
  type: ActionTypes.FETCH_TODO_FAILURE,
  error
})

export const add_todo_item = () => ({
  type: ActionTypes.ADD_TODO_ITEM,
  isLoading: true
})

export const add_todo_success = newItem => ({
  type: ActionTypes.ADD_TODO_SUCCESS,
  newItem
})

export const add_todo_failure = error => ({
  type: ActionTypes.ADD_TODO_FAILURE,
  error
})

export const edit_todo_item = () => ({
  type: ActionTypes.EDIT_TODO_ITEM,
  isLoading: true
})

export const edit_todo_success = (updatedItem, id) => ({
  type: ActionTypes.EDIT_TODO_SUCCESS,
  updatedItem,
  id
})

export const edit_todo_failure = error => ({
  type: ActionTypes.EDIT_TODO_FAILURE,
  error
})

export const delete_todo_item = () => ({
  type: ActionTypes.DELETE_TODO_ITEM,
  isLoading: true
})

export const delete_todo_success = id => ({
  type: ActionTypes.DELETE_TODO_SUCCESS,
  id
})

export const delete_todo_failure = error => ({
  type: ActionTypes.DELETE_TODO_FAILURE,
  error
})
// ActionCreators

export const fetchTodos = userId => dispatch => {
  dispatch(fetch_todo_items())
  SecureStore.getItemAsync('userInfo')
    .then(userdata => {
      const userInfo = JSON.parse(userdata)
      const { token } = userInfo
      return API.get(`/users/${userId}/todos`, {
        headers: { authorization: token }
      })
        .then(response => {
          dispatch(fetch_todos_success(response.data.todos))
        })
        .catch(error => {
          dispatch(fetch_todos_failure(error.response.data))
        })
    })
    .catch(error => {
      console.log('Error fetching secure credentials')
    })
}

export const createTodo = (userId, text) => dispatch => {
  dispatch(add_todo_item())
  SecureStore.getItemAsync('userInfo')
    .then(userdata => {
      const userInfo = JSON.parse(userdata)
      const { token } = userInfo
      return API.post(
        `/users/${userId}/todos`,
        {
          isDone: false,
          text
        },
        { headers: { authorization: token } }
      )
        .then(response => {
          dispatch(add_todo_success(response.data.todo))
        })
        .catch(error => {
          dispatch(add_todo_failure(error.response.data))
        })
    })
    .catch(error => {
      console.log('Error fetching secure credentials')
    })
}

export const updateTodo = (userId, todoUpdate) => dispatch => {
  // console.log('todoActions => ', todoUpdate)
  dispatch(edit_todo_item())
  SecureStore.getItemAsync('userInfo')

    .then(userdata => {
      const userInfo = JSON.parse(userdata)
      const { token } = userInfo
      return API.patch(
        `/users/${userId}/todos/${todoUpdate.id}`,
        //
        { text: todoUpdate.text, isDone: todoUpdate.isDone },
        //
        { headers: { authorization: token } }
      )
        .then(response => {
          dispatch(edit_todo_success(response.data.todo, todoUpdate.id))
        })
        .catch(error => {
          dispatch(edit_todo_failure(error.response.data))
        })
    })
    .catch(error => {
      console.log('Error fetching secure credentials')
    })
}

export const deleteTodo = (userId, todoId) => dispatch => {
  dispatch(delete_todo_item())
  SecureStore.getItemAsync('userInfo')
    .then(userdata => {
      const userInfo = JSON.parse(userdata)
      const { token } = userInfo
      return API.delete(`/users/${userId}/todos/${todoId}`, {
        headers: { authorization: token }
      })
        .then(response => {
          dispatch(delete_todo_success(todoId))
        })
        .catch(error => {
          dispatch(delete_todo_failure(error.response.data))
        })
    })
    .catch(error => {
      console.log('Error fetching secure credentials')
    })
}
