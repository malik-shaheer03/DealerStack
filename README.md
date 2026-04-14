# 🚗 DealerStack — Vehicle Inventory Management UI

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-Styled-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

A modern **frontend vehicle listing application** built with React and Vite.  
DealerStack focuses on a premium, responsive browsing experience with search, sorting, advanced filters, saved vehicles, URL-synced state, and smooth modal interactions.

---

## ✨ Features

- 🔎 **Debounced Vehicle Search** (make/model)
- 🎛️ **Advanced Filters Drawer** (fuel type, transmission, min/max price)
- ↕️ **Client-side Sorting** (default, price low/high, name A–Z)
- 📄 **Pagination** with compact mobile behavior
- 💾 **Saved Vehicles** persisted in `localStorage`
- 🧭 **URL Query Sync** for filter/search/sort/page state sharing
- 🖼️ **Vehicle Details Modal** with image gallery + smooth open/close animations
- 🧱 **Skeleton Loading + Error State UI**
- 📱 **Fully Responsive UI** (mobile hamburger nav + adaptive layouts)
- 🎨 **Custom Branding** (logo system + cross-device favicon setup)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | Core UI framework |
| React Router v7 | Multi-page SPA routing |
| Vite 8 | Fast dev server and production build |
| CSS Modules | Scoped component-level styling |
| Native Fetch API | Data fetching in custom hooks |

### Tooling
| Tool | Purpose |
|------|---------|
| ESLint 9 | Code quality and linting |
| `@vitejs/plugin-react` | React integration for Vite |

---

## 🧭 App Routes

| Route | Page | Description |
|------|------|-------------|
| `/` | Vehicle Inventory | Search, filter, sort, paginate, save, and open details modal |
| `/saved` | Saved Vehicles | View and manage locally saved vehicles |
| `/form` | Create Account | Form validation flow with password strength + success screen |

---

## 📦 Data Source

The app currently reads inventory from local mock JSON:

- `GET /mock/vehicles.json` (served from `public/mock/vehicles.json`)

During normalization, the app:
- standardizes fields,
- formats/validates image URLs,
- maps curated fallback images,
- and generates an SVG placeholder image when needed.

> Note: `.env.example` includes `VITE_API_NINJAS_KEY` for optional external API extensions, but current default flow works without it.

---

## 🧱 Project Structure

```text
dealers-task/
├── public/
│   ├── mock/vehicles.json              # Inventory data source
│   ├── favicon.svg                     # Browser favicon (brand mark)
│   ├── icon-192.svg                    # PWA icon
│   ├── icon-512.svg                    # PWA icon
│   ├── apple-touch-icon.svg            # iOS icon
│   └── site.webmanifest                # Web app manifest
│
├── src/
│   ├── api/
│   │   ├── vehicles.js                 # Normalization, formatters, gallery utils
│   │   └── vehicleImageMap.js          # Vehicle image mapping
│   │
│   ├── components/
│   │   ├── layout/                     # Navbar + shared page wrapper
│   │   ├── listing/                    # Search, sort, filters, cards, grid, modal, pagination
│   │   ├── form/                       # Form field + password strength UI
│   │   └── ui/                         # Badge, spinner, error state
│   │
│   ├── hooks/
│   │   ├── useFetch.js                 # Fetch + loading/error handling
│   │   ├── useDebounce.js              # Search debouncing
│   │   └── usePersistentIds.js         # localStorage ID persistence
│   │
│   ├── pages/
│   │   ├── ListingPage.jsx             # Main inventory workflow
│   │   ├── SavedPage.jsx               # Saved vehicle management
│   │   └── FormPage.jsx                # Account creation form
│   │
│   ├── styles/
│   │   ├── tokens.css                  # Design tokens (color/spacing/radius)
│   │   └── globals.css                 # Global styles and responsive baseline
│   │
│   ├── App.jsx                         # Router + app shell
│   └── main.jsx                        # React entry
│
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** 18+ (recommended: latest LTS)
- **npm** 9+

### 1️⃣ Clone

```bash
git clone https://github.com/malik-shaheer03/DealerStack.git
cd DealerStack
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

App runs at Vite default URL (typically `http://localhost:5173`).

---

## 📜 Available Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build production bundle
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

---

## 🎯 UX & State Highlights

- **URL as source of truth** for listing state (`q`, `sort`, `page`, `fuel`, `trans`, `min`, `max`)
- **Modal body scroll lock** while details popup is open
- **Keyboard-friendly interactions** (`Enter`/`Space` activation, `Escape` close)
- **Resilient image pipeline** with fallbacks and placeholders
- **Mobile-first behavior** for controls, nav, cards, pagination, and modal

---

## 👨‍💻 Author

**Muhammad Shaheer Malik**

- 💼 [LinkedIn](https://linkedin.com/in/malik-shaheer03)
- 🐙 [GitHub](https://github.com/malik-shaheer03)
- 📸 [Instagram](https://instagram.com/malik_shaheer03)
- 📧 [Email](mailto:shaheermalik03@gmail.com)
- 🌐 [Portfolio](https://shaheer-portfolio-omega.vercel.app/)

---

## 📄 License

This project is open-source and available under the **MIT License**.
