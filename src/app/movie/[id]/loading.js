export default function MovieDetailsLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="h-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950" />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="h-[480px] animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-4">
            <div className="h-10 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 h-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
        <div className="mt-10 h-72 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      </main>
    </div>
  );
}
