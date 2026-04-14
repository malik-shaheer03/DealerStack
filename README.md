# Dealers Task

A React + Vite vehicle listing app with filtering, sorting, saved vehicles, and a detail modal.

## Data source

The inventory now loads from **API Ninjas Cars API** using `VITE_API_NINJAS_KEY`.

- Primary source: `https://api.api-ninjas.com/v1/cars`
- Image enrichment: Wikipedia summary image for `make + model`
- Reliability fallback: local mock data in `public/mock/vehicles.json`

If the API key is missing, request fails, or rate limits are hit, the app automatically falls back to mock data.

## Setup

1. Install dependencies.
2. Create your environment file.
3. Start the app.

Use `.env.example` as a template:

```env
VITE_API_NINJAS_KEY=your_api_ninjas_key_here
```

## Available scripts

- `npm run dev` - Start development server.
- `npm run build` - Build production bundle.
- `npm run lint` - Run ESLint.
- `npm run preview` - Preview production build.

## Notes

- Never commit your real API key to version control.
- `.env.local` is ignored by Git via `*.local` in `.gitignore`.
