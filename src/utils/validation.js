/**
 * Validates form data against field definitions
 * @param {Object} formData - The form data to validate
 * @param {Array} fields - Array of field definitions with validation rules
 * @returns {Object} - Object containing validation errors (empty if valid)
 */
export const validateFormData = (formData, fields) => {
  const errors = {};

  fields.forEach(field => {
    const value = formData[field.name];
    
    // Check required fields
    if (field.required && (!value || value.trim() === '')) {
      errors[field.name] = `${field.label} is required`;
      return;
    }

    // Validate field types
    switch (field.type) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[field.name] = 'Invalid email format';
        }
        break;
        
      case 'number':
        if (isNaN(Number(value))) {
          errors[field.name] = 'Must be a valid number';
        }
        break;
        
      case 'date':
        if (isNaN(Date.parse(value))) {
          errors[field.name] = 'Invalid date format';
        }
        break;
        
      // Add more type validations as needed
    }
  });

  return errors;
};

/**
 * Checks if form data is valid
 * @param {Object} errors - Validation errors object
 * @returns {boolean} - True if no errors, false otherwise
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
