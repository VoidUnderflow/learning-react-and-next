const DOT_DELAYS_MS = [0, 160, 320];

export function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      {DOT_DELAYS_MS.map((delay) => (
        <span
          key={delay}
          style={{ animationDelay: `${delay}ms` }}
          className="loading-dot bg-neutral-0 size-2.5 rounded-full"
        />
      ))}
    </div>
  );
}
