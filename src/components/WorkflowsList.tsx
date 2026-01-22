import type { Workflow, SortOption } from '../types/workflow';
import { WorkflowsTable } from './WorkflowsTable';
import { WorkflowCardList } from './WorkflowCardList';

interface WorkflowsListProps {
  workflows: Workflow[];
  sortOption: SortOption;
  isLoading?: boolean;
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 bg-white rounded-lg border border-gray-200">
    <p className="text-lg font-medium">No workflows found</p>
    <p className="text-sm mt-2 text-gray-400">Try adjusting your search or filters</p>
  </div>
);

export const WorkflowsList = ({ workflows, sortOption, isLoading = false }: WorkflowsListProps) => {
  if (!isLoading && workflows.length === 0) {
    return <EmptyState />;
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
