import { ActionType } from './action.js';

function pmsReducer(pms = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_PMS:
    return action.payload.pms;
  default:
    return pms;
  }
}

export default pmsReducer;