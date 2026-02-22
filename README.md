# CloudMemoryStick 📱☁️

**Android Emulator Cloud Backup for Google Drive**

A React Native mobile application that automatically backs up Android emulator data to Google Drive with secure authentication via Keycloak.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **Social Login** | Google OAuth via Keycloak | Planned |
| 📁 **Emulator Detection** | Auto-scan for emulator folders | Planned |
| ☁️ **Google Drive Upload** | Backup to cloud storage | Planned |
| 📜 **Backup History** | Track all backup operations | Planned |
| 🔄 **Auto Sync** | Automatic change detection & sync | Planned |

### Key Capabilities

- **Secure Authentication**: Enterprise-grade OAuth2 with PKCE flow
- **Automatic Detection**: Finds Android Studio, Genymotion, BlueStacks, and more
- **Real-time Progress**: Live upload progress with speed and ETA
- **Background Sync**: Automatic backup when files change
- **WiFi-Only Option**: Save mobile data with smart sync settings

---

## 🏗️ Architecture

This project follows **MVVM (Model-ViewModel-View)** pattern with **3-Tier Architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  Screens │ Components │ Hooks                                │
├─────────────────────────────────────────────────────────────┤
│                    BUSINESS LOGIC LAYER                      │
│  AuthVM │ BackupVM │ HistoryVM │ SyncVM                     │
├─────────────────────────────────────────────────────────────┤
│                       DATA LAYER                             │
│  Models │ Services (Keycloak, Drive) │ Repositories         │
└─────────────────────────────────────────────────────────────┘
```

### Design Principles

- **Clean Code**: SOLID principles, DRY, KISS
- **Modular**: Reusable components and services
- **Type-Safe**: Full TypeScript coverage
- **Testable**: Unit, integration, and E2E tests
- **Cyber-Gold Themed**: Dark backgrounds with gold accents, Tailwind CSS styling

---

## 🛠️ Tech Stack

### Core Technologies

| Category | Technology |
|----------|------------|
| Framework | React Native 0.81.5 + Expo SDK 54 |
| Language | TypeScript 5.9 |
| UI Library | React 19.1 |
| Styling | NativeWind (Tailwind CSS) |
| Navigation | Expo Router 6.0 |
| State Management | Custom ViewModel (Observable Pattern) |

### Services & APIs

| Service | Purpose |
|---------|---------|
| Keycloak | Identity & Access Management |
| Google OAuth 2.0 | Social Login |
| Google Drive API v3 | Cloud Storage |
| Expo SecureStore | Encrypted Token Storage |
| Expo SQLite | Local Database |

### Key Libraries

```json
{
  "nativewind": "^4.0.0",
  "tailwindcss": "^3.4.0",
  "expo-auth-session": "~6.0.0",
  "expo-secure-store": "~14.0.0",
  "expo-file-system": "~18.0.0",
  "expo-sqlite": "~15.0.0",
  "expo-background-fetch": "~13.0.0"
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Expo CLI**: Latest version
- **Android Studio**: For emulator testing
- **Keycloak Server**: v20.0+ (or use cloud instance)
- **Google Cloud Project**: With Drive API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/CloudMemoryStick.git
   cd CloudMemoryStick
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit with your credentials
   # KEYCLOAK_ISSUER=https://your-keycloak.com/realms/your-realm
   # KEYCLOAK_CLIENT_ID=cloudmemorystick
   # GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. **Setup Tailwind CSS**
   ```bash
   npx tailwindcss init
   # Configure tailwind.config.ts with cyber-gold theme
   ```

5. **Install native modules**
   ```bash
   npx expo install expo-auth-session expo-secure-store expo-file-system expo-sqlite
   ```

6. **Start the development server**
   ```bash
   npx expo start
   ```

7. **Run on Android**
   ```bash
   npx expo run:android
   ```

---

## 📁 Project Structure

```
CloudMemoryStick/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Authentication flow
│   ├── (tabs)/                   # Main app tabs
│   ├── backup/                   # Backup detail screens
│   └── _layout.tsx               # Root layout
│
├── src/                          # Source code
│   ├── models/                   # Data models & interfaces
│   │   ├── entities/             # Core entities
│   │   ├── interfaces/           # Service interfaces
│   │   └── dtos/                 # Data transfer objects
│   │
│   ├── services/                 # Business services
│   │   ├── api/                  # External APIs
│   │   ├── storage/              # Local storage
│   │   └── system/               # System services
│   │
│   ├── repositories/             # Data repositories
│   ├── viewmodels/               # ViewModels (Business Logic)
│   │   ├── base/                 # Base classes
│   │   └── features/             # Feature ViewModels
│   │
│   ├── views/                    # UI Components
│   │   ├── screens/              # Screen components
│   │   └── components/           # Reusable components
│   │
│   └── core/                     # Cross-cutting concerns
│       ├── navigation/           # Navigation config
│       ├── theme/                # Theme & colors
│       └── utils/                # Utilities
│
├── hooks/                        # Shared React hooks
├── constants/                    # App constants
├── docs/                         # Documentation
│   ├── PRD.md                    # Product Requirements
│   ├── TDD.md                    # Technical Design
│   └── plans/                    # Project plans
│
├── assets/                       # Images, fonts, etc.
├── tests/                        # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .qwen/                        # AI agent configurations
│   ├── steering/                 # Architecture guidelines
│   └── agents/                   # Agent definitions
│
├── package.json
├── tsconfig.json
├── eslint.config.js
└── README.md
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PRD.md](./docs/PRD.md) | Product Requirements Document |
| [TDD.md](./docs/TDD.md) | Technical Design Document |
| [Roadmap](./docs/plans/ROADMAP.md) | Project Roadmap |
| [Sprint Plans](./docs/plans/) | Sprint-by-sprint plans |
| [Release Plan](./docs/plans/release-plan.md) | Release strategy |
| [Steering Constitution](./.qwen/steering/STEERING_CONSTITUTION.md) | Architecture Guidelines |
| [Design Rules](./.qwen/steering/design-rules.md) | UI/UX Design System (Cyber-Gold) |

---

## 👨‍💻 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web

# Lint code
npm run lint

# Run tests
npm test

# Type check
npx tsc --noEmit
```

### Coding Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Expo config with custom rules
- **Formatting**: Consistent with project conventions
- **Naming**: 
  - Files: `kebab-case.ts`
  - Components: `PascalCase.tsx`
  - ViewModels: `*.viewmodel.ts`

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Commit changes (conventional commits)
git commit -m "feat: add emulator detection"

# Push and create PR
git push origin feature/feature-name
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the [Steering Constitution](./.qwen/steering/STEERING_CONSTITUTION.md)
- Write tests for new features
- Update documentation as needed
- Ensure linting passes (`npm run lint`)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/CloudMemoryStick/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/CloudMemoryStick/discussions)

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - React Native framework
- [Keycloak](https://www.keycloak.org/) - Identity management
- [Google Drive API](https://developers.google.com/drive) - Cloud storage

---

<p align="center">
  <strong>Built with ❤️ using React Native + Expo</strong>
</p>
