import { ArtifactLink } from '@/types';
import { ArtifactLinkButton } from './artifact-link-button';

type ArtifactLinksProps = {
  artifacts: ArtifactLink[];
};

export function ArtifactLinks({ artifacts }: ArtifactLinksProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {artifacts.map((artifact) => (
        <ArtifactLinkButton
          key={`${artifact.type}-${artifact.href}`}
          artifact={artifact}
        />
      ))}
    </div>
  );
}
