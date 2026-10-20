import { ActionType } from './action.js';

function projectsReducer(projects = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_PROJECTS:
    return action.payload.projects;
  default:
    return projects;
  }
}

export default projectsReducer;