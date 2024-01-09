import DialogBox from "./DialogBox";

function ConfirmDialogBox({ isOpen, onClose, selectedEntityName, onDelete }) {
  return (
    <DialogBox isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <h2 className="text-2xl font-semibold">Delete Selected Record</h2>
        <div className="mt-4">
          <p>
            Are you sure you want to delete the record{" "}
            <span className="font-semibold">{selectedEntityName}</span>?
          </p>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-normal text-white bg-gray-600 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 font-normal text-white bg-red-600 rounded-lg"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </DialogBox>
  );
}

export default ConfirmDialogBox;
