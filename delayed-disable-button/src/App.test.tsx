import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "./App";

// Prove the "disable only if the call takes > 300ms" logic is
// testable without the timers/async fighting each other. Fake timers give us
// full control over the 300ms threshold and the async call's duration.
//
// We use fireEvent (synchronous) because userEvent schedules its own internal
// timers, which seem to deadlock against fake timers.

const THRESHOLD_MS = 300;

function setCallDuration(durationMs: number) {
  fireEvent.change(screen.getByRole("slider"), {
    target: { value: String(durationMs) },
  });
}

function clickTrigger() {
  fireEvent.click(screen.getByRole("button", { name: /Trigger call/ }));
}

// Advance fake time, which flushes every promise it unblocks.
async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

describe("delayed disable button", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("disables the Action button once a slow call passes the 300ms threshold, then re-enables it when the call resolves", async () => {
    render(<App />);

    const action = screen.getByRole("button", { name: /^Action/ });
    setCallDuration(1000); // 1000ms > 300ms threshold

    expect(action).toBeEnabled();

    clickTrigger();

    // Call is in flight but the threshold hasn't elapsed: still enabled.
    expect(screen.getByTestId("is-pending")).toHaveTextContent("true");
    expect(action).toBeEnabled();

    // Just before the threshold: still enabled.
    await advance(THRESHOLD_MS - 1);
    expect(action).toBeEnabled();

    // Cross the threshold while the call is still running: now disabled.
    await advance(1);
    expect(action).toBeDisabled();

    // Let the call finish: back to enabled.
    await advance(1000);
    expect(action).toBeEnabled();
    expect(screen.getByTestId("last-result")).toHaveTextContent(
      "resolved after 1000ms",
    );
  });

  it("never disables the Action button for a fast call that resolves before 300ms", async () => {
    render(<App />);

    const action = screen.getByRole("button", { name: /^Action/ });
    setCallDuration(200); // 200ms < 300ms threshold

    clickTrigger();
    expect(action).toBeEnabled();

    // Run out the full call; the threshold timer should have been cancelled.
    await advance(200);

    expect(action).toBeEnabled();
    expect(screen.getByTestId("should-disable")).toHaveTextContent("false");
    expect(screen.getByTestId("last-result")).toHaveTextContent(
      "resolved after 200ms",
    );

    // Extra time must not retroactively disable anything.
    await advance(500);
    expect(action).toBeEnabled();
  });

  it("boundary: a call that resolves exactly at 300ms ends enabled", async () => {
    render(<App />);

    const action = screen.getByRole("button", { name: /^Action/ });
    setCallDuration(THRESHOLD_MS);

    clickTrigger();

    await advance(THRESHOLD_MS);

    // Call and threshold timer fire in the same tick; the call's cleanup resets
    // the state, so the button ends enabled.
    expect(action).toBeEnabled();
  });
});
