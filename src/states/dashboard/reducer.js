import { ActionType } from './action.js';

function dashboardReducer(dashboard = {}, action = {}){
  switch (action.type) {
  case ActionType.RECEIVE_DASHBOARD:
    return action.payload.dashboard;
  default:
    return dashboard;
  }
}

export default dashboardReducer;