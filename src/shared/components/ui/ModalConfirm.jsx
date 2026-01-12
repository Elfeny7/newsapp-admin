import Button from "./Button";

export default function ModalConfirm({ message, onConfirm, onCancel, loading, children }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Konfirmasi Hapus
        </h2>
        <p className="text-gray-700 mb-2">{message}</p>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} disabled={loading} closeButton={true}>Close</Button>
          <Button onClick={onConfirm} disabled={loading} loading={loading} className={`bg-red-700 ${loading ? '' : 'hover:bg-red-800'}`}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
