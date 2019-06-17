import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import initialState from './initialState'
import { LOGOUT_USER } from '../actionTypes'

const baseReducer = combineReducers({
  alertReducer,
  authReducer
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
