# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
- [The challenge](#the-challenge)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Useful resources](#useful-resources)

### Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Built with

Vite + Tailwind + React + shadcn/ui + dnd-kit

### What I learned

- Implementing drag and drop for a list of items with dnd-kit;
- Making sure that the checkbox click isn't being treated as a drag and drop event:

```(tsx)
const sensors = useSensors(
useSensor(PointerSensor, {
    activationConstraint: {
    // Minimum drag distance
    distance: 10,
    // Tolerance in pixels before drag starts
    tolerance: 5,
    },
})
);
```

- Importing SVGs as components with vite-plugin-svgr;
- Created a simple REST API backend with Express + Postgres running in a container. Learned to handle CORS. Used React Query on the frontend to handle syncing user operations with the DB and enabled optimistic updates.
- Selecting the background image based on screen size and current theme;
- Making dark mode switching actually switch the background image (`@custom-variant dark (&:where(.dark, .dark *));`);
- Displaying an element when the parent li element is hovered, on sm+ screens: `sm:[li:hover_&]:block`. The ampersand represents the current element, underscore = space in Tailwind, and li:hover is standard CSS. So this gets translated to `li:hover button`.
- Using `display: contents` to merge display controls with the final row of the todo list on >=sm screens. This display mode makes the children of an element act as if they are the children of the parent of the element.
- Lazy initialization from local storage.

### Notes

Still not happy with stretching on wide screens. In practice, I would like to have a separate background image for them.

Surprisingly, adding a gradient to the checkbox border was not trivial.

The `sm:[li:hover_&]:block` and `display: contents` tricks were pretty neat, especially the latter. It's something I just glossed over when reading display modes, without realising what it can be used for.

### Useful resources

- [How to make dark mode easier in Tailwind v4, without spamming dark:](https://www.reddit.com/r/tailwindcss/comments/1jvi5ip/how_to_make_dark_mode_easier_in_tailwind_v4/)
- [How to create gradient borders with TailwindCSS](https://dev.to/tailus/how-to-create-gradient-borders-with-tailwindcss-4gk2)
