Followed this extremely well-made tutorial: [Crossy Road with React Three Fiber](https://javascriptgametutorials.com/tutorials/react-three-fiber/crossy-road).

Changes from the original (mostly just to get some extra practice in):

- Swapped Zustand for Redux.
- Made the camera move at a fixed speed + game over if the player falls behind.
- Added a pause feature (pauses player, camera, and vehicle movement).
- Prevented player movement after game over.
- Merged Grass and Road into a single `ColoredTile` component + added out-of-bounds tiles.
- Improved folder structure and reduced the number of hardcoded values.
