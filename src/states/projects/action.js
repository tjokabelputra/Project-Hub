import api from '../../util/api.js';

const ActionType = {
  ADD_PROJECT: 'ADD_PROJECT',
  RECEIVE_PROJECTS: 'RECEIVE_PROJECTS',
  EDIT_PROJECT: 'EDIT_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  RESTORE_PROJECT: 'RESTORE_PROJECT'
};

function addProjectActionCreator(project) {
  return {
    type: ActionType.ADD_PROJECT,
    payload: {
      project
    }
  };
}

function receiveProjectActionCreator(projects) {
  return {
    type: ActionType.RECEIVE_PROJECTS,
    payload: {
      projects
    }
  };
}

function editProjectActionCreator(project) {
  return {
    type: ActionType.EDIT_PROJECT,
    payload: {
      project
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

function asyncAddProject(project) {
  return async (dispatch) => {
    try {
      const newProjects = await api.addProject(project);
      dispatch(addProjectActionCreator(newProjects));

      return newProjects;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

function asyncGetProjects() {
  return async (dispatch) => {
    try {
      const projects = await api.getProjects();
      dispatch(receiveProjectActionCreator(projects));
    }
    catch (error) {
      alert(error);
    }
  };
}

function asyncEditProject(editedProject) {
  return async (dispatch) => {
    try {
      const responseProject = await api.editProject(editedProject);
      dispatch(editProjectActionCreator(responseProject));
    }
    catch (error) {
      alert(error.message);
    }
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
      await api.deleteProject(projectId);
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
  asyncAddProject,
  asyncGetProjects,
  asyncEditProject,
  asyncDeleteProject,
};