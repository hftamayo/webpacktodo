import React from "react";

function DialogBox({ open, onClose, children }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClose();
    }
  };

  return (
    <button
      onClick={onClose}
      onKeyDown={handleKeyDown}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      DialogBox
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </button>
  );
}

export default DialogBox;
