import { useState } from 'react';
import { useWorkflows } from './hooks/useWorkflows';
import {Layout, WorkflowsToolbar, WorkflowsList, FeedbackMessage, EditWorkflowModal, DeleteConfirmModal} from './components/index'
import { SortOption, Workflow } from './types/workflow';

interface AppContentProps {
  onMobileMenuToggle?: () => void;
}

const AppContent = ({ onMobileMenuToggle }: AppContentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('lastUpdated-desc');
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [deletingWorkflow, setDeletingWorkflow] = useState<Workflow | null>(null);

  const { workflows, isLoading, error, refetch, updateWorkflow, deleteWorkflow } = useWorkflows({
    searchQuery,
  });

  return (
    <>
      <WorkflowsToolbar
        searchQuery={searchQuery}
        sortOption={sortOption}
        onSearch={setSearchQuery}
        onSortChange={setSortOption}
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
            sortOption={sortOption}
            isLoading={isLoading}
            onEdit={setEditingWorkflow}
            onDelete={setDeletingWorkflow}
          />
        )}
      </main>

      <EditWorkflowModal
        workflow={editingWorkflow}
        isOpen={!!editingWorkflow}
        onClose={() => setEditingWorkflow(null)}
        onSave={updateWorkflow}
      />

      <DeleteConfirmModal
        isOpen={!!deletingWorkflow}
        workflowName={deletingWorkflow?.name || ''}
        onClose={() => setDeletingWorkflow(null)}
        onConfirm={() => {
          if (deletingWorkflow) {
            deleteWorkflow(deletingWorkflow.id);
          }
        }}
      />
    </>
  );
};

const App = () => {
  return (
    <Layout>
      <AppContent />
    </Layout>
  );
};

export default App;
