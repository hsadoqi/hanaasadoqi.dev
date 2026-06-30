import React from 'react';

type DefinitionItemProps = {
  label: string;
  value: string | React.ReactNode;
};

export default function DefinitionItem({ label, value }: DefinitionItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="type-eyebrow text-[10px]">{label}</dt>
      <dd className="type-caption mt-1">{value}</dd>
    </div>
  );
}

export { DefinitionItem };
