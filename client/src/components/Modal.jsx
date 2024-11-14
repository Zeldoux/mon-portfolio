import React from 'react';
import '../style/Modal.css';

function Modal({ content, onClose }) {
  if (!content) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">{content}</div>
      </div>
    </div>
  );
}

export default Modal;