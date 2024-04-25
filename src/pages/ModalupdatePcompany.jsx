import React from 'react';
const ModalUpdatePcompany = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Update Company Profile</h2>
              <button onClick={onClose}>Close</button>
            </div>
            <div className="modal-content">
              {/* Add your modal content here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUpdatePcompany;
