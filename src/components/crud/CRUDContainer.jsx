import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import DeleteModal from './DeleteModal';
import ReadTable from './ReadTable';
import useApi from '../../hooks/api/useApi';
import Modal from '../../components/UI/Modal';

const CRUDContainer = ({
  entity = '',
  fields = [],
  columns = [],
  initialData = []
}) => {
  const transformedColumns = useMemo(() => {
    if (columns.length > 0) return columns;
    
    return fields.map(field => ({
      field: field.name,
      header: field.label
    }));
  }, [fields, columns]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [data, setData] = useState({
    items: initialData,
    totalItems: initialData.length
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const sortedData = useMemo(() => {
    if (!sortField) return data.items;
    
    return [...data.items].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data.items, sortField, sortDirection]);

  useEffect(() => {
    if (entity) {
      fetchData();
    }
  }, [entity, currentPage, sortField, sortDirection]);
  const [modalState, setModalState] = useState({
    create: false,
    update: false
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = (type) => {
    setModalState(prev => ({
      ...prev,
      [type]: true
    }));
  };

  const closeModal = (type) => {
    setModalState(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const { get, post, put, del } = useApi();

  const fetchData = async () => {
    try {
      const response = await get(entity, {
        params: {
          page: currentPage,
          pageSize: 10,
          sortField,
          sortOrder: sortDirection
        }
      });
      
      // console.log('Full API response:', response);
      // console.log('Response data:', response?.data);
      // console.log('Response status:', response?.status);
      
      if (response?.status) {
        // Convert object with numeric keys to array
        const itemsArray = Object.values(response.data);
        setData({
          items: itemsArray,
          totalItems: response.totalData || itemsArray.length || 0
        });
      } else {
        setData({
          items: [],
          totalItems: 0
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await post(entity, formData);
      fetchData();
      closeModal('create');
    } catch (error) {
      console.error('Error creating:', error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      if (!selectedItem?.id) {
        throw new Error('No selected item ID for update');
      }
      // console.log('Updating item with ID:', selectedItem.id);
      const updateUrl = `${entity}/${selectedItem.id}`;
      // console.log('Update URL:', updateUrl);
      const response = await put(updateUrl, formData);
      // console.log('Update response:', response);
      fetchData();
      closeModal('update');
    } catch (error) {
      console.error('Error updating:', error.message || 'Failed to update item');
    }
  };


  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
    fetchData();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData();
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    setSelectedItemId(null);
    setSelectedItem(null);
    fetchData();
  };
  // console.log(response)
  // console.log(data.items)
  return (
    <div className="space-y-4">
      {/* <div className="sticky top-0 z-50 flex flex-col space-y-4 mb-6 p-4 bg-white shadow-sm rounded-lg"> */}
        {/* <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{entity} Management</h1>
          <button
            onClick={() => openModal('create')}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add
            </span>
          </button>
        </div> */}

        <button
          onClick={() => openModal('create')}
          className="fixed bottom-8 right-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg"
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </span>
        </button>
      {/* </div> */}

        <ReadTable
          entity={entity}
          data={Array.isArray(sortedData) ? sortedData : []}
          columns={transformedColumns}
          totalItems={data.totalItems || 0}
          totalPages={Math.ceil((data.totalItems || 0) / 10)}
          itemsPerPage={10}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onSort={handleSort}
          onEdit={(item) => {
            setSelectedItem(item);
            openModal('update');
          }}
          onDelete={(item) => {
            if (!item?.id) {
              console.error('No valid ID found in item:', item);
              return;
            }
            setSelectedItem(item);
            setSelectedItemId(item.id);
            setIsDeleteModalOpen(true);
          }}
        />

      <Modal
        open={modalState.create}
        onClose={() => closeModal('create')}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-full max-w-2xl p-6 mx-4">
          <CreateForm
            entity={entity}
            fields={fields}
            onCreateSuccess={() => {
              fetchData();
              closeModal('create');
            }}
            onClose={() => closeModal('create')}
          />
        </div>
      </Modal>

      <Modal
        open={modalState.update}
        onClose={() => closeModal('update')}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-full max-w-2xl p-6 mx-4">
          <UpdateForm
            entity={entity}
            fields={fields}
            selectedItem={selectedItem}
            onUpdateSuccess={() => {
              fetchData();
              closeModal('update');
            }}
            onClose={() => closeModal('update')}
          />
        </div>
      </Modal>

        {isDeleteModalOpen && selectedItemId && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedItemId(null);
            }}
            entity={entity}
            itemId={selectedItemId}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
    </div>
  );
};

CRUDContainer.propTypes = {
  entity: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired
    })
  ),
  initialData: PropTypes.array
};

export default CRUDContainer;
