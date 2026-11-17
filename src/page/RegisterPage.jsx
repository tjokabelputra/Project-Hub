import React from 'react';
import userApi from '../util/userApi.js';
import { FaFolder } from 'react-icons/fa';
import GeneralInputComponent from '../components/input/GeneralInputComponent.jsx';
import useInput from '../hooks/useInput.js';
import { Link, useNavigate } from 'react-router';
import { isEmailValid } from '../util/util.js';

function RegisterPage() {
  const [email, onEmailChange] = useInput();
  const [code, onCodeChange] = useInput();
  const [password, onPasswordChange] = useInput();
  const [repeatPassword, onRepeatPasswordChange] = useInput();

  const navigate = useNavigate();

  const isEmailValidValue = isEmailValid(email);
  const isPasswordValid = password.length >= 8;
  const isPasswordMatch = password === repeatPassword;
  const isCodeValid = code.trim().length === 64;

  const isFormValid =
      isEmailValidValue &&
      isCodeValid &&
      isPasswordValid &&
      isPasswordMatch;

  const onRegister = async () => {
    if (!isFormValid) return;

    const success = await userApi.activateAccount({ email, token: code, password });

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
            <div className="register-page__code">
              <GeneralInputComponent
                id="code"
                label="Kode Aktivasi"
                placeholder="Masukkan 64 karakter kode aktivasi"
                value={code}
                onChange={onCodeChange}
              />
              <p className={`register-page__code-hint ${
                code.length === 0
                  ? ''
                  : isCodeValid
                    ? 'valid'
                    : 'invalid'
              }`}>
                {code.length === 0
                  ? 'Masukkan kode aktivasi'
                  : isCodeValid
                    ? 'Format kode aktivasi valid'
                    : 'Kode aktivasi harus 64 karakter'}
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
            <div className="register-page__repeat-password">
              <GeneralInputComponent
                type="password"
                id="repeat-password"
                label="Ulangi Kata Sandi"
                placeholder="Masukkan ulang kata sandi"
                value={repeatPassword}
                onChange={onRepeatPasswordChange}
              />
              {repeatPassword.length > 0 && (
                <p className={`register-page__password-hint ${
                  isPasswordMatch ? 'valid' : 'invalid'
                }`}>
                  {isPasswordMatch
                    ? 'Kata sandi cocok'
                    : 'Kata sandi tidak cocok'}
                </p>
              )}
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