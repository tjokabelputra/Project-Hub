import api from '../../util/api.js';

const ActionType = {
  ADD_PM: 'ADD_PM',
  RECEIVE_PMS: 'RECEIVE_PMS',
  DELETE_PM: 'DELETE_PM',
  RESTORE_PM: 'RESTORE_PM'
};

function addPmActionCreator(pm) {
  return {
    type: ActionType.ADD_PM,
    payload: {
      pm
    }
  };
}

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

function asyncAddPm(pm) {
  return async (dispatch) => {
    try {
      const newPm = await api.addPm(pm);
      dispatch(addPmActionCreator(newPm));

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
  addPmActionCreator,
  receivePMsActionCreator,
  deletePmActionCreator,
  restorePmActionCreator,
  asyncAddPm,
  asyncDeletePm
};