import mockAPI from '../../data/mockAPI.js';

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
    dispatch(addProjectActionCreator(project));

    try {
      await mockAPI.addProject(project);
    }
    catch (error) {
      alert(error.messsage);
      dispatch(deleteProjectActionCreator(project.id));
    }
  };
}

function asyncGetProjects() {
  return async (dispatch) => {
    const projects = await mockAPI.getProjects();
    dispatch(receiveProjectActionCreator(projects));
  };
}

function asyncEditProject(editedProject) {
  return async (dispatch, getState) => {
    const { projects } = getState();

    const oldProject = projects.find((project) => project.id === editedProject.id);

    dispatch(editProjectActionCreator(editedProject));

    try {
      await mockAPI.editProject(editedProject);
    }
    catch (error) {
      alert(error.message);
      dispatch(editProjectActionCreator(oldProject));
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
  asyncAddProject,
  asyncGetProjects,
  asyncEditProject,
  asyncDeleteProject,
};