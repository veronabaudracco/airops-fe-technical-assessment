import { useState, useEffect } from 'react';
import { fetchWorkflows } from '../services/workflows.service';
import type { Workflow, WorkflowsResponse } from '../types/workflow';

interface UseWorkflowsReturn {
  workflows: Workflow[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook to fetch and manage workflows data
 */
export const useWorkflows = (): UseWorkflowsReturn => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkflows()
      .then((response: WorkflowsResponse) => setWorkflows(response.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    fetchWorkflows()
      .then((response: WorkflowsResponse) => setWorkflows(response.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  return {
    workflows,
    isLoading,
    error,
    refetch,
  };
};
