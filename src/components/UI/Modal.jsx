import PropTypes from 'prop-types';

const Modal = ({ 
  open, 
  onClose, 
  children, 
  className = '' 
}) => {
  if (!open) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 ${className}`}
      onClick={onClose}
    >
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div 
        className="fixed inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Modal;
