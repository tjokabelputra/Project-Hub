import dashboardApi from '../../util/dashboardApi.js';

const ActionType = {
  RECEIVE_DASHBOARD: 'RECEIVE_DASHBOARD'
};

function receiveDashboardActionCreator(dashboard) {
  return {
    type: ActionType.RECEIVE_DASHBOARD,
    payload: {
      dashboard
    }
  };
}

function asyncGetDashboard() {
  return async (dispatch) => {
    try {
      const dashboard = await dashboardApi.getDashboard();
      dispatch(receiveDashboardActionCreator(dashboard));
    }
    catch (error) {
      alert(error);
    }
  };
}

export {
  ActionType,
  receiveDashboardActionCreator,
  asyncGetDashboard
};