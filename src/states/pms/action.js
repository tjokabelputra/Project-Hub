import api from '../../util/api.js';
import masterApi from "../../util/masterApi.js";

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

function asyncDeletePm(pmId) {
  return async (dispatch, getState) => {
    const { pms } = getState();

    const oldIndex = pms.findIndex(
      (pm) => pm.id === pmId
    );
    const oldPm = pms[oldIndex];

    dispatch(deletePmActionCreator(pmId));

    try {
      await api.deletePm(pmId);
    }
    catch (error) {
      alert(error.message);
      dispatch(restorePmActionCreator({ oldIndex, oldPm }));
    }
  };
}

export {
  ActionType,
  receivePMsActionCreator,
  deletePmActionCreator,
  restorePmActionCreator,
  asyncAddPm,
  asyncDeletePm
};