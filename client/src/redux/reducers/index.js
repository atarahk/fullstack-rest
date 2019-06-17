import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import todoReducer from './todoReducer'
import initialState from './initialState'
import { LOGOUT_USER } from '../actionTypes'

const baseReducer = combineReducers({
  alertReducer,
  authReducer,
  todoReducer
})

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState
    default:
      return baseReducer(state, action)
  }
}

export default rootReducer
