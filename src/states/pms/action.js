import api from '../../util/api.js';
import masterApi from '../../util/masterApi.js';

const ActionType = {
  RECEIVE_PMS: 'RECEIVE_PMS',
  DELETE_PM: 'DELETE_PM',
  RESTORE_PM: 'RESTORE_PM'
};

function receivePMsActionCreator(pms) {
  return {
    type: ActionType.RECEIVE_PMS,
    payload: {
      pms
    }
  };
}

function deletePmActionCreator(pmId) {
  return {
    type: ActionType.DELETE_PM,
    payload: {
      pmId
    }
  };
}

function restorePmActionCreator({ index, pm }) {
  return {
    type: ActionType.RESTORE_PM,
    payload: {
      index,
      pm
    }
  };
}

function asyncGetPms() {
  return async (dispatch) => {
    try {
      const pms = await masterApi.getPms();
      dispatch(receivePMsActionCreator(pms));
    }
    catch (error) {
      alert(error);
    }
  };
}

function asyncAddPm(name) {
  return async (dispatch) => {
    try {
      const newPm = await masterApi.addPm(name);
      const pms = await masterApi.getPms();
      dispatch(receivePMsActionCreator(pms));

      return newPm;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

function asyncEditPm({ id, name }) {
  return async (dispatch) => {
    try {
      const editedPm = await masterApi.editPm({ id, name });
      const pms = await masterApi.getPms();
      dispatch(receivePMsActionCreator(pms));

      return editedPm;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

export {
  ActionType,
  receivePMsActionCreator,
  deletePmActionCreator,
  restorePmActionCreator,
  asyncGetPms,
  asyncAddPm,
  asyncEditPm
};