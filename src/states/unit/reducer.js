import { ActionType } from './action.js';

function unitsReducer(units = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_UNITS:
    return action.payload.units;
  default:
    return units;
  }
}

export default unitsReducer;