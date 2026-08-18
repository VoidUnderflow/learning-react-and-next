import { cn } from "@/lib/utils";

const DOT_DELAYS_MS = [0, 160, 320];

interface LoadingDotsProps {
  className?: string;
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {DOT_DELAYS_MS.map((delay) => (
        <span
          key={delay}
          style={{ animationDelay: `${delay}ms` }}
          className={cn(
            "loading-dot bg-neutral-0 size-2.5 rounded-full",
            className
          )}
        />
      ))}
    </div>
  );
}
