
import React, { useEffect, useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import PaginationComponent from '../PaginationComponent.jsx';
import ActivationTokenModal from './ActivationTokenModal.jsx';
import userApi from '../../util/userApi.js';

function UserDataTable({ data = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activationToken, setActivationToken] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingUserId, setGeneratingUserId] = useState(null);

  const tableSize = 10;
  const startIndex = (currentPage - 1) * tableSize;
  const endIndex = startIndex + tableSize;

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const getRoleLabel = (role) => {
    switch (role) {
    case 'PROJECT_MANAGER':
      return 'PM';
    case 'BUSINESS_PARTNER':
      return 'BP';
    case 'VIEWER':
      return 'Viewer';
    case 'ADMIN':
      return 'Admin';
    default:
      return role;
    }
  };

  const getStatusLabel = (activated) => {
    return activated ? 'Aktif' : 'Menunggu Aktivasi';
  };

  const handleGenerateActivation = async (id) => {
    try {
      setIsGenerating(true);
      setGeneratingUserId(id);

      const result = await userApi.reRegisterToken(id);
      const token = result?.activationToken;

      if (!token) {
        throw new Error('Activation token tidak ditemukan.');
      }

      setActivationToken(token);
      setShowTokenModal(true);
    } catch (error) {
      alert(error.message || 'Gagal generate activation token.');
    } finally {
      setIsGenerating(false);
      setGeneratingUserId(null);
    }
  };

  const handleCloseModal = () => {
    setShowTokenModal(false);
    setActivationToken('');
  };

  return (
    <div className="data-list-layout">
      <table className="data-list-table data-list-table--users">
        <thead className="data-list-table__header">
          <tr>
            <td>No</td>
            <td>Nama</td>
            <td>Email</td>
            <td>Role</td>
            <td>Status</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody className="data-list-table__body">
          {data.slice(startIndex, endIndex).map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>
              <td className="data-list-table__name">
                {item.nama}
              </td>
              <td>{item.email}</td>
              <td>{getRoleLabel(item.role)}</td>
              <td>
                <span
                  className={`data-list-table__status ${
                    item.activated
                      ? 'data-list-table__status--active'
                      : 'data-list-table__status--pending'
                  }`}>
                  {getStatusLabel(item.activated)}
                </span>
              </td>
              <td className="data-list-table__action">
                <div className="data-list-table__action-buttons">
                  {!item.activated && (
                    <button
                      type="button"
                      className="data-list-table__action-activation"
                      title="Generate Activation Token"
                      disabled={isGenerating}
                      onClick={() => handleGenerateActivation(item.id)}>
                      <FaSyncAlt
                        className={
                          generatingUserId === item.id
                            ? 'data-list-table__action-loading'
                            : ''
                        }
                      />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={6}>Tidak ada data.</td>
            </tr>
          )}
        </tbody>
      </table>
      <PaginationComponent
        type="Users"
        filteredDataLength={data.length}
        tableSize={tableSize}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ActivationTokenModal
        token={activationToken}
        isOpen={showTokenModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default UserDataTable;
