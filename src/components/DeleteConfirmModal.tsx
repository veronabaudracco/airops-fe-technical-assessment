import { AlertTriangle } from 'lucide-react';
import { Dialog } from './Dialog';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  workflowName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal = ({
  isOpen,
  workflowName,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Delete"
      confirmVariant="danger"
      actionsAlignment="center"
    >
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
        <AlertTriangle className="w-6 h-6 text-red-600" />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-system-black mb-2">
          Delete Workflow
        </h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <span className="font-medium">"{workflowName}"</span>?
          This action cannot be undone.
        </p>
      </div>
    </Dialog>
  );
};
