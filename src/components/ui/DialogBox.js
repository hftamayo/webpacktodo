import React from "react";

function DialogBox({ isOpen, onClose, children }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      onKeyDown={handleKeyDown}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        isOpen ? "visible bg-black bg-opacity-20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all transform ${
          isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default DialogBox;
