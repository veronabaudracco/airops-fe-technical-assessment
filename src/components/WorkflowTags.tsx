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
    <div className="inline-flex items-center justify-center gap-2 h-[30px] px-2.5 py-[5px] bg-white border border-[rgba(9,9,11,0.08)] rounded-[38px]">
      <div className="flex items-center gap-1">
        {tags.slice(0, 2).map((tag, idx) => (
          <div
            key={idx}
            className="w-2 h-2 rounded-[2px]"
            style={{ backgroundColor: tag.color }}
          />
        ))}
      </div>
      <p className="text-[13px] font-semibold text-[#09090B]">
        {tags.length} tags
      </p>
    </div>
  );
};
