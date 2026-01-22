import type { Workflow, SortOption } from '../types';
import { WorkflowsTable } from './WorkflowsTable';
import { WorkflowCardList } from './WorkflowCardList';
import { FeedbackMessage } from '../../../shared/components';

interface WorkflowsListProps {
  workflows: Workflow[];
  sortOption: SortOption;
  isLoading?: boolean;
  onEdit: (workflow: Workflow) => void;
  onDelete: (workflow: Workflow) => void;
}

export const WorkflowsList = ({
  workflows,
  sortOption,
  isLoading = false,
  onEdit,
  onDelete,
}: WorkflowsListProps) => {
  if (!isLoading && workflows.length === 0) {
    return (
      <FeedbackMessage
        title="No workflows found"
        message="Try adjusting your search or filters"
      />
    );
  }

  return (
    <div className="bg-white overflow-hidden">
      {/* Mobile: Cards */}
      <div className="md:hidden">
        <WorkflowCardList
          workflows={workflows}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block">
        <WorkflowsTable
          workflows={workflows}
          sortOption={sortOption}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};
