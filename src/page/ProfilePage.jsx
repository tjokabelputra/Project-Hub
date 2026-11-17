import React from 'react';
import { FaIdCardAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action.js';
import { FiLock } from 'react-icons/fi';
import GeneralInputComponent from '../components/input/GeneralInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import userApi from '../util/userApi.js';

function ProfilePage({ user }) {
  const [oldPassword, onOldPasswordChange, setOldPassword] = useInput('');
  const [newPassword, onNewPasswordChange, setNewPassword] = useInput('');
  const [confirmPassword, onConfirmPasswordChange, setConfirmPassword] = useInput('');
  const dispatch = useDispatch();

  const isNewPasswordValid = newPassword.length >= 8;
  const isPasswordMatch = confirmPassword.length >= 8 && newPassword === confirmPassword;
  const isFormValid = oldPassword.length >= 8 && isNewPasswordValid && isPasswordMatch;

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const onChangePassword = async () => {
    try {
      const success = await userApi.changePassword({
        currentPassword: oldPassword,
        newPassword
      });

      if (success) {
        alert('Kata sandi berhasil diubah');

        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    }
    catch (error) {
      alert(error.message);
    }
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
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama || 'User')}&background=random&color=CBD5E1&bold=true`}
              alt="profile picture"/>
          </div>
          <div className="profile-page__profile_info">
            <p>{user.nama}</p>
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
      <div className="profile-page__reset-password">
        <div className="profile-page__header">
          <div className="profile-page__icon">
            <FiLock />
          </div>
          <div className="profile-page__header-text">
            <p>Reset Kata Sandi</p>
            <p>Masukan kata sandi lama dan kata sandi baru.</p>
          </div>
        </div>
        <div className="profile-page__reset-input">
          <GeneralInputComponent
            type="password"
            id="old"
            label="Kata Sandi Saat Ini"
            placeholder="Masukan kata sandi lama"
            value={oldPassword}
            onChange={onOldPasswordChange}/>
          <div className="profile-page__password-input">
            <GeneralInputComponent
              type="password"
              id="new"
              label="Kata Sandi Baru"
              placeholder="Masukan kata sandi baru"
              value={newPassword}
              onChange={onNewPasswordChange}/>
            <p className={`profile-page__password-hint ${
              newPassword.length === 0
                ? ''
                : isNewPasswordValid
                  ? 'valid'
                  : 'invalid'
            }`}>
              Minimal 8 karakter
            </p>
          </div>
          <div className="profile-page__password-input">
            <GeneralInputComponent
              type="password"
              id="confirm"
              label="Konfirmasi Sandi Baru"
              placeholder="Ulangi kata sandi baru"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}/>
            {confirmPassword.length > 0 && (
              <p className={`profile-page__password-hint ${
                isPasswordMatch ? 'valid' : 'invalid'
              }`}>
                {isPasswordMatch
                  ? 'Kata sandi cocok'
                  : 'Kata sandi tidak cocok'}
              </p>
            )}
          </div>
        </div>
        <div className="profile-page__button">
          <button
            type="button"
            className={`profile-page__submit-password ${
              !isFormValid ? 'profile-page__submit-password-disable' : ''
            }`}
            onClick={onChangePassword}
            disabled={!isFormValid}
          > Ubah Kata Sandi </button>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;