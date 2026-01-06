import { cn } from "@/lib/utils";

type Variant = "wide" | "reading";

export function Content({
  variant = "wide",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  // ✅ wide는 더 넓게 (그림 느낌)
  const widthClass =
    variant === "reading"
      ? "max-w-6xl"
      : "max-w-none";
  
  return (
    <main className="w-full">
      <div
        className={cn(
          "w-full px-12 py-10", // ← 여기서 좌우 여백 조절
          widthClass,
          className
        )}
      >
        {children}
      </div>
    </main>
  );
}
