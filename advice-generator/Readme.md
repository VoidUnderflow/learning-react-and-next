# Frontend Mentor - Advice generator app solution

This is a solution to Frontend Mentor's [Advice generator app](https://www.frontendmentor.io/challenges/advice-generator-app-QdUG-13db).

## Overview

Quick practice while I figure out how to structure a larger Django + React project.

### Objectives

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Generate a new piece of advice by clicking the dice icon

### Built with

Vite + React + Tailwind CSS.

### What I learned

How to make a blurry shadow effect on hover with Tailwind:
`hover:shadow-[inset_0_0_1px_hsl(150,100%,66%),0_0_25px_10px_hsl(150,100%,66%)]`

Without the inset trick, there was a weird circular artifact matching the background color that wouldn't go away, even with `outline-none` and `border-0`.
