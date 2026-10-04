import { useState, type FormEvent } from 'react';
import { MODEL_TYPES, type Experiment, type ExperimentInput, type ModelType } from '../interfaces/Experiment';

const empty: ExperimentInput = { title: '', model: '', type: 'Sınıflandırma', dataset: '', score: 80, notes: '' };
const field = 'w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500';

interface Props { initial?: Experiment | null; onSubmit: (d: ExperimentInput) => void; onCancel: () => void; }

export default function ExperimentForm({ initial, onSubmit, onCancel }: Props) {
  const [f, setF] = useState<ExperimentInput>(initial ? { ...initial } : empty);
  const set = <K extends keyof ExperimentInput>(k: K, v: ExperimentInput[K]) => setF((p) => ({ ...p, [k]: v }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!f.title.trim() || !f.model.trim()) return;
    onSubmit(f);
    if (!initial) setF(empty);
  };
  return (
    <form onSubmit={submit} className="space-y-3 rounded-md border border-gray-200 bg-white p-5">
      <h2 className="font-semibold">{initial ? 'Deneyi Güncelle' : 'Yeni Deney Ekle'}</h2>
      <input className={field} placeholder="Deney başlığı" value={f.title} onChange={(e) => set('title', e.target.value)} />
      <input className={field} placeholder="Model (ör. Random Forest, CNN)" value={f.model} onChange={(e) => set('model', e.target.value)} />
      <select className={field} value={f.type} onChange={(e) => set('type', e.target.value as ModelType)}>
        {MODEL_TYPES.map((t) => <option key={t}>{t}</option>)}
      </select>
      <input className={field} placeholder="Veri seti" value={f.dataset} onChange={(e) => set('dataset', e.target.value)} />
      <label className="block text-sm text-gray-700">Başarı skoru: <b className="text-blue-700">%{f.score}</b>
        <input type="range" min={0} max={100} value={f.score} onChange={(e) => set('score', +e.target.value)} className="mt-1 w-full accent-blue-600" />
      </label>
      <textarea className={field} rows={3} placeholder="Notlar (hiperparametreler, gözlemler...)" value={f.notes} onChange={(e) => set('notes', e.target.value)} />
      <div className="flex gap-2">
        <button className="flex-1 rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">{initial ? 'Kaydet' : 'Ekle'}</button>
        {initial && <button type="button" onClick={onCancel} className="rounded border border-gray-300 px-4 text-sm hover:bg-gray-100">Vazgeç</button>}
      </div>
    </form>
  );
}
