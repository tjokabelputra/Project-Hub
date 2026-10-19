import { Routes, Route, Navigate } from 'react-router';
import DashboardPage from './page/DashboardPage.jsx';
import ProjectPage from './page/ProjectPage.jsx';
import InputUpdatePage from './page/InputUpdatePage.jsx';
import SidebarComponent from './components/SidebarComponent.jsx';
import { dummyUser } from './data/dummy.js';

function App() {
  return (
    <>
      <div className="app-container">
        <SidebarComponent name={dummyUser.username} profilePicture={dummyUser.profilePicture} role={dummyUser.role} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/updates" element={<InputUpdatePage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
