import {
  Hero,
  AboutSection,
  ContactSection,
  ExperienceSection,
  WritingSection,
} from '@/components/sections';
import { ProjectsSection } from '@/features/projects/components/homepage/featured-work-section';

const greeting = "Hi, I'm Hanaa. 👋";
const headlineParts = ['Software engineer', 'with too many', 'side quests.'];
const identities = [
  'Recovering mechanical engineer.',
  'Professional overthinker.',
  'Resigned Insomniac.',
];
const cta = 'View Projects';
export default function Home() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col gap-16 overflow-x-hidden"
    >
      <div className="from-background/50 to-background/0 absolute inset-0 -z-10 bg-linear-to-b" />
      <Hero
        greeting={greeting}
        headlineParts={headlineParts}
        identities={identities}
        cta={cta}
      />
      {/* Subtle transition marker between hero and the rest of the site */}
      <div className="flex items-center justify-center" aria-hidden="true">
        <span className="bg-border/60 h-px w-16" />
        <span className="bg-brand/60 mx-2 h-1 w-1 rounded-full" />
        <span className="bg-border/60 h-px w-16" />
      </div>
      <ProjectsSection />
      <WritingSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
