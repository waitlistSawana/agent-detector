import {
  ArrowUpRight,
  CheckCircle2,
  Fingerprint,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const valuePillars = [
  {
    title: "Explainable detection",
    description:
      "Turn abstract scores into clear fixes so you know exactly what reads as AI.",
  },
  {
    title: "Goal-driven rewrites",
    description:
      "Rewrite for audience, tone, and brand consistency—not random synonym swaps.",
  },
  {
    title: "Style as an asset",
    description:
      "Feedback turns your writing style into a reusable asset that improves over time.",
  },
];

const modules = [
  {
    icon: ShieldCheck,
    title: "AI Content Detector",
    subtitle: "Risk detection + explainability",
    description:
      "Surface risk levels, explanation tags, and actionable advice that drives rewrites.",
    bullets: [
      "Over-structured phrasing",
      "Unnatural tone",
      "Template-like sentences",
      "Repetitive rhythm",
    ],
  },
  {
    icon: Sparkles,
    title: "Humanizer Rewrites",
    subtitle: "More conversational / more professional / more personal",
    description:
      "Use detection outputs to rewrite while preserving structure and intent.",
    bullets: [
      "Before/after diff",
      "Fix explanations",
      "Tone consistency",
      "Controlled goals",
    ],
  },
  {
    icon: Fingerprint,
    title: "Personal Agent Training",
    subtitle: "Style retention + gradual alignment",
    description:
      "Feedback and preferences converge on your style until it becomes a durable asset.",
    bullets: [
      "Preference capture",
      "Style convergence",
      "Reusable output",
      "Less rework",
    ],
  },
];

const journey = [
  {
    title: "Discovery",
    detail:
      "Landing pages, examples, and proof make the loop clear: detect + rewrite + train.",
  },
  {
    title: "First detection",
    detail: "Clear explanation tags show exactly what needs work.",
  },
  {
    title: "One-click humanization",
    detail: "Side-by-side comparisons prove the output feels more authentic.",
  },
  {
    title: "Preference feedback",
    detail: "Likes, dislikes, and tone choices steer the model toward you.",
  },
  {
    title: "Reuse & reliance",
    detail: "Stable output and higher speed make it part of the workflow.",
  },
];

const riskSignals = [
  "Over-structured phrasing",
  "Unnatural tone",
  "Template-like sentences",
  "Repetitive rhythm",
];
const rewriteTargets = [
  "More conversational",
  "More professional",
  "More personal",
];

type ContainerProps = ComponentProps<"div">;

function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}
      {...props}
    />
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left"
      )}
    >
      <Badge className="border-border/70 bg-background/70" variant="outline">
        {eyebrow}
      </Badge>
      <div className="space-y-3">
        <h2 className="font-[var(--font-display)] text-3xl leading-tight md:text-4xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.12]" />
      <div className="absolute -top-24 right-[-12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_var(--primary)_0%,_transparent_70%)] opacity-25 blur-3xl" />
      <div className="absolute bottom-[-18%] left-[-10%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_var(--foreground)_0%,_transparent_70%)] opacity-15 blur-3xl" />
      <div className="absolute top-[45%] right-0 left-0 h-28 bg-[linear-gradient(90deg,_transparent,_var(--primary)_40%,_transparent)] opacity-20 blur-2xl motion-safe:animate-scanline" />
    </div>
  );
}

