import api from '../../util/api.js';

const ActionType = {
  ADD_BP: 'ADD_BP',
  RECEIVE_BPS: 'RECEIVE_BPS',
  EDIT_BP: 'EDIT_BP'
};

function addBpActionCreator(bp) {
  return {
    type: ActionType.ADD_BP,
    payload:{
      bp
    }
  };
}

function receiveBPsActionCreator(bps) {
  return {
    type: ActionType.RECEIVE_BPS,
    payload: {
      bps
    }
  };
}

function editBpActionCreator(bp) {
  return {
    type: ActionType.EDIT_BP,
    payload: {
      bp
    }
  };
}

function asyncAddBp(bp) {
  return async (dispatch) => {
    try {
      const newBp = await api.addBp(bp);
      dispatch(addBpActionCreator(newBp));

      return newBp;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

function asyncEditBp(bp) {
  return async (dispatch) => {
    try {
      const editedBp = await api.editBp(bp);
      dispatch(editBpActionCreator(editedBp));

      return editedBp;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

export {
  ActionType,
  addBpActionCreator,
  receiveBPsActionCreator,
  editBpActionCreator,
  asyncAddBp,
  asyncEditBp
};