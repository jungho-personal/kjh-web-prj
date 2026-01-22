type Props = {
  page: number;
  totalPages: number;
  windowSize?: number; // default 5
  onChange: (p: number) => void;
};

export function PaginationWindow({
  page,
  totalPages,
  windowSize = 5,
  onChange,
}: Props) {
  if (totalPages <= 1) return null;

  const start = Math.floor((page - 1) / windowSize) * windowSize + 1;
  const end = Math.min(start + windowSize - 1, totalPages);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const canPrevGroup = start > 1;
  const canNextGroup = end < totalPages;

  const goPrevGroup = () => onChange(Math.max(1, start - windowSize));
  const goNextGroup = () => onChange(Math.min(totalPages, start + windowSize));

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={goPrevGroup}
        disabled={!canPrevGroup}
        className="h-9 rounded-xl border px-3 text-sm disabled:opacity-40 hover:bg-accent"
      >
        &lt;
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={[
            "h-9 min-w-9 rounded-xl px-3 text-sm transition",
            p === page
              ? "text-indigo-500 font-bold text-base"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={goNextGroup}
        disabled={!canNextGroup}
        className="h-9 rounded-xl border px-3 text-sm disabled:opacity-40 hover:bg-accent"
      >
        &gt;
      </button>
    </div>
  );
}
