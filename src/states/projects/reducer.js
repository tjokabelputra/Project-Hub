import { ActionType } from './action.js';

function projectsReducer(
  projects = {
    data: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    },
  },
  action = {}
) {
  switch (action.type) {
  case ActionType.RECEIVE_PROJECTS:
    return {
      data: action.payload.data,
      pagination: action.payload.pagination,
    };

  case ActionType.DELETE_PROJECT:
    return {
      ...projects,
      data: projects.data.filter(
        (project) => project.id !== action.payload.projectId
      ),
    };

  default:
    return projects;
  }
}

export default projectsReducer;