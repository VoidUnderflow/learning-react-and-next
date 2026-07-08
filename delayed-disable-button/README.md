# Delayed Disable Button

A tiny sandbox for one specific UI pattern and for **testing**
it: a button (can be any element really) whose `disabled` state depends on an async call, but which should
only become disabled if that call takes longer than a threshold (300ms).

The point is fast calls should not flicker the button. If the call resolves
quickly, the button never changes state at all.

And YES, I know I can just debounce the trigger and disable the button for a flat 200ms regardless, but that's how farmers think.

## Why do this?

Encountered something like this when working with a different JS framework and it was just un-testable due to a weird interplay between the framework checking that the component finished rendering, the timeout triggering a state change that triggers a re-render and mocking the async fetch.

I thought - hey this is trivial to do in React. So this is just a sanity check that it's actually trivial and I'm not making things up.
