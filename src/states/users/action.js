import api from '../../util/api.js';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS'
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users
    }
  };
}

function asyncGetAllUsers() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(users));

      return users;
    }
    catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncGetAllUsers
};