import { ActionType } from './action.js';

function bpsReducer(bps = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_BP:
    return [...bps, action.payload.bp];
  case ActionType.RECEIVE_BPS:
    return action.payload.bps;
  case ActionType.DELETE_BP:
    return bps.filter((bp) => bp.id !== action.payload.bpId);
  case ActionType.RESTORE_BP: {
    const { index, bp } = action.payload;
    return [
      ...bps.slice(0, index),
      bp,
      ...bps.slice(index)
    ];
  }
  default:
    return bps;
  }
}

export default bpsReducer;