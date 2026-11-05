import api from '../../util/api.js';

const ActionType = {
  ADD_PM: 'ADD_PM',
  RECEIVE_PMS: 'RECEIVE_PMS',
  EDIT_PM: 'EDIT_PM'
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

function editPmActionCreator(pm) {
  return {
    type: ActionType.EDIT_PM,
    payload: {
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

function asyncEditPm(pm) {
  return async (dispatch) => {
    try {
      const editedPm = await api.editPm(pm);
      dispatch(editPmActionCreator(editedPm));

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
  addPmActionCreator,
  receivePMsActionCreator,
  editPmActionCreator,
  asyncAddPm,
  asyncEditPm
};