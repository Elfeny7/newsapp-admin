import Button from "./Button";

export default function ModalConfirm({ message, onConfirm, onCancel, loading }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Konfirmasi Hapus
        </h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} loading={loading} className="bg-gray-200 !text-gray-700 hover:bg-gray-300">Close</Button>
          <Button onClick={onConfirm} loading={loading} className="bg-red-600 hover:bg-red-700">Delete</Button>
        </div>
      </div>
    </div>
  );
}
