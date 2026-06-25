import { LinkButton } from "@/components/shared"

export const HeroCta = ({ cta }: { cta: string }) => {
  return (
              <LinkButton 
              variant="link"
              href="#projects" 
              className="group transition-colors hover:text-brand/80 hover:no-underline"
              >
                <span className="inline-block transition-[color,transform] ease-in-out duration-300 group-hover:translate-y-0.5 group-hover:text-brand">↓</span>
                {cta}
              </LinkButton>
  )
}

export default HeroCta