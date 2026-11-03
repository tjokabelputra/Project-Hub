import api from '../../util/api.js';
import mockAPI from '../../data/mockAPI.js';
import { receivePMsActionCreator } from '../pms/action.js';
import { receiveBPsActionCreator } from '../bps/action.js';
import { receiveUnitsActionCreator } from '../unit/action.js';

function asyncPopulateInputs() {
  return async (dispatch) => {
    const pms = await api.getPms();
    const bps = await api.getBps();
    const units = await mockAPI.getUnits();

    dispatch(receivePMsActionCreator(pms));
    dispatch(receiveBPsActionCreator(bps));
    dispatch(receiveUnitsActionCreator(units));
  };
}

export { asyncPopulateInputs };