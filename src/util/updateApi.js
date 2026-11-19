import { _fetchWithAuth } from './util.js';

const updateApi = (() => {
  const BASE_URL = 'http://localhost:3000';

  async function getUpdates(projectId) {
    const response = await _fetchWithAuth(`${BASE_URL}/daily-updates?projectId=${projectId}`);
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function previewUpdate(items) {
    const response = await _fetchWithAuth(`${BASE_URL}/daily-updates/preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    });
    const responseJson = await response.json();

    const { success, message, text } = responseJson;

    if (success !== true) {
      throw new Error(message || 'Gagal membuat preview update.');
    }

    return text;
  }

  async function addUpdate(items) {
    const response = await _fetchWithAuth(`${BASE_URL}/daily-updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: items.map((item) => ({
          projectId: item.projectId,
          status: item.status,
          aktivitas: item.aktivitas,
          kendala: item.kendala,
          nextAction: item.nextAction
        }))
      })
    });

    const responseJson = await response.json();
    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  return {
    getUpdates,
    previewUpdate,
    addUpdate
  };
})();

export default updateApi;