'use client';

import { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';
import { cn } from '@/lib/utils';

type MermaidDiagramProps = {
  chart: string;
  title?: string;
  caption?: string;
  className?: string;
};

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'base',
  themeVariables: {
    background: '#ffffff',
    primaryColor: '#f8fafc',
    primaryTextColor: '#111827',
    primaryBorderColor: '#94a3b8',
    lineColor: '#64748b',
    secondaryColor: '#f1f5f9',
    tertiaryColor: '#ffffff',
    fontFamily: 'inherit',
  },
});

export function MermaidDiagram({
  caption,
  chart,
  className,
  title,
}: MermaidDiagramProps) {
  const id = useId().replace(/:/g, '');
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      try {
        setError(null);
        const result = await mermaid.render(`mermaid-${id}`, chart);
        if (isMounted) setSvg(result.svg);
      } catch (renderError) {
        if (!isMounted) return;
        setSvg(null);
        setError(
          renderError instanceof Error
            ? renderError.message
            : 'Unable to render diagram.',
        );
      }
    }

    void renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  return (
    <figure
      className={cn(
        'border-border/40 bg-background/60 my-8 overflow-hidden rounded-lg border',
        className,
      )}
    >
      {title && (
        <figcaption className="type-caption border-border/30 border-b px-4 py-3 font-medium">
          {title}
        </figcaption>
      )}
      <div className="overflow-x-auto p-4">
        {svg ? (
          <div
            className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : error ? (
          <pre className="text-destructive text-sm whitespace-pre-wrap">
            {error}
          </pre>
        ) : (
          <div className="text-muted-foreground type-caption py-8 text-center">
            Rendering diagram...
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="type-caption border-border/30 border-t px-4 py-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
