export interface CalloutNoteProps {
  children: React.ReactNode;
  type?: 'note' | 'warning' | 'discovery';
}

export function CalloutNote({ children, type = 'note' }: CalloutNoteProps) {
  const styles = {
    note: 'border-border/40 bg-muted/20',
    warning: 'border-amber-500/30 bg-amber-500/5',
    discovery: 'border-blue-500/30 bg-blue-500/5',
  };

  return (
    <div className={`border-l-2 ${styles[type]} my-6 rounded-r px-4 py-3`}>
      <p className="type-body-sm">{children}</p>
    </div>
  );
}
