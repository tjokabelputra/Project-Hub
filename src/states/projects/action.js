import projectApi from '../../util/projectApi.js';

const ActionType = {
  RECEIVE_PROJECTS: 'RECEIVE_PROJECTS',
  DELETE_PROJECT: 'DELETE_PROJECT',
  RESTORE_PROJECT: 'RESTORE_PROJECT'
};

function receiveProjectActionCreator(data, pagination) {
  return {
    type: ActionType.RECEIVE_PROJECTS,
    payload: {
      data,
      pagination,
    },
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

function asyncGetProjects(page = 1, limit = 100) {
  return async (dispatch) => {
    try {
      const result = await projectApi.getProjects({ page, limit });

      dispatch(
        receiveProjectActionCreator(
          result.data,
          result.pagination
        )
      );
    }
    catch (error) {
      alert(error.message);
    }
  };
}

function asyncFilterProject({ page = 1, appliedFilter = {} }) {
  return async (dispatch) => {
    try {
      const result = await projectApi.filterProject({
        page,
        search: appliedFilter.name,
        status: appliedFilter.status,
        kategori: appliedFilter.category,
        unitId: appliedFilter.unitId,
        prioritas: appliedFilter.priority,
        tahap: appliedFilter.step,
        tahun: appliedFilter.year,
        pmId: appliedFilter.pmId,
        bpId: appliedFilter.bpId,
        unitKerjaDeveloper: appliedFilter.workUnit,
      });

      dispatch(
        receiveProjectActionCreator(
          result.data,
          result.pagination
        )
      );
    }
    catch (error) {
      alert(error.message);
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
      const projects = await projectApi.getProjects(1);
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
  asyncFilterProject,
  asyncEditProject,
  asyncDeleteProject,
};