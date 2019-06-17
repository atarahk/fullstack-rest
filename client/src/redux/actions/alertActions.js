import * as ActionTypes from '../actionTypes';

export const add_alert = (message) => ({
  type: ActionTypes.ADD_ALERT,
  message
});

export const remove_alert = (messageId) => ({
  type: ActionTypes.REMOVE_ALERT,
  messageId
});
