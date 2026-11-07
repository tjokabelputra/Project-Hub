import { ActionType } from './action.js';

function unitsReducer(units = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_UNIT:
    return [...units, action.payload.unit];
  case ActionType.RECEIVE_UNITS:
    return action.payload.units;
  case ActionType.DELETE_UNIT:
    return units.filter((unit) => unit.id !== action.payload.unitId);
  case ActionType.RESTORE_UNIT: {
    const { index, unit } = action.payload;
    return [
      ...units.slice(0, index),
      unit,
      ...units.slice(index)
    ];
  }
  default:
    return units;
  }
}

export default unitsReducer;