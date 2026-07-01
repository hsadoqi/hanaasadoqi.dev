type SortSelectProps<TSortId extends string> = {
  onChange: (sortId: TSortId) => void;
  options: Array<{
    id: TSortId;
    label: string;
  }>;
  value: TSortId;
};

export function SortSelect<TSortId extends string>({
  onChange,
  options,
  value,
}: SortSelectProps<TSortId>) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as TSortId)}
      className="border-border/40 bg-background/50 text-foreground focus:ring-accent/50 rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none motion-safe:transition-all"
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
