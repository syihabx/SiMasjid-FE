import PropTypes from 'prop-types';
import { useState } from 'react';
import useApi from '../../hooks/api/useApi';

const DeleteModal = ({
  isOpen,
  onClose,
  title = 'Konfirmasi Penghapusan',
  entity,
  itemId,
  onDeleteSuccess
}) => {
  const { del } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    try {
      if (!itemId) {
        throw new Error('Tidak ada ID item yang dipilih untuk dihapus');
      }
      
      setIsLoading(true);
      setError(null);
      
      const response = await del(entity,itemId);
      // console.log('Delete response:', response);
      
      if (response?.status) {
        onClose();
        if (typeof onDeleteSuccess === 'function') {
          onDeleteSuccess();
        }
      } else {
        throw new Error(response?.message || 'Gagal menghapus item');
      }
    } catch (error) {
      // console.error('Delete error:', error);
      setError(error.message || 'Gagal menghapus item');
    } finally {
      setIsLoading(false);
    }
  };

  const message = 'Apakah Anda yakin ingin menghapus data ini?';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Menghapus...
              </div>
            ) : (
              'Hapus'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

export default DeleteModal;
