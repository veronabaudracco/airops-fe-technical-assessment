import { getAirOpsSDK, airOpsConfig } from '../features/workflows/utils/airops';
import type { WorkflowsInputs } from '../features/workflows/types/workflow';
import { getWorkflowInputs } from '../features/workflows/utils/airops';
import type { WorkflowsResponse } from '../features/workflows/types/workflow';

export interface AppExecution {
  airops_app_id: number;
  error_code: string | null;
  error_message: string | null;
  id: number;
  output: string | Record<string, unknown>;
  status: 'pending' | 'running' | 'error' | 'success' | 'cancelled';
}

export const executeWorkflow = async (
  inputs: WorkflowsInputs
): Promise<AppExecution> => {
  const sdk = await getAirOpsSDK();

  const response = await sdk.apps.execute({
    appId: airOpsConfig.workflowId,
    payload: { inputs },
  });

  return response.result();
};



export const fetchWorkflows = async (): Promise<WorkflowsResponse> => {
  const inputs = getWorkflowInputs();

  const result = await executeWorkflow(inputs);

  if (!result.output || result.status !== 'success') {
    throw new Error(`Workflow failed. Status: ${result.status}`);
  }

  const output =
    typeof result.output === 'string'
      ? JSON.parse(result.output)
      : result.output;

  return output;
};

