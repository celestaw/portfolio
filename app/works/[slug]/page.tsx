import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.filter((p) => p.featured).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} — 渡邉 拓真` : "Not Found" };
}

function Section({
  ja,
  en,
  children,
}: {
  ja: string;
  en: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-slate-200 py-7">
      <div className="mb-3">
        <h2 className="text-base font-semibold text-slate-900">{ja}</h2>
        <span className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
          {en}
        </span>
      </div>
      {children}
    </section>
  );
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.featured) notFound();

  return (
    <main className="mx-auto max-w-prose2 px-6 py-12">
      <nav className="mb-8">
        <Link
          href="/#works"
          className="text-sm text-slate-500 hover:text-accent"
        >
          ← 制作実績一覧へ戻る
        </Link>
      </nav>

      <header className="pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="font-medium text-accent">{p.role}</span>
          <span>{p.period}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{p.title}</h1>
        <p className="mt-3 text-slate-600">{p.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-sm border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600"
            >
              {s}
            </span>
          ))}
        </div>

        {p.links && p.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {p.links.map((l) =>
              l.href === "#" ? (
                <span
                  key={l.label}
                  aria-disabled="true"
                  className="cursor-default rounded-md border border-dashed border-slate-200 px-3 py-1.5 text-sm text-slate-400"
                >
                  {l.label}
                </span>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-accent hover:border-accent"
                >
                  {l.label}
                </a>
              )
            )}
          </div>
        )}
      </header>

      {p.media && p.media.length > 0 && (
        <div className="mb-2 space-y-4">
          {p.media.map((m, i) => (
            <figure
              key={i}
              className="overflow-hidden rounded-md border border-slate-200"
            >
              {m.type === "image" ? (
                <div className="relative aspect-video bg-slate-100">
                  <Image
                    src={m.src}
                    alt={m.caption ?? p.title}
                    fill
                    sizes="(max-width: 720px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-black">
                  <video src={m.src} controls className="h-full w-full" />
                </div>
              )}
              {m.caption && (
                <figcaption className="px-4 py-2 text-xs text-slate-500">
                  {m.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {p.overview && (
        <Section ja="概要" en="Overview">
          {p.overview.map((t, i) => (
            <p key={i} className="mb-3 leading-relaxed text-slate-700">
              {t}
            </p>
          ))}
        </Section>
      )}

      {p.motivation && (
        <Section ja="動機" en="Motivation">
          {p.motivation.map((t, i) => (
            <p key={i} className="mb-3 leading-relaxed text-slate-700">
              {t}
            </p>
          ))}
        </Section>
      )}

      {p.system && (
        <Section ja="システム / 技術構成" en="System">
          {p.system.map((t, i) => (
            <p key={i} className="mb-3 leading-relaxed text-slate-700">
              {t}
            </p>
          ))}
        </Section>
      )}

      {p.contribution && (
        <Section ja="担当" en="Contribution">
          {p.contribution.map((t, i) => (
            <p key={i} className="mb-3 leading-relaxed text-slate-700">
              {t}
            </p>
          ))}
        </Section>
      )}

      {p.limits && (
        <Section ja="制約・課題" en="Limitations">
          {p.limits.map((t, i) => (
            <p key={i} className="mb-3 leading-relaxed text-slate-600">
              {t}
            </p>
          ))}
        </Section>
      )}

      <div className="border-t border-slate-200 pt-7">
        <Link href="/#works" className="text-sm text-accent hover:underline">
          ← 一覧に戻る
        </Link>
      </div>
    </main>
  );
}
