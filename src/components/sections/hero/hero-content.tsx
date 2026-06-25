export const HeroContent = ({
  headlineParts,
  identities,
}: {
  headlineParts: string[];
  identities: string[];
}) => {
  return (
    <>
      <h1
        id="hero-heading"
        className="text-foreground font-sans text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
      >
        {headlineParts.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>

      <div className="space-y-1">
        {identities.map((line, i) => (
          <p
            key={i}
            className="text-muted-foreground hover:text-foreground font-sans text-sm tracking-widest uppercase transition-colors"
          >
            {line}
          </p>
        ))}
      </div>
    </>
  );
};

export default HeroContent;
