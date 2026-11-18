import { _fetchWithAuth } from './util.js';

const masterApi = (() => {
  const BASE_URL = 'http://localhost:3000';

  async function getPms() {
    const result = await _fetchWithAuth(`${BASE_URL}/master/pm`);
    const resultJson = await result.json();

    const { success, message, data } = resultJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function getBps() {
    const result = await _fetchWithAuth(`${BASE_URL}/master/bp`);
    const resultJson = await result.json();

    const { success, message, data } = resultJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function getUnits() {
    const result = await _fetchWithAuth(`${BASE_URL}/master/units`);
    const resultJson = await result.json();

    const { success, message, data } = resultJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function addPm(name) {
    const result = await _fetchWithAuth(`${BASE_URL}/master/pm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: name
      })
    });
    const resultJson = await result.json();

    const { success, message, data } = resultJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function addBp(name) {
    const result = await _fetchWithAuth(`${BASE_URL}/master/bp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: name
      })
    });
    const resultJson = await result.json();

    const { success, message, data } = resultJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function addUnit(name) {
    const result = await _fetchWithAuth(`${BASE_URL}/master/units`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: name
      })
    });
    const resultJson = await result.json();

    const { success, message, data } = resultJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  return {
    getPms,
    getBps,
    getUnits,
    addPm,
    addBp,
    addUnit
  };
})();

export default masterApi;