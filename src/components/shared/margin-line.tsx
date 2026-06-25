export const MarginLine = ({ text }: { text?: string }) => {
  return (
    <div className="hidden md:flex flex-col items-center gap-6 pb-2 self-stretch justify-end group">
      <div className="flex-1 w-px bg-brand group-hover:bg-foreground transition-colors" />
     {text && (
        <p
          className="font-sans text-xs text-muted-foreground tracking-widest uppercase group-hover:text-brand transition-colors"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {text}
        </p>
      )}
    </div>
  )
}