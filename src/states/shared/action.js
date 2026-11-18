import masterApi from '../../util/masterApi.js';
import userAPi from '../../util/userApi.js';
import { receivePMsActionCreator } from '../pms/action.js';
import { receiveBPsActionCreator } from '../bps/action.js';
import { receiveUnitsActionCreator } from '../unit/action.js';
import { receiveUsersActionCreator } from '../users/action.js';

function asyncPopulateData() {
  return async (dispatch) => {
    const pms = await masterApi.getPms();
    const bps = await masterApi.getBps();
    const units = await masterApi.getUnits();
    const users = await userAPi.getAllUsers();

    dispatch(receivePMsActionCreator(pms));
    dispatch(receiveBPsActionCreator(bps));
    dispatch(receiveUnitsActionCreator(units));
    dispatch(receiveUsersActionCreator(users));
  };
}

export { asyncPopulateData };