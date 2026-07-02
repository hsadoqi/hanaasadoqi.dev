import { Label } from '@/components/ui/label';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

type SearchFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'onChange'> & {
  inputWrapperClassName?: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  query: string;
};

export function SearchForm({
  onQueryChange,
  placeholder = 'Search...',
  query,
  className,
  inputWrapperClassName,
  ...formProps
}: SearchFormProps) {
  return (
    <form className={cn('w-full', className)} {...formProps}>
      <SidebarGroup className="p-0">
        <SidebarGroupContent
          className={cn('relative ml-auto h-9 w-full', inputWrapperClassName)}
        >
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>

          <SidebarInput
            id="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={placeholder}
            className="h-9 w-full pl-8"
          />

          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none"
          />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
