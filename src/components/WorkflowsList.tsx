import type { Workflow, SortOption } from '../types/workflow';
import { WorkflowsTable } from './WorkflowsTable';
import { WorkflowCardList } from './WorkflowCardList';
import { FeedbackMessage } from './FeedbackMessage';

interface WorkflowsListProps {
  workflows: Workflow[];
  sortOption: SortOption;
  isLoading?: boolean;
}

export const WorkflowsList = ({ workflows, sortOption, isLoading = false }: WorkflowsListProps) => {
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
        <WorkflowCardList workflows={workflows} isLoading={isLoading} />
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block">
        <WorkflowsTable workflows={workflows} sortOption={sortOption} isLoading={isLoading} />
      </div>
    </div>
  );
};
