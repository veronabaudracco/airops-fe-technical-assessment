import { useState } from 'react';
import { useWorkflows } from './hooks/useWorkflows';
import { Layout } from './components/Layout';
import { WorkflowsToolbar } from './components/WorkflowsToolbar';
import { WorkflowsList } from './components/WorkflowsList';
import { FeedbackMessage } from './components/FeedbackMessage';
import { SortOption } from './types/workflow';

interface AppContentProps {
  onMobileMenuToggle?: () => void;
}

const AppContent = ({ onMobileMenuToggle }: AppContentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('lastUpdated-desc');

  const { workflows, isLoading, error, refetch } = useWorkflows({
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
          <WorkflowsList workflows={workflows} sortOption={sortOption} isLoading={isLoading} />
        )}
      </main>
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
