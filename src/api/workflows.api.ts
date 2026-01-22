import { getAirOpsSDK, airOpsConfig } from '../lib/airops';

interface WorkflowExecutionResult {
  status: string;
  output: string | Record<string, unknown>;
}

export const executeWorkflow = async (
  inputs: Record<string, unknown>
): Promise<WorkflowExecutionResult> => {
  const sdk = await getAirOpsSDK();

  const response = await sdk.apps.execute({
    appId: airOpsConfig.workflowId,
    version: 1,
    payload: { inputs },
  });

  return response.result();
};
