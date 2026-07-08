import { useState } from "react";
import { useDelayedPending } from "./useDelayedPending";
import "./App.css";

const DISABLE_DELAY_MS = 300;

function wait(durationMs: number) {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

export default function App() {
  const [callDurationMs, setCallDurationMs] = useState(1000);
  const [lastResult, setLastResult] = useState<string>("nothing yet");
  const { isPending, shouldDisable, run } = useDelayedPending(DISABLE_DELAY_MS);

  async function triggerAsyncCall() {
    setLastResult("...");
    await run(async () => {
      await wait(callDurationMs);
    });
    setLastResult(`resolved after ${callDurationMs}ms`);
  }

  return (
    <main className="app">
      <h1>Delayed disable button</h1>
      <p className="blurb">
        The <strong>Action</strong> button only becomes disabled if the async
        call started by <strong>Trigger call</strong> is still running after{" "}
        {DISABLE_DELAY_MS}ms. Fast calls never disable it.
      </p>

      <label className="control">
        Call duration: <strong>{callDurationMs}ms</strong>
        <input
          type="range"
          min={0}
          max={2000}
          step={50}
          value={callDurationMs}
          onChange={(event) => setCallDurationMs(Number(event.target.value))}
        />
        <span className="hint">
          {callDurationMs > DISABLE_DELAY_MS
            ? `> ${DISABLE_DELAY_MS}ms: will disable`
            : `<= ${DISABLE_DELAY_MS}ms: will NOT disable`}
        </span>
      </label>

      <div className="buttons">
        <button onClick={triggerAsyncCall} disabled={isPending}>
          {isPending ? "Calling..." : "Trigger call"}
        </button>

        <button
          className="action"
          disabled={shouldDisable}
          onClick={() => setLastResult("Action clicked!")}
        >
          Action {shouldDisable ? "(disabled)" : "(enabled)"}
        </button>
      </div>

      <dl className="status">
        <dt>isPending</dt>
        <dd data-testid="is-pending">{String(isPending)}</dd>
        <dt>shouldDisable</dt>
        <dd data-testid="should-disable">{String(shouldDisable)}</dd>
        <dt>last result</dt>
        <dd data-testid="last-result">{lastResult}</dd>
      </dl>
    </main>
  );
}
