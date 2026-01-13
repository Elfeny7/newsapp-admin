import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import Button from "./Button";

export default function ModalConfirm({ message, onConfirm, onCancel, loading, children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      // Trigger animation after mount
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [message]);

  const handleClose = (callback) => {
    setIsVisible(false);
    setTimeout(() => {
      callback();
    }, 300); // Match transition duration
  };

  if (!message) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-96 p-6 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        <div className="flex justify-center mb-1">
          <TriangleAlert size={48} className="text-red-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-red-600 text-center">
          Konfirmasi Hapus
        </h2>
        <p className="text-gray-700 mb-4 text-center">{message}</p>
        <div className="mb-6 bg-red-100 p-3 rounded-lg">
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={() => handleClose(onCancel)} disabled={loading} closeButton={true}>Close</Button>
          <Button onClick={onConfirm} disabled={loading} loading={loading} className={`bg-red-700 ${loading ? '' : 'hover:bg-red-800'}`}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
