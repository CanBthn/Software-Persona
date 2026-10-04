import { useMemo, useState } from 'react';
import { MODEL_TYPES, type Experiment, type ExperimentInput } from '../interfaces/Experiment';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ExperimentForm from '../components/ExperimentForm';
import ExperimentCard from '../components/ExperimentCard';
import StatsBar from '../components/StatsBar';

const now = () => new Date().toISOString();
const seed: Experiment[] = [
  { id: '1', title: 'Baseline lojistik regresyon', model: 'Logistic Regression', type: 'Sınıflandırma', dataset: 'Titanic', score: 78, notes: 'C=1.0, temel referans.', createdAt: now() },
  { id: '2', title: 'Ağaç sayısını artırdım', model: 'Random Forest', type: 'Sınıflandırma', dataset: 'Titanic', score: 84, notes: 'n_estimators=300, max_depth=8.', createdAt: now() },
  { id: '3', title: 'Basit CNN', model: 'CNN', type: 'Derin Öğrenme', dataset: 'CIFAR-10', score: 71, notes: '10 epoch, aşırı öğrenme başladı.', createdAt: now() },
];

export default function Dashboard() {
  const [items, setItems] = useLocalStorage<Experiment[]>('modeldefteri:experiments', seed);
  const [editing, setEditing] = useState<Experiment | null>(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Tümü');

  const add = (d: ExperimentInput) => setItems((p) => [{ ...d, id: crypto.randomUUID(), createdAt: now() }, ...p]);
  const update = (d: ExperimentInput) => { if (!editing) return; setItems((p) => p.map((e) => (e.id === editing.id ? { ...e, ...d } : e))); setEditing(null); };
  const remove = (id: string) => { if (confirm('Bu deney silinsin mi?')) setItems((p) => p.filter((e) => e.id !== id)); };

  const shown = useMemo(() => items.filter((e) =>
    (type === 'Tümü' || e.type === type) &&
    `${e.title} ${e.model} ${e.dataset}`.toLowerCase().includes(query.toLowerCase())), [items, type, query]);
  const ranked = [...shown].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className="space-y-6">
      <StatsBar items={items} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ExperimentForm key={editing?.id ?? 'new'} initial={editing} onSubmit={editing ? update : add} onCancel={() => setEditing(null)} />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ara: başlık, model, veri seti..." className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500" />
            <select value={type} onChange={(e) => setType(e.target.value)} className="rounded border border-gray-300 bg-white px-3 py-2 text-sm">
              {['Tümü', ...MODEL_TYPES].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          {ranked.length > 1 && (
            <section className="rounded-md border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-gray-700">En iyi sonuçlar</h2>
              {ranked.map((e, i) => (
                <div key={e.id} className="mb-2 flex items-center gap-2 text-xs">
                  <span className="w-5 text-gray-500">#{i + 1}</span>
                  <span className="w-28 truncate sm:w-40">{e.model}</span>
                  <div className="h-3 flex-1 rounded bg-gray-200"><div className="h-3 rounded bg-blue-600" style={{ width: `${e.score}%` }} /></div>
                  <b className="w-10 text-right">%{e.score}</b>
                </div>
              ))}
            </section>
          )}
          {shown.length === 0 ? <p className="py-10 text-center text-gray-500">Deney bulunamadı.</p>
            : shown.map((e) => <ExperimentCard key={e.id} exp={e} onEdit={setEditing} onDelete={remove} />)}
        </div>
      </div>
    </div>
  );
}
