# Features and UI Components

The HGoat V3 application is structured as a multi-step reporting form, with a dashboard for overview and management.

## Key Features

1.  **Multi-Step Reporting**: A guided process for submitting goat health reports.
2.  **Dynamic Goat Management**: Ability to handle multiple goats per site, with individual health metrics (stool, appetite, temperature).
3.  **Weather Integration**: Automatically fetches or allows manual entry of outdoor temperature and weather conditions.
4.  **Task Tracking**: A checklist for daily farm tasks (water, cleaning, electric fence).
5.  **Data Visualization**: Dashboard with temperature graphs and health status overviews.
6.  **i18n Support**: Full support for English and Japanese languages.

## Pages Overview (`src/pages`)

| Page | Description |
| :--- | :--- |
| `Dashboard.jsx` | The main landing page showing current status and report history. |
| `BasicInfo.jsx` | Captures date, caretaker name, and weather information. |
| `GoatForm.jsx` | Dynamic form for logging individual goat health metrics. |
| `TaskChecklist.jsx` | Checklist for farm maintenance tasks. |
| `GeneralNotes.jsx` | Free-text field for additional observations. |
| `Review.jsx` | Summary page for reviewing all logged data before submission. |
| `Login.jsx` | Authentication page for Supabase access. |
| `Account.jsx` | User profile and settings. |
| `SampleReport.jsx` | Placeholder for viewing historic or example reports. |
| `RequestAccess.jsx` | Flow for new users to request account access. |

## Core Components (`src/components`)

- **Card.jsx**: A reusable container for UI sections.
- **Navbar.jsx**: Top navigation bar (branding, language toggle).
- **Navigation.jsx**: The main router and layout wrapper.
- **StepNavigation.jsx**: Visual indicator and controls for the multi-step form progress.
- **TemperatureGraph.jsx**: Uses Recharts to display historical temperature data.
