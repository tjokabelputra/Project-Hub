import { ActionType } from './action.js';

function projectsReducer(projects = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_PROJECT:
    return [...projects, action.payload.project];
  case ActionType.RECEIVE_PROJECTS:
    return action.payload.projects;
  case ActionType.DELETE_PROJECT:
    return projects.filter((project) => project.id !== action.payload.projectId);
  case ActionType.RESTORE_PROJECT: {
    const { index, project } = action.payload;
    return [
      ...projects.slice(0, index),
      project,
      ...projects.slice(index)
    ];
  }
  default:
    return projects;
  }
}

export default projectsReducer;