const ActionType = {
  RECEIVE_PMS: 'RECEIVE_PMS'
};

function receivePMsActionCreator(pms) {
  return {
    type: ActionType.RECEIVE_PMS,
    payload: {
      pms
    }
  };
}

export {
  ActionType,
  receivePMsActionCreator,
};