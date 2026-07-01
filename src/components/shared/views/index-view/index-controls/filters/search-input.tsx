import { Label } from '@/components/ui/label';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

type SearchFormProps = React.ComponentProps<'form'> & {
  inputWrapperClassName?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
};

export function SearchForm({
  onChange,
  placeholder = 'Search...',
  value,
  className,
  inputWrapperClassName,
  ...props
}: SearchFormProps) {
  return (
    <form className={cn('w-full', className)} {...props}>
      <SidebarGroup className="p-0">
        <SidebarGroupContent
          className={cn('relative ml-auto h-9 w-full', inputWrapperClassName)}
        >
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>

          <SidebarInput
            id="search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="h-9 w-full pl-8"
          />

          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
