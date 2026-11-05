import api from '../../util/api.js';

const ActionType = {
  ADD_UNIT: 'ADD_UNIT',
  RECEIVE_UNITS: 'RECEIVE_UNITS'
};

function addUnitActionCreator(unit) {
  return {
    type: ActionType.ADD_UNIT,
    payload: {
      unit
    }
  };
}

function receiveUnitsActionCreator(units) {
  return {
    type: ActionType.RECEIVE_UNITS,
    payload: {
      units
    }
  };
}

function asyncAddUnit(unit) {
  return async (dispatch) => {
    try {
      const newUnit = await api.addUnit(unit);
      dispatch(addUnitActionCreator(newUnit));

      return newUnit;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

export {
  ActionType,
  addUnitActionCreator,
  receiveUnitsActionCreator,
  asyncAddUnit
};