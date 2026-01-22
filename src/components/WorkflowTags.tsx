import type { Tag } from '../types/workflow';
import { TagBadge } from './TagBadge';

interface WorkflowTagsProps {
  tags: Tag[];
}

export const WorkflowTags = ({ tags }: WorkflowTagsProps) => {
  if (tags.length === 0) return null;
  
  if (tags.length === 1) {
    return <TagBadge tag={tags[0]} />;
  }

  return (
    <div className="inline-flex items-center justify-center gap-2 h-[30px] px-2.5 py-[5px] bg-white border border-system-black-8 rounded-[38px]">
      <div className="flex items-center gap-1">
        {tags.slice(0, 2).map((tag, idx) => (
          <div
            key={idx}
            className="w-2 h-2 rounded-[2px]"
            style={{ backgroundColor: tag.color }}
          />
        ))}
      </div>
      <p className="text-xs font-semibold text-system-black">
        {tags.length} tags
      </p>
    </div>
  );
};
