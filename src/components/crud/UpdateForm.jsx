import { useState, useEffect } from 'react';
import useApi from '../../hooks/api/useApi';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const UpdateForm = ({
  entity,
  fields,
  selectedItem,
  onUpdateSuccess,
  onClose
}) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get, put } = useApi();

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (selectedItem && isMounted) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await get(`${entity}/${selectedItem.id}`);
          if (isMounted) {
            const initialData = {};
            fields.forEach(field => {
              const value = response.data[field.name];
              if (field.type === 'date' && value) {
                // Format date fields to yyyy-MM-dd for input[type="date"]
                const date = new Date(value);
                if (!isNaN(date)) {
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const day = String(date.getDate()).padStart(2, '0');
                  initialData[field.name] = `${year}-${month}-${day}`;
                } else {
                  initialData[field.name] = '';
                }
              } else {
                initialData[field.name] = value || '';
              }
            });
            setFormData(initialData);
          }
        } catch (error) {
          if (isMounted) {
            setError(error.message || 'Failed to load data');
            console.error('Error fetching data:', error);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [selectedItem?.id, fields, entity]); // Only selectedItem.id changes matter

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Transform data before sending
      const transformedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => {
          // Handle boolean values
          if (value === 'True' || value === 'true') return [key, true];
          if (value === 'False' || value === 'false') return [key, false];
          if (value === '') return [key, false]; // Convert empty string to false
          
          // Handle date values
          if (key.toLowerCase().includes('date') && value) {
            const date = new Date(value);
            if (!isNaN(date)) {
              // Format as yyyy-MM-dd without time component
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              return [key, `${year}-${month}-${day}`];
            }
          }
          
          return [key, value];
        })
      );
      
      // console.log('Update data:', transformedData);
      // console.log('Update URL:', `${entity}/${selectedItem.id}`);
      const response = await put(entity, selectedItem.id, transformedData);
      // console.log('Update response:', response);

      onUpdateSuccess();
    } catch (error) {
      setError(error.message || 'Failed to update item');
      console.error('Error updating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Update {entity}</h2>

      {error && (
        <div className="text-red-500 text-sm mb-4">{error}</div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <LoadingSpinner size={8} />
        </div>
      ) : (
        <>
          {fields.map((field) => (
            <div key={field.name} className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <div className="col-span-2">
                {field.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    name={field.name}
                    id={field.name}
                    checked={formData[field.name] || false}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                ) : (
                  <input
                    type={field.type === 'date' ? 'date' : field.type || 'text'}
                    name={field.name}
                    id={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                )}
              </div>
            </div>
          ))}
        </>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading || isSubmitting}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
