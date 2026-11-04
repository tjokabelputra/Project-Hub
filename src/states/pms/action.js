import api from '../../util/api.js';

const ActionType = {
  ADD_PM: 'ADD_PM',
  RECEIVE_PMS: 'RECEIVE_PMS'
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

export {
  ActionType,
  addPmActionCreator,
  receivePMsActionCreator,
  asyncAddPm
};