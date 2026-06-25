import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Section, SectionHeader } from '@/components/layout/section';
import { Container } from '@/components/shared/container';
import { Hero } from '@/components/sections/hero/hero';

const greeting = "Hi, I'm Hanaa. 👋";
const headlineParts = ['Software engineer', 'with too many', 'side quests.'];
const identities = [
  'Recovering mechanical engineer.',
  'Professional overthinker.',
  'Insomniac.',
];
const cta = 'View Projects';
export default function Home() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col gap-16 overflow-x-hidden"
    >
      <div className="from-background/50 to-background/0 absolute inset-0 -z-10 bg-gradient-to-b" />
      <Hero
        greeting={greeting}
        headlineParts={headlineParts}
        identities={identities}
        cta={cta}
      />
      {/* Projects */}
      <Section id="projects">
        <Container>
          <SectionHeader
            eyebrow="Selected work"
            title="Projects"
            description="Workflow-heavy products, internal tools, and systems still being shaped."
            className="mb-12"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(['Active', 'Draft', 'Planned'] as const).map((status) => (
              <Card key={status}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle>Project title</CardTitle>
                    <Badge
                      variant={
                        status === 'Active'
                          ? 'default'
                          : status === 'Draft'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {status}
                    </Badge>
                  </div>
                  <CardDescription>
                    A short description of what this project does and the
                    problem it solves.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {['TypeScript', 'Next.js', 'Postgres'].map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    View →
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Writing */}
      <Section id="writing" variant="surface">
        <Container>
          <SectionHeader
            eyebrow="Writing"
            title="Notes & essays"
            description="On product thinking, engineering practice, and working with complexity."
            className="mb-12"
          />
          <div className="space-y-4">
            {[
              'On building for operators, not just users',
              'Why audit trails are a design problem',
              'The underrated value of boring software',
            ].map((title) => (
              <Card key={title} size="sm">
                <CardHeader className="flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>June 2026 · 6 min read</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    Read →
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Component tokens preview */}
      <Section id="design-tokens">
        <Container>
          <SectionHeader
            eyebrow="Design system"
            title="Tokens & primitives"
            description="Verify semantic colors, typography, and components render correctly in both themes."
            className="mb-12"
          />
          <div className="space-y-8">
            {/* Buttons */}
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                Buttons
              </p>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                Badges
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                Typography
              </p>
              <div className="space-y-2">
                <p className="text-foreground text-4xl font-bold tracking-tight">
                  Page title
                </p>
                <p className="text-foreground text-2xl font-semibold tracking-tight">
                  Section title
                </p>
                <p className="text-foreground text-lg font-medium">
                  Card title
                </p>
                <p className="text-foreground text-base">Body text</p>
                <p className="text-muted-foreground text-sm">
                  Muted / supporting text
                </p>
                <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
                  Label / eyebrow
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
