export type WorkflowType = 'workflow' | 'agent';


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

export interface Tag {
  name: string;
  color: string;
}

export type SortOption =
  | 'lastUpdated-desc'
  | 'lastUpdated-asc'
  | 'name-asc'
  | 'name-desc';