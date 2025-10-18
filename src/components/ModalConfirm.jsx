import { useState } from "react";

export default function ModalConfirm({ message, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false);
  if (!message) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Konfirmasi Hapus
        </h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className={`${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              } bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300`}
          >
            Close
          </button>
          <button
            onClick={handleConfirm}
            className={`bg-red-600 text-white px-4 py-2 rounded-lg min-w-[90px] flex justify-center items-center
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700 cursor-pointer"}`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></div>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
