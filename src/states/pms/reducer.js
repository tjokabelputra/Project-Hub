import { ActionType } from './action.js';

function pmsReducer(pms = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_PM:
    return [...pms, action.payload.pm];
  case ActionType.RECEIVE_PMS:
    return action.payload.pms;
  case ActionType.EDIT_PM: {
    const editedPm = action.payload.pm;
    return pms.map((pm) => {
      if (pm.id !== editedPm.id) {
        return pm;
      }

      return editedPm;
    });
  }
  default:
    return pms;
  }
}

export default pmsReducer;