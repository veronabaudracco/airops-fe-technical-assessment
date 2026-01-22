import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchWorkflows } from '../services/workflows.service';
import { useDebounce } from './useDebounce';
import { filterWorkflows } from '../utils/workflows';
import type { Workflow, WorkflowsResponse } from '../types/workflow';

interface UseWorkflowsParams {
  searchQuery: string;
}

interface UseWorkflowsReturn {
  workflows: Workflow[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWorkflows = ({
  searchQuery,
}: UseWorkflowsParams): UseWorkflowsReturn => {
  const [rawWorkflows, setRawWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const loadWorkflows = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: WorkflowsResponse = await fetchWorkflows();
      setRawWorkflows(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error. Please try again.');
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

  const workflows = useMemo(() => {
    return filterWorkflows(rawWorkflows, debouncedSearchQuery);
  }, [rawWorkflows, debouncedSearchQuery]);

  return { workflows, isLoading, error, refetch };
};
