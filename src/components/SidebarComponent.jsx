import React from 'react';
import PropTypes from 'prop-types';
import { FaFolder, FaHome, FaClipboard, FaPen } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import { FaGear } from 'react-icons/fa6';

function SidebarComponent({ name, email, role }) {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="sidebar__general">
        <div className="sidebar-general__webinfo">
          <div className="sidebar-general-webinfo__logo-container">
            <FaFolder className="sidebar-general-webinfo__logo" />
          </div>
          <p className="sidebar-general-webinfo__webname">Project Hub</p>
        </div>

        <nav className="sidebar-general__navigation">
          <NavLink to="/dashboard" end  className="sidebar-general-navigation__link">
            <FaHome className="sidebar-navigation__icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/projects" className="sidebar-general-navigation__link">
            <FaClipboard className="sidebar-navigation__icon" />
            <span>Project</span>
          </NavLink>

          { role !== 'VIEWER' && (
            <NavLink to="/updates" className="sidebar-general-navigation__link">
              <FaPen className="sidebar-navigation__icon" />
              <span>Input Update</span>
            </NavLink>
          )}

          { role === 'ADMIN' && (
            <NavLink to="/management" className="sidebar-general-navigation__link">
              <FaGear className="sidebar-navigation__icon" />
              <span>Manage Data</span>
            </NavLink>
          )}
        </nav>

      </div>
      <div className="sidebar__user" onClick={() => navigate('/profile')}>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random&color=CBD5E1&bold=true`}
          alt={name}
        />
        <div className="sidebar-user__info">
          <p className="sidebar-user-info__name">{name}</p>
          <p className="sidebar-user-info__email">{email}</p>
        </div>
      </div>
    </aside>
  );
}

SidebarComponent.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};

export default SidebarComponent;