import userApi from '../../util/userApi.js';

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

function asyncAddUser(user) {
  return async (dispatch) => {
    try {
      const newUser = await userApi.addUser(user);
      const users = await userApi.getAllUsers();

      dispatch(receiveUsersActionCreator(users));

      return newUser;
    }
    catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncAddUser
};