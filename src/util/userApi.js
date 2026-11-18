import { _fetchWithAuth, putAccessToken } from './util.js';

const userApi = (() => {
  const BASE_URL = 'http://localhost:3000';

  async function activateAccount({ email, token, password }) {
    const response = await fetch(`${BASE_URL}/auth/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        token: token,
        password: password
      })
    });
    const responseJson = await response.json();

    const { success, message } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return true;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/me`);
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function changePassword({ currentPassword, newPassword }) {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword
      })
    });
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    putAccessToken(data.token);

    return true;
  }

  async function getAllUsers() {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/users`);
    const responseJson  = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function reRegisterToken(uid) {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/users/${uid}/activation`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function addUser(user) {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: user.nama,
        email: user.email,
        role: user.role,
        projectManagerId: user.projectManagerId,
        businessPartnerId: user.businessPartnerId
      })
    });
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== false) {
      throw new Error(message);
    }

    return data;
  }

  return {
    activateAccount,
    login,
    getOwnProfile,
    changePassword,
    getAllUsers,
    reRegisterToken,
    addUser
  };
})();

export default userApi;