import { _fetchWithAuth } from './util.js';

const dashboardApi = (() => {
  const BASE_URL = 'http://localhost:3000';

  async function getDashboard() {
    const response = await _fetchWithAuth(`${BASE_URL}/dashboard`);
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function getAiSummary() {
    const response = await _fetchWithAuth(`${BASE_URL}/dashboard/ai-summary`);
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function generateAiSummary() {
    const response = await _fetchWithAuth(`${BASE_URL}/dashboard/ai-summary`, {
      method: 'POST'
    });
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  return {
    getDashboard,
    getAiSummary,
    generateAiSummary
  };
})();

export default dashboardApi;