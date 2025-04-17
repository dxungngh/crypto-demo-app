# 💰 Crypto Demo App

A **React Native** demo app for managing and displaying **cryptocurrency** and **fiat currency** lists.  
Built with a focus on performance, modularity, and scalability.

---

## 🚀 Key Features

- Display **Top 100 Crypto** tokens and fiat currencies
- Search by name or symbol
- **Multi-language support** (English & Chinese)
- Local storage using **MMKV** – much faster than SQLite
- Git workflow follows [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
- Custom UI components like `CustomText`, `CustomButton`, `CustomInput`, ...
- Comprehensive **unit test coverage** with CI/CD blocking merges to `develop` or `master` if tests fail

---

## 🔀 Git Workflow

This project uses the GitFlow strategy:

```text
main       ← Production branch
develop    ← Integration branch
feature/*  ← New feature development
hotfix/*   ← Urgent production fixes
release/*  ← Pre-release preparations
```

✅ All **pull requests must pass unit tests** before merging into `develop` or `master`.

---

## 📁 Folder Structure

```
crypto-demo-app/
├── src/
│   ├── assets/                # Static JSON data (cryptoList, fiatList, top100)
│   ├── components/            # Reusable UI components
│   │   ├── foundations/       # CustomText, CustomButton, CustomAlert, etc.
│   │   └── templates/         # Page templates (e.g., SafeScreen)
│   ├── constants/             # Enums, config values, etc.
│   ├── hooks/                 # Custom React hooks
│   │   ├── buttonList/
│   │   ├── currencyList/
│   │   ├── domain/            # Business logic (MMKV storage)
│   │   ├── language/          # i18n utilities
│   │   └── common/            # Shared hooks (e.g., useDebounce)
│   ├── i18n/                  # Localization configuration
│   ├── navigation/            # Navigation setup and type declarations
│   ├── screens/               # App screens (ButtonList, CurrencyList)
│   ├── theme/                 # ThemeContext, variants, layout helpers
│   └── utils/                 # Utility functions (if any)
├── __mocks__/                 # Jest mocks (e.g., MMKV, i18n)
├── .github/workflows/         # GitHub Actions
│   └── test.yml               # CI workflow for running unit tests
├── jest.setup.js              # Jest global config
├── babel.config.js            # Babel alias config
└── tsconfig.json              # TypeScript settings
```

---

## 🧪 Unit Testing

All core logic, hooks, and components are covered by tests using:

- `Jest`
- `@testing-library/react-native`
- `@testing-library/react-hooks`

```bash
# Run all unit tests
yarn test

# With coverage reports
yarn test:report
```

🚫 **Pull requests are blocked** if tests fail – enforced by GitHub Actions.

---

## 💾 Storage: MMKV

This app uses [`react-native-mmkv`](https://github.com/mrousavy/react-native-mmkv), a super fast key-value storage for React Native powered by C++.

|     | MMKV            | SQLite          |
|-----|------------------|------------------|
| Speed | ⚡ Super fast     | 🐢 Slower         |
| API  | JSON-friendly     | SQL-based         |
| Use  | Config, cache     | Complex data       |

---

## ⚙️ Tech Stack

- **React Native** `0.78.x`
- **TypeScript**
- **React Navigation**
- **React Query**
- **MMKV** for local storage
- **Jest** + **Testing Library** for unit testing
- **i18next** for multi-language support
- **Tailwind-style layout** via custom `layout` object

---

## 🛠 Getting Started

```bash
# Install dependencies
yarn install

# For iOS:
cd ios && pod install && cd ..
```

---

## 📜 License

MIT License – free for personal or commercial use.

---

## ✨ Author

Built by [@dxungngh](https://github.com/dxungngh) with ❤️ and TypeScript
