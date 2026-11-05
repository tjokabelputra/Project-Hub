import { ActionType } from './action.js';

function unitsReducer(units = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_UNIT:
    return [...units, action.payload.unit];
  case ActionType.RECEIVE_UNITS:
    return action.payload.units;
  case ActionType.EDIT_UNIT: {
    const editedUnit = action.payload.unit;
    return units.map((unit) => {
      if (unit.id !== editedUnit.id) {
        return unit;
      }

      return editedUnit;
    });
  }
  default:
    return units;
  }
}

export default unitsReducer;