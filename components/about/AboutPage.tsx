import Image from 'next/image'
import { Code2, ExternalLink, History, Mail, MapPin } from 'lucide-react'
import Comments from '@/components/Comments'
import ScrollReveal from '@/components/ScrollReveal'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { profile } from '@/data/profile'

const skillGroups = [
  { title: 'Languages', items: profile.skills.languages },
  { title: 'Frontend', items: profile.skills.frontend },
  { title: 'Content', items: profile.skills.content },
  { title: 'Deployment', items: profile.skills.deployment },
]

function SectionTitle({
  icon: Icon,
  title,
  eyebrow,
}: {
  icon: typeof Code2
  title: string
  eyebrow: string
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-widest text-gray-500 uppercase dark:text-gray-400">
          <Icon className="size-3.5" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-normal text-gray-950 dark:text-gray-50">
          {title}
        </h2>
      </div>
    </div>
  )
}

function ProfileHero() {
  return (
    <section className="grid gap-8 pt-10 pb-12 md:grid-cols-[1fr_280px] md:items-end">
      <div className="max-w-3xl">
        <div className="mb-5 flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <Badge key={interest} variant="outline" className="h-6 rounded-md">
              {interest}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl leading-tight font-semibold tracking-normal text-gray-950 sm:text-5xl dark:text-gray-50">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">{profile.title}</p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-gray-700 dark:text-gray-300">
          {profile.intro}
        </p>
        <blockquote className="mt-8 border-l border-gray-300 pl-4 text-sm leading-7 text-gray-500 dark:border-gray-700 dark:text-gray-400">
          {profile.quote}
        </blockquote>
        <div className="mt-8 flex flex-wrap gap-3">
          {profile.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-900"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              {link.label}
            </a>
          ))}
          {profile.email ? (
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-900"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email
            </a>
          ) : null}
        </div>
      </div>
      <div className="justify-self-start md:justify-self-end">
        <div className="relative size-36 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image src={profile.avatar} alt="" fill className="object-cover" />
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="size-4" aria-hidden="true" />
          {profile.location}
        </p>
      </div>
    </section>
  )
}

function SkillMatrix() {
  return (
    <section className="py-10">
      <SectionTitle icon={Code2} eyebrow="Stack" title="Template stack" />
      <div className="grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 md:grid-cols-2 dark:border-gray-800 dark:bg-gray-800">
        {skillGroups.map((group) => (
          <div key={group.title} className="bg-white p-5 dark:bg-gray-950">
            <h3 className="mb-4 text-sm font-semibold text-gray-950 dark:text-gray-50">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} variant="secondary" className="h-6 rounded-md">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SiteHistory() {
  return (
    <section className="py-10">
      <SectionTitle icon={History} eyebrow="Guide" title="How to adapt this template" />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <ol className="space-y-4 border-l border-gray-200 pl-5 dark:border-gray-800">
          {profile.siteHistory.map((item) => (
            <li key={item} className="relative text-sm leading-7 text-gray-700 dark:text-gray-300">
              <span className="absolute top-2 -left-[25px] size-2 rounded-full bg-gray-950 dark:bg-gray-50" />
              {item}
            </li>
          ))}
        </ol>
        <div className="space-y-3">
          {profile.siteStackNotes.map((note) => (
            <div
              key={note.title}
              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
            >
              <h3 className="text-sm font-semibold text-gray-950 dark:text-gray-50">
                {note.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {note.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <ScrollReveal>
        <ProfileHero />
      </ScrollReveal>
      <Separator />
      <ScrollReveal delay={0.1}>
        <SkillMatrix />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <SiteHistory />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <section id="comment" className="py-10 text-center">
          <Comments slug="about" title="About" />
        </section>
      </ScrollReveal>
    </div>
  )
}
