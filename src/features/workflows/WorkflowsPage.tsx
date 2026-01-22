import { useReducer } from 'react';
import { FeedbackMessage } from '../../shared/components';
import { useWorkflows } from './hooks/useWorkflows';
import { uiReducer, initialUIState } from './state/uiReducer';
import {
  Toolbar,
  WorkflowsList,
  EditWorkflowModal,
  DeleteConfirmModal,
} from './components';

interface WorkflowsPageProps {
  onMobileMenuToggle?: () => void;
}

export const WorkflowsPage = ({ onMobileMenuToggle }: WorkflowsPageProps) => {
  const [ui, dispatch] = useReducer(uiReducer, initialUIState);

  const { workflows, isLoading, error, refetch, updateWorkflow, deleteWorkflow } = useWorkflows({
    searchQuery: ui.searchQuery,
  });

  return (
    <>
      <Toolbar
        searchQuery={ui.searchQuery}
        sortOption={ui.sortOption}
        onSearch={(query) => dispatch({ type: "search/set", payload: query })}
        onSortChange={(option) => dispatch({ type: "sort/set", payload: option })}
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main className="px-4 py-4 md:px-5 md:py-0">
        {error ? (
          <FeedbackMessage
            title="Error loading workflows"
            message={error}
            action={{ label: 'Retry', onClick: refetch }}
          />
        ) : (
          <WorkflowsList
            workflows={workflows}
            sortOption={ui.sortOption}
            isLoading={isLoading}
            onEdit={(workflow) => dispatch({ type: "edit/open", payload: workflow })}
            onDelete={(workflow) => dispatch({ type: "delete/open", payload: workflow })}
          />
        )}
      </main>

      <EditWorkflowModal
        workflow={ui.editingWorkflow}
        isOpen={!!ui.editingWorkflow}
        onClose={() => dispatch({ type: "edit/close" })}
        onSave={updateWorkflow}
      />

      <DeleteConfirmModal
        isOpen={!!ui.deletingWorkflow}
        workflowName={ui.deletingWorkflow?.name || ''}
        onClose={() => dispatch({ type: "delete/close" })}
        onConfirm={() => {
          if (ui.deletingWorkflow) {
            deleteWorkflow(ui.deletingWorkflow.id);
          }
        }}
      />
    </>
  );
};
