import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchWorkflows } from '../services/workflows.service';
import { useDebounce } from './useDebounce';
import type { Workflow, WorkflowsResponse, SortOption } from '../types/workflow';

interface UseWorkflowsParams {
  searchQuery: string;
  sortOption: SortOption;
}

interface UseWorkflowsReturn {
  workflows: Workflow[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const normalize = (value: string) => value.trim().toLowerCase();

export const useWorkflows = ({
  searchQuery,
  sortOption,
}: UseWorkflowsParams): UseWorkflowsReturn => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const loadWorkflows = useCallback(async () => {

    setIsLoading(true);
    setError(null);

    try {
      const response: WorkflowsResponse = await fetchWorkflows();

      setWorkflows(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  const refetch = useCallback(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  const filteredAndSortedWorkflows = useMemo(() => {
    const query = normalize(debouncedSearchQuery);

    const filtered = query
      ? workflows.filter((workflow) =>
          normalize(workflow.name).includes(query)
        )
      : workflows;

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'lastUpdated-desc':
          return b.lastUpdated - a.lastUpdated;
        case 'lastUpdated-asc':
          return a.lastUpdated - b.lastUpdated;
        case 'name-asc':
          return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        case 'name-desc':
          return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' });
        default:
          return 0;
      }
    });

    return sorted;
  }, [workflows, debouncedSearchQuery, sortOption]);

  return {
    workflows: filteredAndSortedWorkflows,
    isLoading,
    error,
    refetch,
  };
};
