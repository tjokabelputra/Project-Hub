import React, { useState } from 'react';

function DeleteProjectModal({ project, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onConfirm(project.id);
      onClose();
    }
    catch (error) {
      alert(error.message || 'Gagal menghapus project.');
    }
    finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="delete-project-modal-layout"
      onClick={onClose}>
      <div
        className="delete-project-modal"
        onClick={(e) => e.stopPropagation()}>
        <div className="delete-project__header">
          <h3 id="delete-project__title"> Konfirmasi Hapus Project </h3>
          <p className="delete-project-modal__description">
            Apakah Anda yakin ingin menghapus project ini dari
            sistem portfolio?
          </p>
        </div>
        <div className="delete-project-modal__info">
          <div className="delete-project-modal__info-row">
            <span>Nama Project</span>
            <strong>{project.name}</strong>
          </div>
          <div className="delete-project-modal__info-row">
            <span>Kode Project</span>
            <strong>{project.code}</strong>
          </div>
          <div className="delete-project-modal__info-row">
            <span>Tahapan Saat Ini</span>
            <strong>{project.currentStage || '-'}</strong>
          </div>
        </div>
        <div className="delete-project-modal__warning">
          <strong>Perhatian:</strong> Tindakan ini tidak dapat
              dibatalkan. Semua data tahapan dan dokumen terkait
              akan dihapus secara permanen.
        </div>
        <div className="delete-project-modal__actions">
          <button
            type="button"
            className="delete-project-modal__cancel"
            onClick={onClose}
            disabled={isDeleting}>
                  Batal Hapus
          </button>
          <button
            type="button"
            className="delete-project-modal__confirm"
            onClick={handleDelete}
            disabled={isDeleting}>
            {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModal;