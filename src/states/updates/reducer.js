import { ActionType } from './action.js';

function updatesReducer(updates = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_UPDATE:
    return [action.payload.update, ...updates];
  case ActionType.RECEIVE_UPDATES:
    return action.payload.updates;
  case ActionType.EDIT_UPDATE: {
    const editedUpdate = action.payload.editedUpdate;
    return updates.map((update) => {
      if (update.id !== editedUpdate.id) {
        return update;
      }

      return editedUpdate;
    });
  }
  case ActionType.DELETE_UPDATE:
    return updates.filter((update) => update.id !== action.payload.updateId);
  case ActionType.RESTORE_UPDATE: {
    const { index, update } = action.payload;
    return [
      updates.slice(0, index),
      update,
      updates.slice(index)
    ];
  }
  default:
    return updates;
  }
}

export default updatesReducer;