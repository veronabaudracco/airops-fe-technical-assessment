import { Search } from "lucide-react"

export interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  return (
    <div className="relative flex items-center h-8 px-3 py-1.5 gap-2 bg-white border border-[rgba(0,0,0,0.16)] rounded-md shadow-sm flex-1 md:flex-initial">
      <Search className="w-4 h-4 text-black flex-shrink-0" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-0 bg-transparent outline-none font-normal text-sm text-[#09090B] placeholder:text-gray-400 w-full md:w-[146px] [&::-webkit-search-cancel-button]:cursor-pointer"
      />
    </div>
  )
}
