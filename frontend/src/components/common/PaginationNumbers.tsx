type PageItem = number | "...";

export function PaginationNumbers({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: PageItem[] = [];
  const push = (v: PageItem) => pages.push(v);

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) push(i);
  } else {
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);

    push(1);
    if (left > 2) push("...");

    for (let i = left; i <= right; i++) push(i);

    if (right < totalPages - 1) push("...");
    push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-1">
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            className={[
              "h-9 min-w-9 rounded-xl px-3 text-sm transition",
              p === page
                ? "text-indigo-500 font-bold text-base"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
}
