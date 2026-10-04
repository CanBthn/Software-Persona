import type { Experiment } from '../interfaces/Experiment';
interface Props { exp: Experiment; onEdit: (e: Experiment) => void; onDelete: (id: string) => void; }

export default function ExperimentCard({ exp, onEdit, onDelete }: Props) {
  return (
    <article className="rounded-md border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{exp.title}</h3>
          <p className="text-xs text-gray-500">{exp.model} · {exp.dataset || 'veri seti yok'} · {new Date(exp.createdAt).toLocaleDateString('tr-TR')}</p>
        </div>
        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{exp.type}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded bg-gray-200">
          <div className="h-full rounded bg-blue-600" style={{ width: `${exp.score}%` }} />
        </div>
        <b className="text-sm text-blue-700">%{exp.score}</b>
      </div>
      {exp.notes && <p className="mt-3 text-sm text-gray-700">{exp.notes}</p>}
      <div className="mt-3 flex gap-2 text-xs">
        <button onClick={() => onEdit(exp)} className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100">Düzenle</button>
        <button onClick={() => onDelete(exp.id)} className="rounded border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50">Sil</button>
      </div>
    </article>
  );
}
