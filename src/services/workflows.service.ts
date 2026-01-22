import { getWorkflowInputs } from '../lib/airops';
import { executeWorkflow } from '../api/workflows.api';
import type { WorkflowsResponse } from '../types/workflow';

export const fetchWorkflows = async (): Promise<WorkflowsResponse> => {
  const inputs = getWorkflowInputs();

  const result = await executeWorkflow(inputs);

  if (!result.output) {
    throw new Error(`Workflow failed. Status: ${result.status}`);
  }

  const output =
    typeof result.output === 'string'
      ? JSON.parse(result.output)
      : result.output;

  return output;
};

