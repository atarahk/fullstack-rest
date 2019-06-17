import uuid from 'uuid';
import * as ActionTypes from '../actionTypes';

const initialState = {
  alerts: []
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ALERT:
      return { ...state, alerts: [{message: action.message, messageId: uuid.v4()}] };
    case ActionTypes.REMOVE_ALERT:
      return { ...state, alerts: state.alerts.filter(alert => alert.messageId !== action.messageId) };

    default:
      return state;
  }
};

export default alertReducer;