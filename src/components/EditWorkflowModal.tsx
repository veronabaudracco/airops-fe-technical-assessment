import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Workflow, Tag } from '../types/workflow';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Input } from './Input';

interface EditWorkflowModalProps {
  workflow: Workflow | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, updates: Partial<Workflow>) => void;
}

export const EditWorkflowModal = ({ workflow, isOpen, onClose, onSave }: EditWorkflowModalProps) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (workflow) {
      setName(workflow.name);
      setTags(workflow.tags);
    }
  }, [workflow]);

  if (!workflow) return null;

  const handleSave = () => {
    onSave(workflow.id, { name, tags });
    onClose();
  };

  const handleAddTag = () => {
    const newTag: Tag = {
      name: 'New Tag',
      color: '#00A3FF',
    };
    setTags([...tags, newTag]);
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagChange = (index: number, field: keyof Tag, value: string) => {
    setTags(
      tags.map((tag, i) => (i === index ? { ...tag, [field]: value } : tag))
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Workflow"
      onConfirm={handleSave}
      confirmLabel="Save"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-system-black mb-1">
            Name
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-system-black mb-1">
            Tags
          </label>
          <div className="space-y-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="text"
                  value={tag.name}
                  onChange={(e) => handleTagChange(index, 'name', e.target.value)}
                  placeholder="Tag name"
                  className="flex-1"
                />
                <input
                  type="color"
                  value={tag.color}
                  onChange={(e) => handleTagChange(index, 'color', e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                />
                <Button
                  onClick={() => handleRemoveTag(index)}
                  className="flex items-center justify-center w-8 h-8 bg-red-50 rounded hover:bg-red-100 transition-colors cursor-pointer"
                  aria-label="Remove tag"
                >
                  <X className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ))}
            <Button
              onClick={handleAddTag}
              className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium text-system-black"
            >
              Add Tag
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
