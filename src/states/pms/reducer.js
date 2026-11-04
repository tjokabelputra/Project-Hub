import { ActionType } from './action.js';

function pmsReducer(pms = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_PM:
      return [...pms, action.payload.pm]
  case ActionType.RECEIVE_PMS:
    return action.payload.pms;
  default:
    return pms;
  }
}

export default pmsReducer;