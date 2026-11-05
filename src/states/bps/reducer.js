import { ActionType } from './action.js';

function bpsReducer(bps = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_BP:
    return [...bps, action.payload.bp];
  case ActionType.RECEIVE_BPS:
    return action.payload.bps;
  case ActionType.EDIT_BP: {
    const editedBp = action.payload.bp;
    return bps.map((bp) => {
      if (bp.id !== editedBp.id) {
        return bp;
      }

      return editedBp;
    });
  }
  default:
    return bps;
  }
}

export default bpsReducer;