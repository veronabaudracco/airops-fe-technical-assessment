import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type SortingFn,
  type Header,
  type Cell,
} from '@tanstack/react-table';
import type { Workflow, SortOption, WorkflowType, Tag } from '../types/workflow';
import { WorkflowTags, ActionButtons, Skeleton } from '.';
import { getLastUpdatedLabel, parsePictographicText } from '../lib/utils';

interface WorkflowsTableProps {
  workflows: Workflow[];
  sortOption: SortOption;
  isLoading?: boolean;
  onEdit: (workflow: Workflow) => void;
  onDelete: (workflow: Workflow) => void;
}


const TypeCell = ({ type }: { type: WorkflowType }) => (
  <p className="text-xs font-normal text-text-grey-light">
    {type === 'workflow' ? 'Workflow' : 'Agent'}
  </p>
);

const NameCell = ({ name }: { name: string }) => {
  const { pictograph, text } = parsePictographicText(name);
  return (
    <div className="flex items-center gap-3">
      {pictograph && <span className="text-lg leading-none">{pictograph}</span>}
      <p className="text-sm font-medium text-system-black leading-5">{text}</p>
    </div>
  );
};

const TagsCell = ({ tags }: { tags: Tag[] }) => <WorkflowTags tags={tags} />;

const LastUpdatedCell = ({ timestamp }: { timestamp: number }) => (
  <p className="text-xs font-normal text-system-grey-500">
    {getLastUpdatedLabel(timestamp)}
  </p>
);

const ActionsCellWrapper = ({ onEdit, onDelete }: {
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div className="flex items-center justify-center">
    <ActionButtons onEdit={onEdit} onDelete={onDelete} />
  </div>
);

const TableSkeletonRow = () => (
  <tr>
    <td className="h-16 p-4 border-b border-system-black-8">
      <Skeleton className="h-5 w-16" />
    </td>
    <td className="h-16 px-2 py-4 border-b border-system-black-8">
      <div className="flex items-center gap-3">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="h-5 w-40" />
      </div>
    </td>
    <td className="h-16 p-4 border-b border-system-black-8">
      <Skeleton className="h-[30px] w-20 rounded-full" />
    </td>
    <td className="h-16 p-4 border-b border-system-black-8 hidden lg:table-cell">
      <Skeleton className="h-5 w-24" />
    </td>
    <td className="h-16 p-4 border-b border-system-black-8">
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="w-6 h-6" />
        <Skeleton className="w-6 h-6" />
      </div>
    </td>
  </tr>
);

const nameSortingFn: SortingFn<Workflow> = (rowA, rowB) => {
  const a = parsePictographicText(rowA.original.name).text.toLowerCase();
  const b = parsePictographicText(rowB.original.name).text.toLowerCase();
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
};

const mapSortOptionToSortingState = (sortOption: SortOption): SortingState => {
  const sortMap: Record<SortOption, SortingState> = {
    'lastUpdated-desc': [{ id: 'lastUpdated', desc: true }],
    'lastUpdated-asc': [{ id: 'lastUpdated', desc: false }],
    'name-asc': [{ id: 'name', desc: false }],
    'name-desc': [{ id: 'name', desc: true }],
  };
  return sortMap[sortOption] || [];
};

const getHeaderClassName = (header: Header<Workflow, unknown>, index: number) => {
  const baseClasses = 'h-14 text-left text-sm font-semibold text-system-black border-b border-system-black-8';
  const paddingClass = index === 1 ? 'px-2 py-4' : 'p-4';
  const widthClass = header.column.id === 'name' ? 'w-1/2' : '';
  const hiddenClass = header.column.id === 'lastUpdated' ? 'hidden lg:table-cell' : '';
  const alignClass = header.column.id === 'actions' ? 'text-center' : '';
  
  return `${baseClasses} ${paddingClass} ${widthClass} ${hiddenClass} ${alignClass}`.trim();
};

const getCellClassName = (cell: Cell<Workflow, unknown>, index: number) => {
  const baseClasses = 'h-16 border-b border-system-black-8 align-middle';
  const paddingClass = index === 1 ? 'px-2 py-4' : 'p-4';
  const widthClass = cell.column.id === 'name' ? 'w-1/2' : '';
  const hiddenClass = cell.column.id === 'lastUpdated' ? 'hidden lg:table-cell' : '';
  
  return `${baseClasses} ${paddingClass} ${widthClass} ${hiddenClass}`.trim();
};


const columnHelper = createColumnHelper<Workflow>();

export const WorkflowsTable = ({
  workflows,
  sortOption,
  isLoading = false,
  onEdit,
  onDelete,
}: WorkflowsTableProps) => {
  const sorting = useMemo(() => mapSortOptionToSortingState(sortOption), [sortOption]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('type', {
        id: 'type',
        header: 'Type',
        cell: ({ getValue }) => <TypeCell type={getValue()} />,
        enableSorting: false,
      }),
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
        cell: ({ getValue }) => <NameCell name={getValue()} />,
        enableSorting: true,
        sortingFn: nameSortingFn,
      }),
      columnHelper.accessor('tags', {
        id: 'tags',
        header: 'Tags',
        cell: ({ getValue }) => <TagsCell tags={getValue()} />,
        enableSorting: false,
      }),
      columnHelper.accessor('lastUpdated', {
        id: 'lastUpdated',
        header: 'Last Updated',
        cell: ({ getValue }) => <LastUpdatedCell timestamp={getValue()} />,
        enableSorting: true,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <ActionsCellWrapper
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
          />
        ),
      }),
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data: workflows,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th key={header.id} className={getHeaderClassName(header, index)}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {isLoading ? (
            <>
              {Array.from({ length: 12 }).map((_, i) => (
                <TableSkeletonRow key={i} />
              ))}
            </>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell, index) => (
                  <td key={cell.id} className={getCellClassName(cell, index)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
