import { dummyBPs, dummyPMs, dummyProjects, dummyRequestingUnits } from './dummy.js';

const mockAPI = (() => {
  function mockRequest(action){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(action());
      }, 1000);
    });
  }

  function addProject(project) {
    return mockRequest(() => {
      return [...dummyProjects, project];
    });
  }

  function getProjects() {
    return mockRequest(() => {
      return JSON.parse(JSON.stringify(dummyProjects));
    });
  }

  function editProject(project) {
    return mockRequest(() => {
      return dummyProjects.map((existingProject) => (
        existingProject.id === project.id ? project : existingProject
      ));
    });
  }

  function deleteProject(projectId) {
    return mockRequest(() => {
      dummyProjects.filter((project) => project.id !== projectId);
    });
  }

  function getPMs() {
    return mockRequest(() => {
      return JSON.parse(JSON.stringify(dummyPMs));
    });
  }

  function getBPs() {
    return mockRequest(() => {
      return JSON.parse(JSON.stringify(dummyBPs));
    });
  }

  function getUnits() {
    return mockRequest(() => {
      return JSON.parse(JSON.stringify(dummyRequestingUnits));
    });
  }

  return {
    addProject,
    getProjects,
    editProject,
    deleteProject,
    getPMs,
    getBPs,
    getUnits
  };
})();

export default mockAPI;
