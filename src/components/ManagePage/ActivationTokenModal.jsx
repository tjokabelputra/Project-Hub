
import React from 'react';
import { FaCopy } from 'react-icons/fa';

function ActivationTokenModal({ token, isOpen, onClose }) {
  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      alert('Activation token berhasil disalin!');
    }
    catch (error) {
      alert('Gagal menyalin activation token.');
    }
  };
  return (
    <div className="activation-modal__overlay">
      <div className="activation-modal">
        <h3>Activation Token</h3>
        <p>Berikan token berikut kepada pengguna untuk mengaktifkan akun.</p>
        <div className="activation-modal__token">
          <input
            type="text"
            value={token}
            readOnly/>
          <button
            type="button"
            onClick={handleCopy}
            title="Copy Token">
            <FaCopy />
          </button>
        </div>
        <button
          type="button"
          className="activation-modal__close"
          onClick={onClose}>Tutup</button>
      </div>
    </div>
  );
}

export default ActivationTokenModal;