import api from '../../util/api.js';

const ActionType = {
  ADD_UNIT: 'ADD_UNIT',
  RECEIVE_UNITS: 'RECEIVE_UNITS',
  DELETE_UNIT: 'DELETE_UNIT',
  RESTORE_UNIT: 'RESTORE_UNIT'
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

function deleteUnitActionCreator(unitId) {
  return {
    type: ActionType.DELETE_UNIT,
    payload: {
      unitId
    }
  };
}

function restoreUnitActionCreator({ index, unit }) {
  return {
    type: ActionType.RESTORE_UNIT,
    payload: {
      index,
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

function asyncDeleteUnit(unitId) {
  return async (dispatch, getState) => {
    const { units } = getState();

    const oldIndex = units.findIndex(
      (unit) => unit.id === unitId
    );
    const oldUnit = units[oldIndex];

    dispatch(deleteUnitActionCreator(unitId));

    try {
      await api.deleteUnit(unitId);
    }
    catch (error){
      alert(error.message);
      dispatch(restoreUnitActionCreator({ oldIndex, oldUnit }));
    }
  };
}

export {
  ActionType,
  addUnitActionCreator,
  receiveUnitsActionCreator,
  deleteUnitActionCreator,
  restoreUnitActionCreator,
  asyncAddUnit,
  asyncDeleteUnit
};