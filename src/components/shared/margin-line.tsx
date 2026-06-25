export const MarginLine = ({ text }: { text?: string }) => {
  return (
    <div className="group hidden flex-col items-center justify-end gap-6 self-stretch pb-2 md:flex">
      <div className="bg-brand group-hover:bg-foreground w-px flex-1 transition-colors" />
      {text && (
        <p
          className="text-muted-foreground group-hover:text-brand font-sans text-xs tracking-widest uppercase transition-colors"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {text}
        </p>
      )}
    </div>
  );
};
