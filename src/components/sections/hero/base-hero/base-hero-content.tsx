export const BaseHeroContent = ({
  headlineParts,
  identities,
}: {
  headlineParts: string[];
  identities: string[];
}) => {
  return (
    <>
      <h1 id="hero-heading" className="type-page-title">
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
            className="type-eyebrow hover:text-foreground transition-colors"
          >
            {line}
          </p>
        ))}
      </div>
    </>
  );
};

export default BaseHeroContent;
