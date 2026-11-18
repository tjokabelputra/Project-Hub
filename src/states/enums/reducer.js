import { ActionType } from './action.js';

function enumsReducer(enums = {}, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_ENUMS:
    return action.payload.enums;
  default:
    return enums;
  }
}

export default enumsReducer;