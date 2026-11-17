import api from '../../util/api.js';
import userAPi from '../../util/userApi.js';
import { receivePMsActionCreator } from '../pms/action.js';
import { receiveBPsActionCreator } from '../bps/action.js';
import { receiveUnitsActionCreator } from '../unit/action.js';
import {receiveUsersActionCreator} from "../users/action.js";

function asyncPopulateData() {
  return async (dispatch) => {
    //const pms = await api.getPms();
    //const bps = await api.getBps();
    //const units = await api.getUnits();
    const users = await userAPi.getAllUsers();

    //dispatch(receivePMsActionCreator(pms));
    //dispatch(receiveBPsActionCreator(bps));
    //dispatch(receiveUnitsActionCreator(units));
    dispatch(receiveUsersActionCreator(users));
  };
}

export { asyncPopulateData };