function HeroPanel() {
  return (
    <Card className="relative overflow-hidden border-border/80 bg-card/80 backdrop-blur">
      <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-muted-foreground text-xs">
        <span className="h-2 w-2 rounded-full bg-primary" />
        Live analysis
      </div>
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg">Detection snapshot</CardTitle>
        <CardDescription>
          Risk explanations and rewrite cues appear together to remove
          guesswork.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-border/70 bg-background/80 p-4 text-muted-foreground text-sm leading-6">
          This passage feels overly structured. The cadence reads standard and
          lacks natural pauses.
          <span className="text-foreground">
            Add more personal rhythm and detail.
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {riskSignals.map((signal) => (
            <Badge className="text-xs" key={signal} variant="secondary">
              {signal}
            </Badge>
          ))}
        </div>
        <div className="rounded-xl border border-border/70 bg-muted/40 p-4 text-muted-foreground text-xs">
          <div className="flex items-center justify-between">
            <span>Risk level</span>
            <span className="text-foreground">Medium-high</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-secondary">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
          <div className="mt-3">
            Suggested direction: more conversational + more personal
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type ModuleCardProps = (typeof modules)[number];

function ModuleCard({
  icon: Icon,
  title,
  subtitle,
  description,
  bullets,
}: ModuleCardProps) {
  return (
    <Card className="border-border/80 bg-card/70">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-background">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-muted-foreground text-sm">
          {bullets.map((item) => (
            <li className="flex items-center gap-2" key={item}>
              <CheckCircle2 className="h-4 w-4 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function JourneyStep({
  index,
  title,
  detail,
}: {
  index: number;
  title: string;
  detail: string;
}) {
  return (
    <div className="relative flex gap-6">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-border/80 bg-background font-semibold text-sm">
        0{index}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm">{detail}</p>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
        href="#main"
      >
        Skip to main content
      </a>
      <div className="relative overflow-hidden">
        <BackgroundFX />
        <header className="relative z-10 border-border/60 border-b">
          <Container className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background font-semibold text-sm">
                AD
              </span>
              <div>
                <p className="font-semibold text-sm">Agent Detector</p>
                <p className="text-muted-foreground text-xs">
                  Trustworthy Output System
                </p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-muted-foreground text-sm md:flex">
              <Link className="hover:text-foreground" href="#modules">
                Modules
              </Link>
              <Link className="hover:text-foreground" href="#explain">
                Explainable detection
              </Link>
              <Link className="hover:text-foreground" href="#humanizer">
                Humanizer rewrites
              </Link>
              <Link className="hover:text-foreground" href="#agent">
                Personal training
              </Link>
            </nav>
            <Button asChild size="sm">
              <Link href="#cta">
                Request demo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Container>
        </header>

        <main className="relative z-10" id="main">
          <section className="pt-16 pb-20 md:pt-24 md:pb-28">
            <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-8">
                <Badge className="w-fit gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Trustworthy Output System
                </Badge>
                <div className="space-y-6">
                  <h1 className="font-[var(--font-display)] text-4xl leading-tight md:text-6xl">
                    Detect AI traces, explain risk, and rewrite content to sound
                    like you.
                  </h1>
                  <p className="text-base text-muted-foreground md:text-lg">
                    Built for creators and small teams: detection, rewriting,
                    and personal training in one workflow to keep output
                    trustworthy, consistent, and measurable.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link href="#cta">
                      Start detection
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#humanizer">See rewrite example</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 text-muted-foreground text-xs">
                  <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                    Detect → Rewrite → Feedback
                  </span>
                  <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                    Built for brand content, education, and professional writing
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {valuePillars.map((pillar) => (
                    <Card
                      className="border-border/70 bg-card/60 px-5 py-4"
                      key={pillar.title}
                    >
                      <p className="font-semibold text-sm">{pillar.title}</p>
                      <p className="mt-2 text-muted-foreground text-xs">
                        {pillar.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
              <HeroPanel />
            </Container>
          </section>

          <section className="py-20 md:py-28" id="modules">
            <Container className="space-y-12">
              <SectionHeader
                description="v1 focuses on the core loop: explain → rewrite with goals → train personal style to reduce rework."
                eyebrow="Core modules"
                title="From explainable risk to real rewrites and lasting style"
              />
              <div className="grid gap-6 lg:grid-cols-3">
                {modules.map((module) => (
                  <ModuleCard key={module.title} {...module} />
                ))}
              </div>
            </Container>
          </section>

          <section className="py-20 md:py-28" id="explain">
            <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-6">
                <SectionHeader
                  description="Break abstract risk into concrete tags and guidance so you know exactly why it reads as AI."
                  eyebrow="Explainable detection"
                  title="Not just a score—clear reasons and fixes"
                />
                <div className="space-y-4 text-muted-foreground text-sm">
                  <p>
                    Detection outputs include risk level, explanation tags, and
                    rewrite cues that feed the next step.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {riskSignals.map((signal) => (
                      <Badge key={signal} variant="outline">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Card className="border-border/80 bg-card/70">
                <CardHeader>
                  <CardTitle className="text-lg">Explanation panel</CardTitle>
                  <CardDescription>
                    Translate abstract scores into concrete editing moves.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-sm">
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/70 px-4 py-3">
                    <span>Over-structured phrasing</span>
                    <span className="text-foreground">Too standardized</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/70 px-4 py-3">
                    <span>Unnatural tone</span>
                    <span className="text-foreground">
                      Lacks personal voice
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/70 px-4 py-3">
                    <span>Repetitive rhythm</span>
                    <span className="text-foreground">
                      Sentence pattern repeats
                    </span>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-muted/40 p-4 text-xs">
                    Prioritize tone first, then adjust rhythm for credibility.
                  </div>
                </CardContent>
              </Card>
            </Container>
          </section>

          <section className="py-20 md:py-28" id="humanizer">
            <Container className="space-y-12">
              <SectionHeader
                description="Use detection insights to rewrite without losing structure or intent."
                eyebrow="Humanizer rewrites"
                title="Controlled rewrites that feel like you"
              />
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/70 bg-card/60">
                  <CardHeader>
                    <CardTitle className="text-base">Before</CardTitle>
                    <CardDescription>
                      Structured but lacking voice.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">
                    We completed the initial analysis and gathered insights for
                    rewriting. The current phrasing reads too standardized and
                    needs refinement.
                  </CardContent>
                </Card>
                <Card className="border-primary/40 bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-base">After</CardTitle>
                    <CardDescription>
                      More natural, more personal.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground text-sm">
                    The initial analysis is complete and the edits are clear.
                    Now the core idea reads naturally, as if written by a real
                    person.
                    <div className="flex flex-wrap gap-2">
                      {rewriteTargets.map((target) => (
                        <Badge key={target} variant="secondary">
                          {target}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Container>
          </section>

          <section className="py-20 md:py-28" id="agent">
            <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-6">
                <SectionHeader
                  description="Feedback and preferences accumulate so each rewrite moves closer to your voice."
                  eyebrow="Personal agent training"
                  title="Turn one-off edits into a lasting style asset"
                />
                <div className="space-y-4">
                  {journey.map((item, index) => (
                    <JourneyStep
                      detail={item.detail}
                      index={index + 1}
                      key={item.title}
                      title={item.title}
                    />
                  ))}
                </div>
              </div>
              <Card className="border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle className="text-lg">Style training loop</CardTitle>
                  <CardDescription>
                    Lightweight feedback, steady alignment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-sm">
                  <div className="space-y-2">
                    <p className="text-foreground">
                      Feedback becomes training data instead of a one-off step.
                    </p>
                    <p>
                      Each rewrite builds preference signals so the next output
                      is more consistent and more you.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/70 p-4 text-xs">
                    Future rewrites stay closer to your voice and reduce team
                    drift.
                  </div>
                </CardContent>
              </Card>
            </Container>
          </section>

          <section className="py-20 md:py-28" id="cta">
            <Container>
              <Card className="relative overflow-hidden border-border/70 bg-card/80 px-8 py-12">
                <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,_var(--primary)_0%,_transparent_70%)] opacity-25 blur-2xl" />
                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">Ready to start</Badge>
                    <span className="text-muted-foreground text-sm">
                      Experience the detect → rewrite → feedback loop fast
                    </span>
                  </div>
                  <h2 className="font-[var(--font-display)] text-3xl md:text-4xl">
                    Make your content trustworthy and unmistakably
                    yours—starting now.
                  </h2>
                  <p className="max-w-2xl text-muted-foreground text-sm md:text-base">
                    Designed for creators and small teams to reduce trial and
                    rework.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg">
                      <Link href="#cta">
                        Join the preview
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="#modules">Explore the modules</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>

        <footer className="relative z-10 border-border/60 border-t py-10">
          <Container className="flex flex-col gap-4 text-muted-foreground text-sm md:flex-row md:items-center md:justify-between">
            <span>© 2026 Agent Detector · Trustworthy Output System</span>
            <div className="flex flex-wrap gap-4">
              <Link className="hover:text-foreground" href="#modules">
                Modules
              </Link>
              <Link className="hover:text-foreground" href="#humanizer">
                Rewrite example
              </Link>
              <Link className="hover:text-foreground" href="#cta">
                Request demo
              </Link>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}
