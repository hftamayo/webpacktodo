import { useSelector } from "react-redux";
import DialogBox from "./DialogBox";

function ConfirmDialogBox({ onDelete }) {
  const { isOpen, title, message, entityName } = useSelector(
    (state) => state.dialog
  );

  if (!isOpen) return null;

  return (
    <DialogBox>
      <div className="p-8">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="mt-4">
          <p>
            {message}
            <span className="font-semibold">{entityName}</span>?
          </p>
        </div>
        <div className="flex gap-4 mt-6 justify-center">
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
