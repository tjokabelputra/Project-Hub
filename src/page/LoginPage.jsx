import React from 'react';
import { FaFolder } from 'react-icons/fa';
import GeneralInputComponent from '../components/input/GeneralInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { asyncSetAuthUser } from '../states/authUser/action.js';
import { isEmailValid } from '../util/util.js';

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmailValidValue = isEmailValid(email);
  const isFormValid = isEmailValidValue && password.trim() !== '';

  const onLogin = async () => {
    const success = await dispatch(asyncSetAuthUser({ email, password }));

    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <section className="login-page">
      <div className="login-page-layout">
        <div className="login-page__header">
          <div className="login-page__logo">
            <div className="login-page__icon">
              <FaFolder/>
            </div>
            <h1>Project Hub</h1>
          </div>
          <p>Masuk ke akun Anda untuk memulai pencatatan project.</p>
        </div>
        <div className="login-page__input">
          <div className="login-page__input-section">
            <div className="login-page__email">
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
            <GeneralInputComponent
              type="password"
              id="password"
              label="Kata Sandi"
              placeholder="*********"
              value={password}
              onChange={onPasswordChange}/>
          </div>
          <div className="login-page__actions">
            <button
              type="button"
              className={`login-page__login ${!isFormValid ? 'login-page__login-disable' : ''}`}
              onClick={onLogin}
              disabled={!isFormValid}>Masuk</button>
            <p>
              Belum punya akun? <Link to="/register"><strong>Daftar sekarang</strong></Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;