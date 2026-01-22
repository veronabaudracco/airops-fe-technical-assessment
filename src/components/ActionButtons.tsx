import { Pencil, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="flex items-center justify-center w-8 h-8 md:w-6 md:h-6 bg-[rgba(9,9,11,0.04)] rounded-md hover:bg-[rgba(9,9,11,0.08)] transition-colors"
        aria-label="Edit"
      >
        <Pencil className="w-3.5 h-3.5 md:w-3 md:h-3 text-[#09090B]" strokeWidth={2} />
      </button>
      <button
        onClick={onDelete}
        className="flex items-center justify-center w-8 h-8 md:w-6 md:h-6 bg-[rgba(9,9,11,0.04)] rounded-md hover:bg-[rgba(9,9,11,0.08)] transition-colors"
        aria-label="Delete"
      >
        <Trash2 className="w-3.5 h-3.5 md:w-3 md:h-3 text-[#09090B]" strokeWidth={2} />
      </button>
    </div>
  );
};
