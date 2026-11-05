import { ActionType } from './action.js';

function insightReducer(insight = {}, action = {}) {
  switch (action.type) {
  case ActionType.LATEST_INSIGHT:
    return action.payload.insight;
  default:
    return insight;
  }
}

export default insightReducer;