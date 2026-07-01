import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  Hero,
  WritingSection,
} from '@/components/sections';
import { ProjectsSection } from '@/features/projects/components/homepage/featured-work-section';

const greeting = "Hi, I'm Hanaa. 👋";
const headlineParts = [
  { text: 'Software engineer', mobileLines: ['Software', 'engineer'] },
  { text: 'on too many' },
  { text: 'side quests.', highlight: true },
];
const supportingLine =
  "I like building solutions for the kinds of problems people shouldn't have to think about.";

const cta = 'View Projects';
export default function Home() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col gap-16 overflow-x-hidden sm:gap-20 lg:gap-24"
    >
      <div className="from-background/50 to-background/0 absolute inset-0 -z-10 bg-linear-to-b" />
      <Hero
        greeting={greeting}
        headlineParts={headlineParts}
        supportingLine={supportingLine}
        cta={cta}
      />
      <div
        className="-mb-8 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="bg-border/60 h-px w-16" />
        <span className="bg-brand/60 mx-2 h-1 w-1 rounded-full" />
        <span className="bg-border/60 h-px w-16" />
      </div>
      <ProjectsSection />
      <AboutSection />
      <WritingSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
