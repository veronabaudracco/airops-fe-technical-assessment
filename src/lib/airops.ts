import AirOps from '@airops/airops-js';

interface AirOpsConfig {
    apiKey: string;
    workflowId: string;
    workspaceId: number;
    userId: string;
  }
  
  interface WorkflowInputs extends Record<string, unknown> {
    count: number;
  }
  
  export const airOpsConfig: AirOpsConfig = {
    apiKey: import.meta.env.VITE_AIROPS_API_KEY,
    workflowId: import.meta.env.VITE_AIROPS_WORKFLOW_ID,
    workspaceId: parseInt(import.meta.env.VITE_AIROPS_WORKSPACE_ID, 10),
    userId: import.meta.env.VITE_AIROPS_USER_ID,
  };
  export const getWorkflowInputs = (): WorkflowInputs => ({
    count: 10,
  });

  

export const getHashedUserId = async (apiKey: string, userId: string): Promise<string> => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(apiKey);
  const messageData = encoder.encode(userId);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

let sdk: AirOps | null = null;

export const getAirOpsSDK = async () => {
  if (sdk) return sdk;

  const { apiKey, workspaceId, userId } = airOpsConfig;

  if (apiKey && workspaceId && userId) {
    const hashedUserId = await getHashedUserId(apiKey, userId);
    sdk = AirOps.identify({ userId, workspaceId, hashedUserId });
  } else {
    sdk = new AirOps();
  }

  return sdk;
};
