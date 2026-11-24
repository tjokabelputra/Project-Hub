import { _fetchWithAuth } from './util.js';

const projectApi = (() => {
  const BASE_URL = 'http://localhost:3000';

  async function getProjects({ page = 1, limit = 10 }) {
    const response = await _fetchWithAuth(`${BASE_URL}/projects?page=${page}&limit=${limit}`);
    const responseJson = await response.json();

    const { success, message, data, pagination } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return {
      data,
      pagination
    };
  }

  async function filterProject({
    page = 1,
    limit = 10,
    search = '',
    status = '',
    kategori = '',
    unitId = '',
    prioritas = '',
    tahap = '',
    tahun = '',
    pmId = '',
    bpId = '',
    unitKerjaDeveloper = '',
  }) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    if (kategori) params.append('kategori', kategori);
    if (unitId) params.append('unitId', unitId);
    if (prioritas) params.append('prioritas', prioritas);
    if (tahap) params.append('tahap', tahap);
    if (tahun) params.append('tahun', tahun);
    if (pmId) params.append('pmId', pmId);
    if (bpId) params.append('bpId', bpId);
    if (unitKerjaDeveloper) {
      params.append('unitKerjaDeveloper', unitKerjaDeveloper);
    }

    const response = await _fetchWithAuth(`${BASE_URL}/projects?${params.toString()}`);
    const responseJson = await response.json();

    const { success, message, data, pagination } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return {
      data,
      pagination,
    };
  }

  async function getProjectDetail(projectId) {
    const response = await _fetchWithAuth(`${BASE_URL}/projects/${projectId}`);
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function addProject(newProject) {
    const response = await _fetchWithAuth(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kategori: newProject.kategori,
        jenis: newProject.jenis,
        kodeProject: newProject.kodeProject,
        nama: newProject.nama,
        deskripsi: newProject.deskripsi,
        ownerPic: newProject.ownerPic,
        pmId: newProject.pmId,
        bpId: newProject.bpId,
        unitId: newProject.unitId,
        unitKerjaDeveloper: newProject.unitKerjaDeveloper,
        tanggalProject: newProject.tanggalProject,
        targetGoLive: newProject.targetGoLive,
        prioritas: newProject.prioritas,
        status: newProject.status,
        stages: newProject.stages
      })
    });
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function addDocument(projectId, files) {
    if (files.length > 10) {
      throw new Error('Maksimal 10 file dalam satu upload.');
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await _fetchWithAuth(
      `${BASE_URL}/projects/${projectId}/documents`,
      {
        method: 'POST',
        body: formData
      }
    );

    const responseJson = await response.json();
    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function editProject(editedProject) {
    const response = await _fetchWithAuth(`${BASE_URL}/projects/${editedProject.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kategori: editedProject.kategori,
        jenis: editedProject.jenis,
        kodeProject: editedProject.kodeProject,
        nama: editedProject.nama,
        deskripsi: editedProject.deskripsi,
        ownerPic: editedProject.ownerPic,
        pmId: editedProject.pmId,
        bpId: editedProject.bpId,
        unitId: editedProject.unitId,
        unitKerjaDeveloper: editedProject.unitKerjaDeveloper,
        tanggalProject: editedProject.tanggalProject,
        targetGoLive: editedProject.targetGoLive,
        prioritas: editedProject.prioritas,
        status: editedProject.status,
      })
    });
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function editStages(projectId, stages) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/projects/${projectId}/stages`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stages: stages
        })
      }
    );
    const responseJson = await response.json();

    const { success, message, data } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return data;
  }

  async function deleteProject(projectId) {
    const response = await _fetchWithAuth(`${BASE_URL}/projects/${projectId}`, {
      method: 'DELETE',
    });
    const responseJson = await response.json();

    const { success, message } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return true;
  }

  return {
    getProjects,
    filterProject,
    getProjectDetail,
    addProject,
    addDocument,
    editProject,
    editStages,
    deleteProject
  };
})();

export default projectApi;