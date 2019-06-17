import * as ActionTypes from '../actionTypes';

const initialState = {
  userId: '',
  username: '',
  signup: false,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return { ...state, isLoading: true };
    case ActionTypes.LOGIN_USER_SUCCESS:
      return { ...state, isLoading: false, userId: action.userId, username: action.username, error: null };
    case ActionTypes.LOGIN_USER_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case ActionTypes.SIGNUP_USER:
      return { ...state, isLoading: true };
    case ActionTypes.SIGNUP_USER_SUCCESS:
      return { ...state, isLoading: false, userId: action.userId, username: action.username, error: null };
    case ActionTypes.SIGNUP_USER_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case ActionTypes.REGISTER_PAGE:
      return { ...state, signup: true };
    case ActionTypes.LOGIN_PAGE:
      return { ...state, signup: false };
    default:
      return state;
  }
};

export default authReducer;