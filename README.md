# 💰 Crypto Demo App

A modern and modular React Native application for managing and displaying cryptocurrency and fiat currency lists.

## 🚀 Technologies & Architecture

### 🧱 Boilerplate

This project is built on a custom boilerplate inspired by [react-native-boilerplate](https://github.com/thecodingmachine/react-native-boilerplate), including:

- React Native with TypeScript
- React Navigation
- React Query (TanStack Query)
- MMKV for local storage
- Custom Hooks for screen-specific logic
- Custom UI Components (e.g., `CustomText`, `CustomInput`, `CustomButton`, ...)

### 🌿 Git Flow

This project follows the Git Flow branching model:

- `develop`: main development branch
- `feature/*`: for new features
- `release/*`: pre-release staging
- `main`: stable production branch

### ⚡ React Query

React Query is used for server state management:

- Caching and refetching out of the box
- Easy loading and error states
- Support for pagination, polling, and optimistic updates
- Reduces boilerplate for API interactions

### 🧩 Screen-specific Hooks Architecture

Each screen encapsulates its business logic using a dedicated custom hook:

- Encourages separation of concerns
- Easy to test and reuse
- Enhances readability and scalability

Example hooks: `useCurrencyList`, `useCurrencyInfo`, `useButtonList`

### 🎨 Custom Components

Reusable UI components ensure design consistency:

- `CustomText` wraps native `Text` with standardized styling
- `CustomInput` for styled input fields
- `CustomButton` with unified style and behavior

### 🧪 Unit Testing

Comprehensive test coverage:

- All screens tested
- All reusable components tested
- Business logic (hooks and services) tested

Frameworks used:

- `@testing-library/react-native`
- `jest`

### 🗄️ MMKV vs. SQLite

This app uses `react-native-mmkv` for local storage:

| Feature         | MMKV                      | SQLite                       |
|----------------|---------------------------|------------------------------|
| Performance     | 🔥 Very fast               | 🐢 Slower for key-value data |
| Data structure  | Key-value store           | Relational database          |
| Encryption      | Supported                 | Supported                    |
| Use case        | Simple local storage      | Complex relational queries   |

MMKV is chosen for its superior speed and simplicity in key-value storage scenarios.

---

## 🧪 Installation

```bash
git clone https://github.com/dxungngh/crypto-demo-app.git
cd crypto-demo-app
yarn install
npx pod-install
yarn ios # or yarn android
```

Ensure React Native development environment is already set up.

---

## 📁 Folder Structure

```
src/
├── assets/                    # Static data files, images, icons
│   └── data/                  # Predefined currency lists
├── components/
│   ├── atoms/                 # Reusable atomic components (e.g., Skeleton, Icon)
│   ├── foundations/           # Styled base components (Text, Button, Input, Colors)
│   └── templates/             # Screen layout wrappers like SafeScreen
├── hooks/
│   ├── common/                # Shared utility hooks (e.g., debounce)
│   ├── domain/                # Business logic hooks and services
│   └── screens/               # Logic hooks for each screen (e.g., useButtonList)
├── navigation/                # Navigation setup and type definitions
├── screens/                   # All app screens
│   └── CurrencyList/          # UI and components related to currency list screen
│   └── ButtonList/            # Button list screen and related views
├── theme/                     # Theme setup and hook
├── utils/                     # Helper functions and utilities
└── App.tsx                    # Application entry point
```

---

## ✅ Summary

This project uses a clean architecture with modular design, test coverage, and performance in mind. React Query and MMKV make data handling efficient, while the use of custom hooks and components ensures consistency and maintainability.
