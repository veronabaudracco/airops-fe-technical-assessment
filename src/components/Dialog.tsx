import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger';
  actionsAlignment?: 'start' | 'center' | 'end';
  className?: string;
}

export const Dialog = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Save',
  confirmVariant = 'primary',
  actionsAlignment = 'end',
  className = '',
}: DialogProps) => {
  if (!isOpen) return null;

  const confirmButtonClass =
    confirmVariant === 'danger'
      ? 'px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium'
      : 'px-4 py-2 bg-brand-purple text-white rounded-md hover:opacity-90 transition-opacity text-sm font-medium';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className={`relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6 m-4 ${className}`}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-system-black">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        {children}
        {onConfirm && (
          <div className={`flex items-center justify-${actionsAlignment} gap-2 mt-6`}>
            <Button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium text-system-black"
            >
              {cancelLabel}
            </Button>
            <Button onClick={onConfirm} className={confirmButtonClass}>
              {confirmLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
