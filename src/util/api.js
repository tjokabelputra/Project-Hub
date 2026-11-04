const api = (() => {
  const BASE_URL = 'http://localhost:3000/api/v1';

  async function uploadDocuments(file) {
    try {
      const urlResponse = await fetch(`${BASE_URL}/documents/upload-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type
        })
      });

      const urlResult = await urlResponse.json();

      const { status, message } = urlResult;

      if (!urlResponse.ok || status === 'error') {
        throw new Error(message || 'Failed to generate upload URL.');
      }

      const { uploadUrl, objectKey } = urlResult.data;

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type
        },
        body: file
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload document to storage.');
      }

      return {
        name: file.name,
        size: file.size,
        objectKey: objectKey,
        contentType: file.type
      };
    }
    catch (error) {
      console.error('Document upload error:', error);
      throw error;
    }
  }

  async function getDocument(documentId) {
    const response = await fetch(`${BASE_URL}/documents/${documentId}/download`);
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteDocument(objectKey) {
    const response = await fetch(`${BASE_URL}/documents/delete`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        objectKey: objectKey
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete update.');
    }

    return true;
  }

  async function addProject(project) {
    const response = await fetch(`${BASE_URL}/projects/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: project.code,
        name: project.name,
        description: project.description,
        category: project.category,
        projectType: project.projectType,
        status: project.status,
        pm: project.pm,
        bp: project.bp,
        requestingUnit: project.requestingUnit,
        owner: project.owner,
        projectDate: project.projectDate,
        targetGoLive: project.targetGoLive,
        stagesHistory: project.stagesHistory,
        supportingDocuments: project.supportingDocuments
      })
    });
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getProjects() {
    const response = await fetch(`${BASE_URL}/projects/all`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function editProject(editedProject) {
    const response = await fetch(`${BASE_URL}/projects/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: editedProject.id,
        projectType: editedProject.projectType,
        status: editedProject.status,
        pm: editedProject.pm,
        bp: editedProject.bp,
        requestingUnit: editedProject.requestingUnit,
        owner: editedProject.owner,
        projectDate: editedProject.projectDate,
        targetGoLive: editedProject.targetGoLive,
        stagesHistory: editedProject.stagesHistory,
        supportingDocuments: editedProject.supportingDocuments
      })
    });
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteProject(projectId) {
    const response = await fetch(`${BASE_URL}/projects/delete/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete update.');
    }

    return true;
  }

  async function addUpdate(update) {
    const response = await fetch(`${BASE_URL}/updates/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: update.name,
        date: update.date,
        status: update.status,
        pic: update.pic,
        progress: update.progress,
        issue: update.issue,
        nextStep: update.nextStep,
        deadline: update.deadline,
        documents: update.documents
      })
    });

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getUpdates() {
    const response = await fetch(`${BASE_URL}/updates/all`);
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function editUpdate(editedUpdate) {
    const response = await fetch(`${BASE_URL}/updates/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: editedUpdate.id,
        name: editedUpdate.name,
        date: editedUpdate.date,
        status: editedUpdate.status,
        pic: editedUpdate.pic,
        progress: editedUpdate.progress,
        issue: editedUpdate.issue,
        nextStep: editedUpdate.nextStep,
        deadline: editedUpdate.deadline,
        documents: editedUpdate.documents
      })
    });
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteUpdate(updateId) {
    const response = await fetch(`${BASE_URL}/updates/delete/${updateId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete update.');
    }

    return true;
  }

  async function getPms() {
    const response = await fetch(`${BASE_URL}/pms/all`);
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getBps() {
    const response = await fetch(`${BASE_URL}/bps/all`);
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  return {
    uploadDocuments,
    getDocument,
    deleteDocument,
    addProject,
    getProjects,
    editProject,
    deleteProject,
    addUpdate,
    getUpdates,
    editUpdate,
    deleteUpdate,
    getPms,
    getBps
  };
})();

export default api;