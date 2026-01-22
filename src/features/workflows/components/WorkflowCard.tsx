import type { Workflow } from '../types';
import { ActionButtons, WorkflowTags } from './';
import { getLastUpdatedLabel, parsePictographicText } from '../utils';

interface WorkflowCardProps {
  workflow: Workflow;
  onEdit: () => void;
  onDelete: () => void;
}

export const WorkflowCard = ({ workflow, onEdit, onDelete }: WorkflowCardProps) => {
  const { pictograph, text } = parsePictographicText(workflow.name);

  return (
    <div className="bg-white border border-system-black-8 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {pictograph && <span className="text-lg leading-none flex-shrink-0">{pictograph}</span>}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-system-black truncate">
              {text}
            </h3>
            <p className="text-xs font-normal text-text-grey-light mt-0.5">
              {workflow.type === 'workflow' ? 'Workflow' : 'Agent'}
            </p>
          </div>
        </div>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </div>

      {workflow.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          <WorkflowTags tags={workflow.tags} />
        </div>
      )}

      <div className="text-xs font-normal text-system-grey-500">
        Updated {getLastUpdatedLabel(workflow.lastUpdated)}
      </div>
    </div>
  );
};
