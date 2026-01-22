import { parsePictographicText } from '../lib/utils';
import type { Workflow, SortOption } from '../types/workflow';

const normalize = (value: string) => value.trim().toLowerCase();

export const filterWorkflows = (workflows: Workflow[], query: string): Workflow[] => {
  if (!query.trim()) return workflows;
  
  const normalizedQuery = normalize(query);
  return workflows.filter((workflow) =>
    normalize(workflow.name).includes(normalizedQuery)
  );
};

export const sortWorkflows = (
    workflows: Workflow[],
    sortOption: SortOption
  ): Workflow[] => {
    return [...workflows].sort((a, b) => {
      switch (sortOption) {
        case 'lastUpdated-desc':
          return b.lastUpdated - a.lastUpdated;
  
        case 'lastUpdated-asc':
          return a.lastUpdated - b.lastUpdated;
  
        case 'name-asc': {
          const nameA = parsePictographicText(a.name).text;
          const nameB = parsePictographicText(b.name).text;
          return nameA.localeCompare(nameB, undefined, {
            sensitivity: 'base',
          });
        }
  
        case 'name-desc': {
          const nameA = parsePictographicText(a.name).text;
          const nameB = parsePictographicText(b.name).text;
          return nameB.localeCompare(nameA, undefined, {
            sensitivity: 'base',
          });
        }
  
        default:
          return 0;
      }
    });
  };
  

export const filterAndSortWorkflows = (
  workflows: Workflow[],
  query: string,
  sortOption: SortOption
): Workflow[] => {
  const filtered = filterWorkflows(workflows, query);
  return sortWorkflows(filtered, sortOption);
};
