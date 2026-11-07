import { ActionType } from './action.js';

function pmsReducer(pms = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_PM:
    return [...pms, action.payload.pm];
  case ActionType.RECEIVE_PMS:
    return action.payload.pms;
  case ActionType.DELETE_PM:
    return pms.filter((pm) => pm.id !== action.payload.pmId);
  case ActionType.RESTORE_PM: {
    const { index, pm } = action.payload;
    return [
      ...pms.slice(0, index),
      pm,
      ...pms.slice(index)
    ];
  }
  default:
    return pms;
  }
}

export default pmsReducer;