import userApi from '../../util/userApi.js';
import { putAccessToken } from '../../util/util.js';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null
    }
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const data = await userApi.login({ email, password });
      putAccessToken(data.token);
      const authUser = await userApi.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
      return true;
    }
    catch (error){
      alert(error.message);
      return false;
    }
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
};