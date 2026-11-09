import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects/reducer.js';
import bpsReducer from './bps/reducer.js';
import pmsReducer from './pms/reducer.js';
import unitsReducer from './unit/reducer.js';
import updatesReducer from './updates/reducer.js';
import insightReducer from './insight/reducer.js';
import usersReducer from './users/reducer.js';
import authUserReducer from './authUser/reducer.js';
import isPreloadReducer from './isPreload/reducer.js';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    bps: bpsReducer,
    pms: pmsReducer,
    projects: projectsReducer,
    units: unitsReducer,
    updates: updatesReducer,
    insight: insightReducer
  }
});

export default store;