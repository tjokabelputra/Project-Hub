import { ActionType } from './action.js';

function bpsReducer(bps = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_BPS:
    return action.payload.bps;
  default:
    return bps;
  }
}

export default bpsReducer;