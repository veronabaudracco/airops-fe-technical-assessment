import type { Tag } from '../../features/workflows/types/workflow';

interface TagBadgeProps {
  tag: Tag;
}

export const TagBadge = ({ tag }: TagBadgeProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-2 h-[30px] px-2.5 py-[5px] bg-white border border-system-black-8 rounded-[38px]">
      <div
        className="w-2 h-2 rounded-[2px]"
        style={{ backgroundColor: tag.color }}
      />
      <p className="text-xs font-semibold text-system-black">
        {tag.name}
      </p>
    </div>
  );
};
