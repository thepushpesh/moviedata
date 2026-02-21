"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900/50 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Something went wrong</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error?.message || "An unexpected error occurred while loading the page."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
