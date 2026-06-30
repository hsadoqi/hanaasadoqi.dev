import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { MermaidDiagram } from './mermaid-diagram';
import { cn } from '@/lib/utils';

type CodeBlockProps = {
  children: ReactNode;
  className?: string;
  filename?: string;
  language?: string;
};

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }

  if (node && typeof node === 'object' && 'props' in node) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return getTextContent(element.props.children);
  }

  return '';
}

function getLanguage(className?: string) {
  return className?.match(/language-([\w-]+)/)?.[1];
}

export function CodeBlock({
  children,
  className,
  filename,
  language,
}: CodeBlockProps) {
  const resolvedLanguage = language ?? getLanguage(className);
  const code = getTextContent(children).replace(/\n$/, '');

  if (resolvedLanguage === 'mermaid') {
    return <MermaidDiagram chart={code} title={filename} />;
  }

  return (
    <figure className="border-border/40 bg-background/70 my-8 overflow-hidden rounded-lg border">
      {(filename || resolvedLanguage) && (
        <figcaption className="border-border/30 bg-muted/20 flex items-center justify-between gap-3 border-b px-4 py-2">
          <span className="type-caption font-medium">
            {filename ?? resolvedLanguage}
          </span>
          {filename && resolvedLanguage && (
            <span className="type-caption text-muted-foreground">
              {resolvedLanguage}
            </span>
          )}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code className={cn(className, 'font-mono')}>{code}</code>
      </pre>
    </figure>
  );
}

export function Pre(props: ComponentProps<'pre'>) {
  const child = props.children;

  if (
    child &&
    typeof child === 'object' &&
    'props' in child &&
    (child as ReactElement).type === 'code'
  ) {
    const codeElement = child as ReactElement<
      ComponentProps<'code'> & { filename?: string }
    >;

    return (
      <CodeBlock
        className={codeElement.props.className}
        filename={codeElement.props.filename}
      >
        {codeElement.props.children}
      </CodeBlock>
    );
  }

  return <pre {...props} />;
}
