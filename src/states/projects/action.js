import mockAPI from '../../data/mockAPI.js';

const ActionType = {
  RECEIVE_PROJECTS: 'RECEIVE_PROJECTS'
};

function receiveProjectActionCreator(projects) {
  return {
    type: ActionType.RECEIVE_PROJECTS,
    payload: {
      projects
    }
  };
}

function asyncGetProjects() {
  return async (dispatch) => {
    const projects = await mockAPI.getProjects();
    dispatch(receiveProjectActionCreator(projects));
  };
}

export {
  ActionType,
  receiveProjectActionCreator,
  asyncGetProjects
};