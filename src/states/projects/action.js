import mockAPI from '../../data/mockAPI.js';

const ActionType = {
  RECEIVE_PROJECTS: 'RECEIVE_PROJECTS',
  DELETE_PROJECT: 'DELETE_PROJECT',
  RESTORE_PROJECT: 'RESTORE_PROJECT'
};

function receiveProjectActionCreator(projects) {
  return {
    type: ActionType.RECEIVE_PROJECTS,
    payload: {
      projects
    }
  };
}

function deleteProjectActionCreator(projectId) {
  return {
    type: ActionType.DELETE_PROJECT,
    payload: {
      projectId
    }
  };
}

function restoreProjectActionCreator({ index, project }) {
  return {
    type: ActionType.RESTORE_PROJECT,
    payload: {
      index,
      project
    }
  };
}

function asyncGetProjects() {
  return async (dispatch) => {
    const projects = await mockAPI.getProjects();
    dispatch(receiveProjectActionCreator(projects));
  };
}

function asyncDeleteProject(projectId) {
  return async (dispatch, getState) => {
    const { projects } = getState();

    const oldIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    const oldProject = projects[oldIndex];

    dispatch(deleteProjectActionCreator(projectId));

    try {
      await mockAPI.deleteProject(projectId);
    }
    catch (error) {
      alert(error.message);
      dispatch(restoreProjectActionCreator({ oldIndex, oldProject }));
    }
  };
}

export {
  ActionType,
  receiveProjectActionCreator,
  deleteProjectActionCreator,
  restoreProjectActionCreator,
  asyncGetProjects,
  asyncDeleteProject,
};