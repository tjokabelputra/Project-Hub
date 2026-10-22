import {
  dummyBPs,
  dummyPMs,
  dummyProjectCategories,
  dummyProjects,
  dummyProjectTypes,
  dummyRequestingUnits,
} from './dummy.js';

const mockAPI = (() => {
  function mockRequest(action){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(action());
      }, 1000);
    });
  }

  function getProjects() {
    return mockRequest(() => {
      const getName = (items, value) => {
        const id = typeof value === 'object' && value !== null ? value.id : value;
        return items.find((item) => item.id === id)?.name ?? value?.name ?? value;
      };

      return dummyProjects.map((project) => ({
        ...project,
        pm: getName(dummyPMs, project.pm),
        bp: getName(dummyBPs, project.bp),
        category: getName(dummyProjectCategories, project.category),
        projectType: getName(dummyProjectTypes, project.projectType),
        requestingUnit: getName(dummyRequestingUnits, project.requestingUnit),
      }));
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
    getProjects,
    deleteProject,
    getPMs,
    getBPs,
    getUnits
  };
})();

export default mockAPI;