import Dashboard from './pages/Dashboard';
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-lg font-semibold">ModelDefteri</h1>
          <p className="text-sm text-gray-500">Makine öğrenmesi deney kayıtları</p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6"><Dashboard /></main>
    </div>
  );
}
