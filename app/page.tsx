import { profile } from "@/data/profile";
import { featuredProjects, otherProjects } from "@/data/projects";
import { WorkCard } from "@/components/WorkCard";

function SectionTitle({ ja, en }: { ja: string; en: string }) {
  return (
    <div className="mb-6 border-b border-slate-200 pb-2">
      <h2 className="text-xl font-semibold text-slate-900">{ja}</h2>
      <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
        {en}
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10">
      {/* ---------------- HEADER ---------------- */}
      <header className="mb-14 max-w-4xl">
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-slate-400">
          Portfolio
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          {profile.nameJa}
          <span className="ml-3 text-lg font-normal text-slate-500">
            {profile.nameEn}
          </span>
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          {profile.affiliation}
          <br />
          {profile.lab}
        </p>
        <p className="mt-5 leading-relaxed text-slate-700">{profile.summary}</p>

        <div className="mt-5 flex flex-wrap gap-4">
          {profile.links.map((l) =>
            l.href === "#" ? (
              <span key={l.label} className="text-sm font-medium text-slate-600">
                {l.label}
              </span>
            ) : (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {l.label}
              </a>
            )
          )}
        </div>
      </header>

      {/* ---------------- HISTORY（先頭） ---------------- */}
      <section className="mb-16 max-w-4xl">
        <SectionTitle ja="経歴" en="History" />
        <ul className="space-y-2">
          {profile.history.map((h, i) => (
            <li key={i} className="flex gap-4 text-sm">
              <span className="w-24 shrink-0 font-medium text-slate-500">
                {h.date}
              </span>
              <span className="text-slate-700">{h.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- 左:スキル・資格 / 右:制作実績(2カラム) 比率3:4 ---------------- */}
      <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)]">
        {/* 左カラム: 自己紹介 / スキル / 資格 */}
        <div className="space-y-16">
          <section>
            <SectionTitle ja="自己紹介" en="About" />
            {profile.about.map((para, i) => (
              <p key={i} className="mb-3 leading-relaxed text-slate-700">
                {para}
              </p>
            ))}
          </section>

          <section>
            <SectionTitle ja="スキル" en="Skills" />
            <div className="space-y-6">
              {profile.skills.map((s) => (
                <div key={s.group}>
                  <h3 className="mb-2 text-sm font-semibold text-slate-900">
                    {s.group}
                  </h3>
                  <ul className="divide-y divide-slate-100 border-y border-slate-100">
                    {s.items.map((it) => (
                      <li
                        key={it.name}
                        className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:gap-4"
                      >
                        <span className="w-48 shrink-0 text-sm font-medium text-slate-800">
                          {it.name}
                        </span>
                        <span className="text-sm text-slate-500">{it.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle ja="資格" en="Certifications" />
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
              {profile.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* 右カラム: 制作実績 */}
        <section id="works" className="scroll-mt-8">
          <SectionTitle ja="制作実績" en="Works" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <WorkCard key={p.slug} p={p} />
            ))}
          </div>

          <h3 className="mb-3 mt-10 text-sm font-semibold text-slate-900">
            その他の制作・経験
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <WorkCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-20 border-t border-slate-200 pt-6 text-xs text-slate-400">
        © {new Date().getFullYear()} {profile.nameJa} ({profile.nameEn})
      </footer>
    </main>
  );
}
