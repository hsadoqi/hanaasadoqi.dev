import React from 'react';

type DefinitionItemProps = {
  label: string;
  value: string | React.ReactNode;
};

export default function DefinitionItem({ label, value }: DefinitionItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-muted-foreground/50 text-[10px] font-semibold tracking-[0.14em] uppercase">
        {label}
      </dt>
      <dd className="text-muted-foreground mt-1 text-xs leading-relaxed">
        {value}
      </dd>
    </div>
  );
}

export { DefinitionItem };
