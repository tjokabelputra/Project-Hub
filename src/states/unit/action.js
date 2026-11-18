import api from '../../util/api.js';
import masterApi from '../../util/masterApi.js';

const ActionType = {
  RECEIVE_UNITS: 'RECEIVE_UNITS',
  DELETE_UNIT: 'DELETE_UNIT',
  RESTORE_UNIT: 'RESTORE_UNIT'
};

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

function asyncGetUnits() {
  return async (dispatch) => {
    try {
      const units = await masterApi.getUnits();
      dispatch(receiveUnitsActionCreator(units));
    }
    catch (error) {
      alert(error);
    }
  };
}

function asyncAddUnit(name) {
  return async (dispatch) => {
    try {
      const newUnit = await masterApi.addUnit(name);
      const units = await masterApi.getUnits();
      dispatch(receiveUnitsActionCreator(units));

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
  receiveUnitsActionCreator,
  deleteUnitActionCreator,
  restoreUnitActionCreator,
  asyncGetUnits,
  asyncAddUnit,
  asyncDeleteUnit
};