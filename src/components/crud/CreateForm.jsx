import { useState } from 'react';
import useApi from '../../hooks/api/useApi';

const CreateForm = ({
  entity,
  fields,
  onCreateSuccess,
  onClose
}) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { post } = useApi();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Ensure all required fields are present with default values
      const submissionData = fields.reduce((acc, field) => {
        acc[field.name] = formData[field.name] || 
          (field.type === 'checkbox' ? false : '');
        return acc;
      }, {});
      
      await post(entity, submissionData);
      onCreateSuccess();
    } catch (error) {
      setError(error.message || 'Failed to create item');
      console.error('Error creating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Create New {entity}</h2>

      {error && (
        <div className="text-red-500 text-sm mb-4">{error}</div>
      )}

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
                type={field.type || 'text'}
                name={field.name}
                id={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
