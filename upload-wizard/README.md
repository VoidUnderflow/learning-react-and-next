# upload-wizard

Practice multi-step file upload component. Desired flow:
- User selects an upload type from a list on the left-hand side, can filter using an input box;
- User selects a file;
- Mock backend validates it, the result can either be OK, or have warnings or errors or both;
- User can view the warnings and errors in a modal;
- User can re-upload a file;
- If no errors => user can finish the upload => success screen + button to go back to the beginning;

Libraries used:
- App base: React + Vite;
- Styling: HeroUI + Tailwind;
- API: Mock Service Worker + React Query;
- State management: Zustand;