import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddProject, asyncDeleteProject, asyncEditProject, asyncGetProjects } from './states/projects/action.js';
import DashboardPage from './page/DashboardPage.jsx';
import ProjectPage from './page/ProjectPage.jsx';
import InputUpdatePage from './page/InputUpdatePage.jsx';
import SidebarComponent from './components/SidebarComponent.jsx';
import DataManagementPage from './page/DataManagementPage.jsx';
import { asyncPreloadProcess } from './states/isPreload/action.js';
import LoginPage from './page/LoginPage.jsx';
import RegisterPage from "./page/RegisterPage.jsx";
import ProfilePage from "./page/ProfilePage.jsx";

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const projects = useSelector((states) => states.projects);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  React.useEffect(() => {
    if (!isPreload && authUser) {
      dispatch(asyncGetProjects());
    }
  }, [dispatch, authUser, isPreload]);

  if (isPreload) {
    return null;
  }

  const onDeleteProject = async (projectId) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await dispatch(asyncDeleteProject(projectId));
    }
    catch (error) {
      throw error;
    }
  };

  const onAddProject = async (project) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await dispatch(asyncAddProject(project));
    }
    catch (error) {
      throw error;
    }
  };

  const onSubmitEdit = (project) => {
    dispatch(asyncEditProject(project));
  };

  if (authUser === null) {
    return (
      <>
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="app-container">
        <SidebarComponent name={authUser.name} profilePicture={authUser.profilePicture} email={authUser.email} />
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
            <Route path="/management" element={<DataManagementPage />} />
            <Route path="/profile" element={<ProfilePage user={authUser} />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
