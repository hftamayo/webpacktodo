import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function DialogBox({ children, onClose }) {
  const isOpen = useSelector((state) => state.dialog.isOpen);

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
        isOpen ? "visible bg-black bg-opacity-20" : "invisible"
      }`}
    >
      <div
        role="presentation"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Enter' && e.stopPropagation()}
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
    </button>
  );
}

DialogBox.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

export default DialogBox;
