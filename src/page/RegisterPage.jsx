import React from 'react';
import api from '../util/api.js';
import { FaFolder } from 'react-icons/fa';
import GeneralInputComponent from '../components/input/GeneralInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import { Link, useNavigate } from 'react-router';
import { isEmailValid } from '../util/util.js';

function RegisterPage() {
  const [name, onNameChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();
  const navigate = useNavigate();

  const isPasswordValid = password.length >= 8;
  const isEmailValidValue = isEmailValid(email);

  const isFormValid =
      name.trim() !== '' &&
      isEmailValidValue &&
      isPasswordValid;

  const onRegister = async () => {
    if (!isFormValid) return;

    const success = await api.register({ name, email, password });

    if (success) {
      navigate('/login');
    }
  };

  return (
    <section className="register-page">
      <div className="register-page-layout">
        <div className="register-page__header">
          <div className="register-page__logo">
            <div className="register-page__icon">
              <FaFolder/>
            </div>
            <h1>Project Hub</h1>
          </div>
          <p>Daftarkan akun untuk memulai pencatatan project.</p>
        </div>
        <div className="register-page__input">
          <div className="register-page__input-section">
            <GeneralInputComponent
              id="name"
              label="Nama"
              placeholder="Nama Pengguna"
              value={name}
              onChange={onNameChange}/>
            <div className="register-page__email">
              <GeneralInputComponent
                type="email"
                id="email"
                label="Email"
                placeholder="email@example.com"
                value={email}
                onChange={onEmailChange}/>
              <p className={`register-page__email-hint ${
                email.length === 0
                  ? ''
                  : isEmailValidValue
                    ? 'valid'
                    : 'invalid'}`}>
                {email.length === 0
                  ? 'Gunakan format email yang valid'
                  : isEmailValidValue
                    ? 'Format email valid'
                    : 'Format email tidak valid'}
              </p>
            </div>
            <div className="register-page__password">
              <GeneralInputComponent
                type="password"
                id="password"
                label="Kata Sandi"
                placeholder="*********"
                value={password}
                onChange={onPasswordChange}/>
              <p className={`register-page__password-hint ${isPasswordValid ? 'valid' : 'invalid'}`}>
                Minimal 8 karakter
              </p>
            </div>
          </div>
          <div className="register-page__actions">
            <button
              type="button"
              className={`register-page__register ${!isFormValid ? 'register-page__disable' : ''}`}
              onClick={onRegister}
              disabled={!isFormValid}>
              Registrasi
            </button>
            <p>
                Sudah punya akun? <Link to="/login"><strong>masuk sekarang</strong></Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;