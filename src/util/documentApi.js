import { _fetchWithAuth } from './util.js';

const documentApi = (() => {
  const BASE_URL = 'http://localhost:3000';

  async function downloadDocument(documentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/documents/${documentId}/download`
    );

    if (!response.ok) {
      throw new Error('Gagal mengunduh dokumen.');
    }

    return await response.blob();
  }

  async function deleteDocument(documentId) {
    const response = await _fetchWithAuth(`${BASE_URL}/documents/${documentId}`, {
      method: 'DELETE'
    });
    const responseJson = await response.json();

    const { success, message } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return true;
  }

  return {
    downloadDocument,
    deleteDocument
  };
})();

export default documentApi;