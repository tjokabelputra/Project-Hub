const ActionType = {
  RECEIVE_UNITS: 'RECEIVE_UNITS'
};

function receiveUnitsActionCreator(units) {
  return {
    type: ActionType.RECEIVE_UNITS,
    payload: {
      units
    }
  };
}

export {
  ActionType,
  receiveUnitsActionCreator
};