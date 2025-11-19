# Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp) using React, Tailwind, and Vite.

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Lessons

DaisyUI(5) was a pain to use this time around. I tried everything I could to make a simple toggle show - it was squished up, even without any other styles applied. In the end, I had to code it manually. Very likely I did something wrong, but I am still unsure what. I will be trying shadcn/ui and HeadlessUI for my next projects and see how they compare.

The main challenge I imposed upon myself was to learn to use DaisyUI's themes and how to use primary, secondary, neutral and accent colors in general. The light/dark themes set by the style guide were not consistent though, which again was a bit frustrating.

I also wasted a lot of time trying to use oklch instead of hsl (since that was what the DaisyUI docs recommended), but the conversion tools I could find were inadequate and DaisyUI seems to use a different format than normal? Thankfully, hsl can still be used.
