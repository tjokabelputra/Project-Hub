import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { dummyUser } from './data/dummy.js';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddProject, asyncDeleteProject, asyncEditProject, asyncGetProjects } from './states/projects/action.js';
import DashboardPage from './page/DashboardPage.jsx';
import ProjectPage from './page/ProjectPage.jsx';
import InputUpdatePage from './page/InputUpdatePage.jsx';
import SidebarComponent from './components/SidebarComponent.jsx';

function App() {
  const projects = useSelector((states) => states.projects);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncGetProjects());
  }, [dispatch]);

  const onDeleteProject = (projectId) => {
    dispatch(asyncDeleteProject(projectId));
  };

  const onAddProject = (project) => {
    dispatch(asyncAddProject(project));
  };

  const onSubmitEdit = (project) => {
    dispatch(asyncEditProject(project));
  };

  return (
    <>
      <div className="app-container">
        <SidebarComponent name={dummyUser.username} profilePicture={dummyUser.profilePicture} role={dummyUser.role} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage projects={projects}/>} />
            <Route path="/projects"
              element={
                <ProjectPage
                  projects={projects}
                  onDeleteProject={onDeleteProject}
                  onAddProject={onAddProject}
                  onSubmitEdit={onSubmitEdit}/>
              }/>
            <Route path="/updates" element={<InputUpdatePage projects={projects}/>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
