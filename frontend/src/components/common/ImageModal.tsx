import { useEffect } from "react";

type ImageModalProps = {
  open: boolean;
  src: string;
  alt?: string;
  caption?: string;
  onClose: () => void;
};

export default function ImageModal({
  open,
  src,
  alt = "image",
  caption,
  onClose,
}: ImageModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // 바깥(오버레이) 클릭 시 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-6xl">
        <div className="overflow-hidden rounded-2xl bg-background shadow-xl">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="rounded-lg px-3 py-1 text-sm hover:bg-muted"
              onClick={onClose}
              aria-label="Close"
            >
              Close
            </button>
          </div>

          <div className="px-4 pb-4">
            <img
              src={src}
              alt={alt}
              className="h-auto w-full rounded-xl object-contain"
              draggable={false}
            />
            {caption ? (
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {caption}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
