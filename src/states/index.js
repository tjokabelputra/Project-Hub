import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects/reducer.js';
import bpsReducer from './bps/reducer.js';
import pmsReducer from './pms/reducer.js';
import unitsReducer from './unit/reducer.js';
import updatesReducer from './updates/reducer.js';

const store = configureStore({
  reducer: {
    bps: bpsReducer,
    pms: pmsReducer,
    projects: projectsReducer,
    units: unitsReducer,
    updates: updatesReducer,
  }
});

export default store;