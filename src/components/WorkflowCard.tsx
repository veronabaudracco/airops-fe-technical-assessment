import type { Workflow } from '../types/workflow';
import { ActionButtons,WorkflowTags } from '.';
import { getLastUpdatedLabel, parsePictographicText } from '../lib/utils';

interface WorkflowCardProps {
  workflow: Workflow;
}

export const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  const { pictograph, text } = parsePictographicText(workflow.name);

  return (
    <div className="bg-white border border-[rgba(9,9,11,0.08)] rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {pictograph && <span className="text-lg leading-none flex-shrink-0">{pictograph}</span>}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-[#09090B] truncate">
              {text}
            </h3>
            <p className="text-xs font-normal text-[#868686] mt-0.5">
              {workflow.type === 'workflow' ? 'Workflow' : 'Agent'}
            </p>
          </div>
        </div>
        <ActionButtons />
      </div>

      {workflow.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          <WorkflowTags tags={workflow.tags} />
        </div>
      )}

      <div className="text-xs font-normal text-[#808593]">
        Updated {getLastUpdatedLabel(workflow.lastUpdated)}
      </div>
    </div>
  );
};
