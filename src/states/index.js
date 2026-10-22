import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects/reducer.js';
import bpsReducer from './bps/reducer.js';
import pmsReducer from './pms/reducer.js';
import unitsReducer from './unit/reducer.js';

const store = configureStore({
  reducer: {
    bps: bpsReducer,
    pms: pmsReducer,
    projects: projectsReducer,
    units: unitsReducer
  }
});

export default store;