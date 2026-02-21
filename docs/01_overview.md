# Project Overview: HGoat V3

HGoat V3 is a modern web application designed for monitoring and reporting on goat health and farm activities. It provides a structured way for caretakers to log daily observations, environmental conditions, and task completions.

## Core Purpose

The application aims to digitize the process of goat caretaking, moving from paper-based or informal logs to a structured database (Supabase). This allows for better tracking of goat health trends and ensures that essential farm tasks are completed consistently.

## Technology Stack

- **Frontend Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [react-router-dom](https://reactrouter.com/) (v7)
- **State Management**: React `useState` (Global state in `App.jsx`)
- **Backend as a Service**: [Supabase](https://supabase.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Internationalization**: [react-i18next](https://react.i18next.com/)
- **Styling**: Vanilla CSS (see `global.css`)

## Architecture

The application follows a standard React component-based architecture:

- **Entry Point**: `main.jsx` initializes the React application and imports global styles.
- **Root Component**: `App.jsx` maintains the global `formData` state, which is passed down to navigation and pages.
- **Navigation**: `Navigation.jsx` handles routing between different pages of the reporting process.
- **Services**: Located in `src/services`, these handle external interactions like Supabase queries and weather API calls.
- **Pages**: Located in `src/pages`, these represent individual steps in the health reporting workflow.
