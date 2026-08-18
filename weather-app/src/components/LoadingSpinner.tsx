import { cn } from "@/lib/utils";

const DOT_COUNT = 8;
const SPIN_DURATION_MS = 1000;

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("relative size-8", className)}>
      {Array.from({ length: DOT_COUNT }, (_unused, idx) => (
        <span
          key={idx}
          className="spinner-dot bg-neutral-0 absolute top-1/2 left-1/2 h-[20%] w-[20%] rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${
              (360 / DOT_COUNT) * idx
            }deg) translateY(-160%)`,
            animationDelay: `${(SPIN_DURATION_MS / DOT_COUNT) * idx}ms`,
          }}
        />
      ))}
    </div>
  );
}
