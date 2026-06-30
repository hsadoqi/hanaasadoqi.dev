import { LinkButton } from '@/components/shared';
import { ArtifactLink } from '@/types';
import { artifactConfig } from './artifact-config';

type ArtifactLinkButtonProps = {
  artifact: ArtifactLink;
};

export function ArtifactLinkButton({ artifact }: ArtifactLinkButtonProps) {
  const config = artifactConfig[artifact.type];

  const Icon = config.icon;

  return (
    <LinkButton
      href={artifact.href}
      variant={artifact.featured ? 'default' : 'outline'}
      iconLeft={<Icon className="size-4" />}
      external
    >
      {artifact.label ?? config.label}
    </LinkButton>
  );
}
