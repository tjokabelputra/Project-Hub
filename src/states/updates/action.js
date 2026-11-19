import updateApi from "../../util/updateApi.js";

const ActionType = {
  RECEIVE_UPDATES: 'RECEIVE_UPDATES',
};

function receiveUpdatesActionCreator(updates) {
  return {
    type: ActionType.RECEIVE_UPDATES,
    payload: {
      updates
    }
  };
}

function asyncAddUpdate(update) {
  return async (dispatch) => {
    try {
      const newUpdate = await updateApi.addUpdate(update);
      const updates = await updateApi.addUpdate(update.id);
      dispatch(receiveUpdatesActionCreator(updates));

      return newUpdate;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

function asyncGetUpdates(projectId) {
  return async (dispatch) => {
    try {
      const updates = await updateApi.getUpdates(projectId);
      dispatch(receiveUpdatesActionCreator(updates));
    }
    catch (error) {
      alert(error);
    }
  };
}

export {
  ActionType,
  receiveUpdatesActionCreator,
  asyncAddUpdate,
  asyncGetUpdates,
};