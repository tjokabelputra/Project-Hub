const ActionType = {
  RECEIVE_BPS: 'RECEIVE_BPS'
};

function receiveBPsActionCreator(bps) {
  return {
    type: ActionType.RECEIVE_BPS,
    payload: {
      bps
    }
  };
}

export {
  ActionType,
  receiveBPsActionCreator,
};