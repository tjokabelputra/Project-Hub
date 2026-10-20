import { dummyProjects } from './dummy.js';

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
      return JSON.parse(JSON.stringify(dummyProjects));
    });
  }

  return {
    getProjects
  };
})();

export default mockAPI;