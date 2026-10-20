import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects/reducer.js';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
  }
});

export default store;