import type { Workflow } from '../types/workflow';
import {WorkflowCard,  Skeleton } from '.';

interface WorkflowCardListProps {
  workflows: Workflow[];
  isLoading?: boolean;
  onEdit: (workflow: Workflow) => void;
  onDelete: (workflow: Workflow) => void;
}
export const WorkflowCardList = ({
  workflows,
  isLoading = false,
  onEdit,
  onDelete,
}: WorkflowCardListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="bg-white border border-[rgba(9,9,11,0.08)] rounded-lg p-4 space-y-3" key={i}>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          workflow={workflow}
          onEdit={() => onEdit(workflow)}
          onDelete={() => onDelete(workflow)}
        />
      ))}
    </div>
  );
};
