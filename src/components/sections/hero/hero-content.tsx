export const HeroContent = ({ headlineParts, identities }: { headlineParts: string[]; identities: string[] }) => {
  return (
    <>
      <h1 id="hero-heading" className="font-sans text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight">
        {headlineParts.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>

      <div className="space-y-1">
        {identities.map((line, i) => (
          <p key={i} className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase">
            {line}
          </p>
        ))}
      </div>
    </>
  )
}

export default HeroContent