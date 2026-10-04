import type { Experiment } from '../interfaces/Experiment';
export default function StatsBar({ items }: { items: Experiment[] }) {
  const best = items.reduce<Experiment | null>((b, e) => (!b || e.score > b.score ? e : b), null);
  const avg = items.length ? Math.round(items.reduce((s, e) => s + e.score, 0) / items.length) : 0;
  const cards = [['Toplam deney', String(items.length)], ['Ortalama skor', `%${avg}`], ['En iyi model', best ? `${best.model} (%${best.score})` : '-']];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map(([k, v]) => (
        <div key={k} className="rounded-md border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">{k}</p><p className="mt-1 truncate text-lg font-bold">{v}</p>
        </div>
      ))}
    </div>
  );
}
