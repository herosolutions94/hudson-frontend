import React, { useEffect, useRef } from 'react';

const PopupSmall = ({ isOpen, onClose, children }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();  // Close the popup if click is outside _inner div
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`popup detail_popup ${isOpen ? 'open' : ''}`}>
      <div className="table_dv">
        <div className="table_cell">
         
          <div className="_inner" ref={popupRef}>
          <button className="x_btn" onClick={onClose}></button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupSmall;

