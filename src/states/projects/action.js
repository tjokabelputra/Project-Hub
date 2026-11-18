import api from '../../util/api.js';
import projectApi from '../../util/projectApi.js';
import documentApi from '../../util/documentApi.js';

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

function asyncAddProject(project) {
  return async (dispatch) => {
    try {
      const newProject = await projectApi.addProject(project);
      if (project.newDocuments.length > 0) {
        await projectApi.addDocument(newProject.id, project.newDocuments);
      }
      const projects = await projectApi.getProjects();
      dispatch(receiveProjectActionCreator(projects));

      return newProject;
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
      const projects = await projectApi.getProjects();
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
      await projectApi.editProject(editedProject);
      await projectApi.editStages(editedProject.id, editedProject.stages);
      if (editedProject.newDocuments.length > 0) {
        await projectApi.addDocument(editedProject.id, editedProject.newDocuments);
      }
      const projects = await projectApi.getProjects();
      dispatch(receiveProjectActionCreator(projects));

      return true;
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
      await projectApi.deleteProject(projectId);
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