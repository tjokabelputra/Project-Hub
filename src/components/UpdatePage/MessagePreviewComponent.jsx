import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdInfo, MdRefresh } from 'react-icons/md';

function MessagePreviewComponent({ message, onGetMessage }) {
  return (
    <div className="message-preview">
      <div className="message-preview__header">
        <p className="message-preview__title">
          <FaWhatsapp />Preview Format Whatsapp
        </p>
        <button type="button" className="message-preview__refresh" onClick={onGetMessage}>
          <MdRefresh /> Refresh
        </button>
      </div>
      <div className="message-preview__main">
        <pre className="message-preview__text">
          {message || 'Klik Refresh untuk membuat preview pesan.'}
        </pre>
      </div>
      <div className="message-preview__info">
        <MdInfo className="message-preview__info-icon" />
        <div>
          <p className="message-preview__info-title">Hanya update terbaru yang terpilih akan ditampilkan.</p>
          <p className="message-preview__info-desc">Data historis tetap tersimpan dan dapat dilihat di menu update history.</p>
        </div>
      </div>
      <button className="message-preview__copy-button">
                Salin ke WhatsApp
      </button>
    </div>
  );
}

export default MessagePreviewComponent;