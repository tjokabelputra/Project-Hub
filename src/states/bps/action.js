import api from '../../util/api.js';
import masterApi from '../../util/masterApi.js';

const ActionType = {
  RECEIVE_BPS: 'RECEIVE_BPS',
  DELETE_BP: 'DELETE_BP',
  RESTORE_BP: 'RESTORE_BP'
};

function receiveBPsActionCreator(bps) {
  return {
    type: ActionType.RECEIVE_BPS,
    payload: {
      bps
    }
  };
}

function deleteBpActionCreator(bpId) {
  return {
    type: ActionType.DELETE_BP,
    payload: {
      bpId
    }
  };
}

function restoreBpActionCreator({ index, bp }) {
  return {
    type: ActionType.RESTORE_BP,
    payload: {
      index,
      bp
    }
  };
}

function asyncGetBps() {
  return async (dispatch) => {
    try {
      const bps = await masterApi.getBps();
      dispatch(receiveBPsActionCreator(bps));
    }
    catch (error) {
      alert(error);
    }
  };
}

function asyncAddBp(name) {
  return async (dispatch) => {
    try {
      const newBp = await masterApi.addBp(name);
      const bps = await masterApi.getBps();
      dispatch(receiveBPsActionCreator(bps));

      return newBp;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

function asyncEditBp({ id, name }) {
  return async (dispatch) => {
    try {
      const editedBp = await masterApi.editBp({ id, name });
      const bps = await masterApi.getBps();
      dispatch(receiveBPsActionCreator(bps));

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
  receiveBPsActionCreator,
  deleteBpActionCreator,
  restoreBpActionCreator,
  asyncGetBps,
  asyncAddBp,
  asyncEditBp
};