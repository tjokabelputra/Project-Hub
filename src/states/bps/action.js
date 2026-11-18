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

function asyncDeleteBp(bpId) {
  return async (dispatch, getState) => {
    const { bps } = getState();

    const oldIndex = bps.findIndex(
      (bp) => bp.id === bpId
    );
    const oldBp = bps[oldIndex];

    dispatch(deleteBpActionCreator(bpId));

    try {
      await api.deleteBp(bpId);
    }
    catch (error) {
      alert(error.message);
      dispatch(restoreBpActionCreator({ oldIndex, oldBp }));
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
  asyncDeleteBp
};