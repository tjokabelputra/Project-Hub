import api from '../../util/api.js';

const ActionType = {
  ADD_UNIT: 'ADD_UNIT',
  RECEIVE_UNITS: 'RECEIVE_UNITS',
  EDIT_UNIT: 'EDIT_UNIT'
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

function editUnitActionCreator(unit) {
  return {
    type: ActionType.EDIT_UNIT,
    payload: {
      unit
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

function asyncEditUnit(unit) {
  return async (dispatch) => {
    try {
      const editedUnit = await api.editUnit(unit);
      dispatch(editUnitActionCreator(editedUnit));

      return editedUnit;
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
  editUnitActionCreator,
  asyncAddUnit,
  asyncEditUnit
};