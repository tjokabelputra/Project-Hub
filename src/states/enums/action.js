import masterApi from '../../util/masterApi.js';

const ActionType = {
  RECEIVE_ENUMS: 'RECEIVE_ENUMS'
};

function receiveEnumsActionCreator(enums) {
  return {
    type: ActionType.RECEIVE_ENUMS,
    payload: {
      enums
    }
  };
}

function asyncGetEnums() {
  return async (dispatch) => {
    try {
      const enums = await masterApi.getEnums();
      dispatch(receiveEnumsActionCreator(enums));
    }
    catch (error) {
      alert(error);
    }
  };
}

export {
  ActionType,
  receiveEnumsActionCreator,
  asyncGetEnums
};