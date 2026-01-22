export type WorkflowType = 'workflow' | 'agent';

export interface Tag {
  name: string;
  color: string;
}

export interface Workflow {
  id: number;
  type: WorkflowType;
  name: string;
  tags: Tag[];
  lastUpdated: number;
}

export interface WorkflowsResponse {
  count: number;
  data: Workflow[];
}
