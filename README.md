# Module Federation Demo: React 17 Host + React 19 Remote

This project demonstrates a Micro-Frontend architecture using **Webpack Module Federation**. It showcases how a Legacy Host application can seamlessly integrate modern Remote components.

## 🚀 Key Features

*   **Multi-Version React**: Host runs **React 17**, Remote runs **React 19**.
*   **Lazy Loading**: Remote components are loaded on-demand using `React.lazy` and `Suspense`.
*   **Shared State**: Remote component triggers **Redux** state updates in the Host.
*   **Cross-App Routing**:
    *   Dashboard (`/`) embeds Remote User List.
    *   Dedicated Route (`/user`) renders Remote User List full-page.
    *   Master-Detail flow: Clicking a user in Remote navigates to Host's Details Page (`/user/:id`).
*   **TypeScript**: Remote application is built with **TypeScript** (`.tsx`).
*   **CSS Isolation**: Demonstrates CSS conflict challenges (Global Host styles vs Remote Tailwind).
*   **Resilience**: Wrapper **Error Boundaries** handle Remote server failures gracefully.

## 🛠️ Architecture

*   **Host (Port 3000)**: Main shell, Navigation, Redux Store.
*   **Remote (Port 3001)**: Provider of `UserList` and `Button` components.

## 📦 Prerequisites

*   Node.js (v14 or higher)
*   npm

## 🏃‍♂️ Getting Started

### 1. Install Dependencies
Run this in the root directory to install for both applications:

```bash
cd host && npm install
cd ../remote && npm install
```

### 2. Start Applications
Open two terminal instances:

**Terminal 1 (Host):**
```bash
cd host
npm start
```
*Running on [http://localhost:3000](http://localhost:3000)*

**Terminal 2 (Remote):**
```bash
cd remote
npm start
```
*Running on [http://localhost:3001](http://localhost:3001)*

## 🧪 Build & Production Verification
To test production builds locally:

```bash
# Build Host
cd host && npm run build
npx serve -s dist -p 3000

# Build Remote
cd remote && npm run build
npx serve -s dist -p 3001 --cors
```

## ⚠️ Known Issues (Demo Purposes)
*   **CSS Conflict**: The Host's global `.bg-red-500` rule typically overrides the Remote's Tailwind class. See `CSS_CONFLICT_FIX.md` for the recommended solution.
