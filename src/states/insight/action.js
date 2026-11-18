import dashboardApi from "../../util/dashboardApi.js";

const ActionType = {
  LATEST_INSIGHT: 'LATEST_INSIGHT'
};

function latestInsightActionCreator(insight) {
  return {
    type: ActionType.LATEST_INSIGHT,
    payload: {
      insight
    }
  };
}

function asyncGenerateInsight() {
  return async (dispatch) => {
    try {
      const newInsight = await dashboardApi.generateAiSummary();
      dispatch(latestInsightActionCreator(newInsight));

      return newInsight;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

function asyncGetLatestInsight() {
  return async (dispatch) => {
    try {
      const latestInsight = await dashboardApi.getAiSummary();
      dispatch(latestInsightActionCreator(latestInsight));

      return latestInsight;
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

export {
  ActionType,
  latestInsightActionCreator,
  asyncGenerateInsight,
  asyncGetLatestInsight
};