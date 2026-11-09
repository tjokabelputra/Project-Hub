import React from 'react';
import { FaIdCardAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action.js';

function ProfilePage({ user }) {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <section className="profile-page">
      <div className="profile-page__info">
        <div className="profile-page__header">
          <div className="profile-page__icon">
            <FaIdCardAlt />
          </div>
          <div className="profile-page__header-text">
            <p>Informasi Akun</p>
            <p>Rincian data kepegawaian</p>
          </div>
        </div>
        <div className="profile-page__main">
          <div className="profile-page__profile-picture">
            <img src={user.profilePicture} alt="profile picture"/>
          </div>
          <div className="profile-page__profile_info">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="profile-page__actions">
          <div className="profile-page__logout-info">
            <p>Sesi Akun</p>
            <p>Keluar dari akun.</p>
          </div>
          <button
            type="button"
            className="profile-page__logout-button"
            onClick={onLogout}>Keluar Akun</button>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;