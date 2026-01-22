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

export const SORT_OPTIONS = {
  LAST_UPDATED_DESC: 'lastUpdated-desc',
  LAST_UPDATED_ASC: 'lastUpdated-asc',
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
} as const;

export type SortOption = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS];