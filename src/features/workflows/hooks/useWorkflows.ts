import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchWorkflows } from '../../../api/workflows.api';
import { useDebounce } from '../../../shared/hooks';
import type { Workflow, WorkflowsResponse } from '../types';
import { filterWorkflows } from '../utils';

interface UseWorkflowsParams {
  searchQuery: string;
}

interface UseWorkflowsReturn {
  workflows: Workflow[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  updateWorkflow: (id: number, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: number) => void;
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

  const updateWorkflow = useCallback((id: number, updates: Partial<Workflow>) => {
    setRawWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === id ? { ...workflow, ...updates } : workflow
      )
    );
  }, []);

  const deleteWorkflow = useCallback((id: number) => {
    setRawWorkflows((prev) => prev.filter((workflow) => workflow.id !== id));
  }, []);

  const workflows = useMemo(() => {
    return filterWorkflows(rawWorkflows, debouncedSearchQuery);
  }, [rawWorkflows, debouncedSearchQuery]);

  return { workflows, isLoading, error, refetch, updateWorkflow, deleteWorkflow };
};
