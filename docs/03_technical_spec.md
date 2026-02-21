# Technical Specification

This document details the data structures, services, and integration points of the HGoat V3 application.

## Data Models

### Global Form State (`formData`)

The primary state object in `App.jsx` follows this structure:

```javascript
{
  site_id: string,            // UUID from Supabase
  site_label: string,         // Descriptive name (e.g., "Main Pen")
  date: string,               // YYYY-MM-DD
  caretaker_name: string,
  outdoor_temperature: string,
  weather_condition: string,
  weather_code: string,
  goats: {
    [uuid: string]: {
      name: string,
      stool: string,          // "good", "loose", "diarrhea"
      appetite: string,       // "normal", "low", "none"
      temperature: string,    // "normal", "high"
      notes: string
    }
  },
  goatsOrder: string[],       // Array of goat UUIDs to maintain display order
  tasks: {
    waterChanged: boolean,
    shelterCleaned: boolean,
    electricFenceOn: boolean,
    setElectricFenceVoltage: boolean
  },
  general_notes: string
}
```

## Services (`src/services`)

### `supabaseClient.js`
Initializes the Supabase client using environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### `weatherService.js`
Fetches current weather data from the [Open-Meteo API](https://open-meteo.com/).
- **Function**: `getCurrentWeather(latitude, longitude)`
- **Returns**: `{ temperature, weather_code }`

### `goatReports.js`
Handles the submission of health reports. 
- *Current Status*: Implementation is a stub (simulates network delay and returns success).

### `fetchGraphData.js`
Retrieves historical data for charting via Recharts on the Dashboard.

## Hooks and Utilities

- **`useSession.js`**: A custom hook to monitor and provide the current Supabase authentication session.
- **`siteQuery.js`**: Utility to manage site-related query parameters in the URL, ensuring the application context (which site is being reported for) is preserved across navigation.
- **`logout.js`**: Simple utility to sign out of the Supabase session.

## Configuration

- **`vite.config.js`**: Standard Vite configuration with the React plugin.
## Configuration and Local-Only Mode

To handle expired credentials or infrastructure changes, the application includes a local-only mode toggle:

### `src/services/config.js`
Contains the `USE_SUPABASE` constant.
- `true`: Application uses live Supabase services.
- `false` (Current): Application uses mocked services and a simulated session.

### Impact of Local-Only Mode
- **Authentication**: `useSession.js` returns a mock "Admin User" session. `Login.jsx` and `logout.js` simulate account actions.
- **Data Fetching**: `fetchGraphData.js` returns static JSON data for dashboard charts.
- **Form Submission**: `goatReports.js` remains a stub, simulating successful submission.
