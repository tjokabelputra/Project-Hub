import userApi from '../../util/userApi.js';
import { setAuthUserActionCreator } from '../authUser/action.js';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD'
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload
    }
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const authUser = await userApi.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    }
    catch (error) {
      dispatch(setAuthUserActionCreator(null));
    }
    finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess
};