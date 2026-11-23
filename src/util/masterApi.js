import { _fetchWithAuth } from './util.js';

const masterApi = (() => {
  const BASE_URL = 'http://localhost:3000';

  async function getEnums() {
    const result = await _fetchWithAuth(`${BASE_URL}/master/enums`);
    const resultJson = await result.json();

    const { success, message, data } = resultJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

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

  async function editPm({ id, name }) {
    const result = await _fetchWithAuth(`${BASE_URL}/master/pm/${id}`, {
      method: 'PUT',
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

  async function editBp({ id, name }) {
    const result = await _fetchWithAuth(`${BASE_URL}/master/bp/${id}`, {
      method: 'PUT',
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

  async function editUnit({ id, unitName }) {
    const result = await _fetchWithAuth(`${BASE_URL}/master/units/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: unitName
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
    getEnums,
    getPms,
    getBps,
    getUnits,
    addPm,
    addBp,
    addUnit,
    editPm,
    editBp,
    editUnit
  };
})();

export default masterApi;