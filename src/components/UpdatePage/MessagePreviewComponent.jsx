import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { FaWhatsapp } from 'react-icons/fa';
import { MdInfo, MdRefresh } from 'react-icons/md';

function MessagePreviewComponent({ message, onGetMessage }) {
  const hasMessage = message.trim().length > 0;

  const convertWhatsAppToMarkdown = (text) => {
    return text.replace(
      /(?<!\*)\*([^*\n]+)\*(?!\*)/g,
      '**$1**'
    );
  };

  const whatsappUrl = message.trim()
    ? `https://wa.me/?text=${encodeURIComponent(message)}`
    : '';

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
        <div className="message-preview__text">
          {hasMessage ? (
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}>
              {convertWhatsAppToMarkdown(message)}
            </ReactMarkdown>
          ) : (
            'Klik Refresh untuk membuat preview pesan.'
          )}
        </div>
      </div>
      <div className="message-preview__info">
        <MdInfo className="message-preview__info-icon" />
        <div>
          <p className="message-preview__info-title">Hanya update terbaru yang terpilih akan ditampilkan.</p>
          <p className="message-preview__info-desc">Data historis tetap tersimpan dan dapat dilihat di menu update history.</p>
        </div>
      </div>
      {whatsappUrl ? (
        <a
          className="message-preview__send-button"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer">
          <FaWhatsapp /> Kirim ke WhatsApp
        </a>
      ) : (
        <button type="button" className="message-preview__send-button" disabled>
          <FaWhatsapp /> Kirim ke WhatsApp
        </button>
      )}
    </div>
  );
}

export default MessagePreviewComponent;
