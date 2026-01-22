import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Select, Button, SearchInput } from '../../../shared/components';
import { SORT_OPTIONS, type SortOption } from '../types';

const SORT_OPTIONS_LIST = [
  { value: SORT_OPTIONS.LAST_UPDATED_DESC, label: 'Last Updated (Newest)' },
  { value: SORT_OPTIONS.LAST_UPDATED_ASC, label: 'Last Updated (Oldest)' },
  { value: SORT_OPTIONS.NAME_ASC, label: 'Name (A-Z)' },
  { value: SORT_OPTIONS.NAME_DESC, label: 'Name (Z-A)' },
];

interface WorkflowsToolbarProps {
  searchQuery: string;
  sortOption: SortOption;
  onSearch: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  onMobileMenuToggle?: () => void;
}

export const Toolbar = ({
  searchQuery,
  sortOption,
  onSearch,
  onSortChange,
  onMobileMenuToggle,
}: WorkflowsToolbarProps) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  return (
    <div className="sticky top-0 z-30 bg-white border-b-0.5 border-border-primary px-4 py-4 md:px-5 md:py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="flex items-center gap-3 flex-1">
          <Button
            className="md:hidden -ml-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={onMobileMenuToggle}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <h1 className="font-bold text-title text-black">Workflows</h1>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select
            value={sortOption}
            onChange={(value) => onSortChange(value as SortOption)}
            placeholder="Sort"
            className="h-8 w-auto md:min-w-[65px] px-2 md:px-3 py-0 border-0.5 border-border-primary focus:ring-0 focus:ring-offset-0"
            options={SORT_OPTIONS_LIST}
          />

          <SearchInput
            placeholder="Search workflows"
            value={localSearch}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};
