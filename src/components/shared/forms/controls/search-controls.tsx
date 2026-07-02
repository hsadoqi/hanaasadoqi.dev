import { SearchForm } from '../search/search-form';

type SearchControlsProps = {
  onQueryChange: (query: string) => void;
  query: string;
  searchPlaceholder: string;
};

export function SearchControls({
  onQueryChange,
  query,
  searchPlaceholder,
}: SearchControlsProps) {
  return (
    <div className="flex flex-col gap-2">
      <SearchForm
        className="w-full"
        query={query}
        onQueryChange={onQueryChange}
        placeholder={searchPlaceholder}
        inputWrapperClassName="sm:max-w-md"
      />
    </div>
  );
}
