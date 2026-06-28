import { LinkButton } from '@/components/shared';

export const HeroCta = ({ cta }: { cta: string }) => {
  return (
    <LinkButton
      variant="link"
      href="#case-studies"
      className="group hover:text-brand/80 transition-colors hover:no-underline"
    >
      <span className="group-hover:text-brand inline-block transition-[color,transform] duration-300 ease-in-out group-hover:translate-y-0.5">
        ↓
      </span>
      {cta}
    </LinkButton>
  );
};

export default HeroCta;
