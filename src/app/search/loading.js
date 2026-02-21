export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="h-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950" />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-6 h-14 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-96 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      </main>
    </div>
  );
}
