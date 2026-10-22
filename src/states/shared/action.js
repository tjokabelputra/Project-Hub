import mockAPI from '../../data/mockAPI.js';
import { receivePMsActionCreator } from '../pms/action.js';
import { receiveBPsActionCreator } from '../bps/action.js';
import { receiveUnitsActionCreator } from '../unit/action.js';

function asyncPopulateInputs() {
  return async (dispatch) => {
    const pms = await mockAPI.getPMs();
    const bps = await mockAPI.getBPs();
    const units = await mockAPI.getUnits();

    dispatch(receivePMsActionCreator(pms));
    dispatch(receiveBPsActionCreator(bps));
    dispatch(receiveUnitsActionCreator(units));
  };
}

export { asyncPopulateInputs };