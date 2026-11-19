import { ActionType } from './action.js';

function updatesReducer(updates = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_UPDATES:
    return action.payload.updates;
  default:
    return updates;
  }
}

export default updatesReducer;