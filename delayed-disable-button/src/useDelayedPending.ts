import { useCallback, useEffect, useRef, useState } from "react";

export function useDelayedPending(delayMs: number) {
  const [isPending, setIsPending] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Used to reset current timer.
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Run is an async function that:
  // - takes a task of type () => Promise<unknown>, then
  // - handles the state updates for isPending and shouldDisable
  // (the latter changes after delayMs), then
  // - awaits the task to complete, then
  // - resets the timer, isPending, shouldDisable;
  const run = useCallback(
    async (task: () => Promise<unknown>) => {
      setIsPending(true);
      setShouldDisable(false);

      clearTimer();
      timerRef.current = setTimeout(() => {
        setShouldDisable(true);
      }, delayMs);

      try {
        return await task();
      } finally {
        clearTimer();
        setIsPending(false);
        setShouldDisable(false);
      }
    },
    [delayMs, clearTimer],
  );

  // Avoid firing the timer after the component unmounts.
  useEffect(() => clearTimer, [clearTimer]);

  return { isPending, shouldDisable, run };
}
