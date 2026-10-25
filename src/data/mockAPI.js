import {
  dummyBPs,
  dummyPMs,
  dummyProjectCategories,
  dummyProjects, dummyProjectStatus, dummyStagesStatus,
  dummyProjectTypes,
  dummyRequestingUnits,
} from './dummy.js';

const mockAPI = (() => {
  const getName = (items, value) => {
    const id = typeof value === 'object' && value !== null ? value.id : value;
    return items.find((item) => item.id === id)?.name ?? value?.name ?? value;
  };

  const getId = (items, value) => {
    const name = typeof value === 'object' && value !== null ? value.name : value;
    return items.find((item) => item.name === name || item.id === value)?.id ?? value?.id ?? value;
  };

  function mockRequest(action){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(action());
      }, 1000);
    });
  }

  function addProject(project) {
    return mockRequest(() => {
      const projectWithIds = {
        ...project,
        status: getId(dummyProjectStatus, project.status),
        preCommittee: {
          ...project.preCommittee,
          status: getId(dummyStagesStatus, project.preCommittee?.status),
        },
        committeeTIB: {
          ...project.committeeTIB,
          status: getId(dummyStagesStatus, project.committeeTIB?.status),
        },
        committeeTIA: {
          ...project.committeeTIA,
          status: getId(dummyStagesStatus, project.committeeTIA?.status),
        },
        pm: getId(dummyPMs, project.pm),
        bp: getId(dummyBPs, project.bp),
        category: getId(dummyProjectCategories, project.category),
        projectType: getId(dummyProjectTypes, project.projectType),
        requestingUnit: getId(dummyRequestingUnits, project.requestingUnit),
      };

      return [...dummyProjects, projectWithIds];
    });
  }

  function getProjects() {
    return mockRequest(() => {
      return dummyProjects.map((project) => ({
        ...project,
        status: getName(dummyProjectStatus, project.status),
        preCommittee: {
          ...project.preCommittee,
          status: getName(dummyStagesStatus, project.preCommittee?.status),
        },
        committeeTIB: {
          ...project.committeeTIB,
          status: getName(dummyStagesStatus, project.committeeTIB?.status),
        },
        committeeTIA: {
          ...project.committeeTIA,
          status: getName(dummyStagesStatus, project.committeeTIA?.status),
        },
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
    addProject,
    getProjects,
    deleteProject,
    getPMs,
    getBPs,
    getUnits
  };
})();

export default mockAPI;
