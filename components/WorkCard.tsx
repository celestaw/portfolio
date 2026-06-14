import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

const catLabel: Record<Project["category"], string> = {
  research: "研究",
  hci: "HCI",
  game: "ゲーム",
  ai: "AI",
  team: "チーム開発",
  theory: "理論",
  tool: "ツール",
};

export function WorkCard({ p }: { p: Project }) {
  const inner = (
    <div className="work-card flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white">
      {/* カバー画像（featured のみ。画像が無ければグラデーション） */}
      {p.featured &&
        (p.cover ? (
          <div className="relative aspect-video bg-slate-100">
            <Image
              src={p.cover}
              alt={p.title}
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-[11px] text-slate-400">
            No Image
          </div>
        ))}

      <div className="flex flex-1 flex-col p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {catLabel[p.category]}
        </span>
        <span className="text-[11px] text-slate-400">{p.period}</span>
      </div>

      <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
        {p.tagline}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-sm border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span className="text-xs text-slate-500">{p.role}</span>
        {p.featured ? (
          <span className="text-xs font-medium text-accent">詳細を見る →</span>
        ) : (
          <span className="text-[11px] text-slate-400">一覧のみ</span>
        )}
      </div>
      </div>
    </div>
  );

  if (!p.featured) return <div className="h-full">{inner}</div>;
  return (
    <Link href={`/works/${p.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}
