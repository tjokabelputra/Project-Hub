import '../../data/mockAPI.js';
import mockAPI from '../../data/mockAPI.js';

const ActionType = {
  ADD_UPDATE: 'ADD_UPDATE',
  RECEIVE_UPDATES: 'RECEIVE_UPDATES',
  EDIT_UPDATE: 'EDIT_UPDATE',
  DELETE_UPDATE: 'DELETE_UPDATE',
  RESTORE_UPDATE: 'RESTORE_UPDATE',
};

function addUpdateActionCreator(update) {
  return {
    type: ActionType.ADD_UPDATE,
    payload: {
      update
    }
  };
}

function receiveUpdatesActionCreator(updates) {
  return {
    type: ActionType.RECEIVE_UPDATES,
    payload: {
      updates
    }
  };
}

function editUpdateActionCreator(editedUpdate) {
  return {
    type: ActionType.EDIT_UPDATE,
    payload: {
      editedUpdate
    }
  };
}

function deleteUpdateActionCreator(updateId) {
  return {
    type: ActionType.DELETE_UPDATE,
    payload: {
      updateId
    }
  };
}

function restoreUpdateActionCreator(index, update) {
  return {
    type: ActionType.RESTORE_UPDATE,
    payload: {
      index, update
    }
  };
}

function asyncAddUpdate(update) {
  return async (dispatch) => {
    dispatch(addUpdateActionCreator(update));

    try {
      await mockAPI.addUpdate(update);
    }
    catch (error) {
      alert(error.message);
      dispatch(deleteUpdateActionCreator(update.id));
    }
  };
}

function asyncGetUpdates() {
  return async (dispatch) => {
    const updates = await mockAPI.getUpdates();
    dispatch(receiveUpdatesActionCreator(updates));
  };
}

function asyncEditUpdate(editedUpdate) {
  return async (dispatch, getState) => {
    const { updates } = getState();

    const oldUpdate = updates.filter((update) => update.id === editedUpdate.id);

    dispatch(editUpdateActionCreator(editedUpdate));

    try {
      await mockAPI.editUpdate(editedUpdate);
    }
    catch (error) {
      alert(error.message);
      dispatch(editUpdateActionCreator(oldUpdate));
    }
  };
}

function asyncDeleteUpdate(updateId) {
  return async (dispatch, getState) => {
    const { updates } = getState();

    const oldIndex = updates.findIndex(
      (update) => update.id === updateId
    );
    const oldUpdate = updates[oldIndex];

    dispatch(deleteUpdateActionCreator(updateId));
    try {
      await mockAPI.deleteUpdate(updateId);
    }
    catch (error) {
      alert(error.message);
      dispatch(restoreUpdateActionCreator(oldIndex, oldUpdate));
    }
  };
}

export {
  ActionType,
  addUpdateActionCreator,
  receiveUpdatesActionCreator,
  editUpdateActionCreator,
  deleteUpdateActionCreator,
  restoreUpdateActionCreator,
  asyncAddUpdate,
  asyncGetUpdates,
  asyncEditUpdate,
  asyncDeleteUpdate
};