import api from '../../util/api.js';

const ActionType = {
  ADD_BP: 'ADD_BP',
  RECEIVE_BPS: 'RECEIVE_BPS',
  DELETE_BP: 'DELETE_BP',
  RESTORE_BP: 'RESTORE_BP'
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
  addBpActionCreator,
  receiveBPsActionCreator,
  deleteBpActionCreator,
  restoreBpActionCreator,
  asyncAddBp,
  asyncDeleteBp
};