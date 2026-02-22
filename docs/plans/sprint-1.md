# Sprint 1 Plan - Authentication & Home Foundation

**Sprint:** 1  
**Duration:** 2 weeks  
**Start Date:** 2026-02-23  
**End Date:** 2026-03-08  
**Status:** 🔴 Planned

---

## 📋 Sprint Overview

### Goal
Establish project foundation with Tailwind CSS, implement mockup authentication flow, create home screen, and set up Google Drive folder structure.

### Focus
- Project setup with NativeWind (Tailwind)
- Mockup login screen with Google OAuth UI
- Home screen with backup status
- Folder selection mockup
- Google Drive integration setup

---

## 📦 User Stories

| ID | Story | Priority | Points | Status | Assignee |
|----|-------|----------|--------|--------|----------|
| US-1 | As a user, I want to see a login screen with Google sign-in | P0 | 5 | 🔴 To Do | - |
| US-2 | As a user, I want to navigate to home after login | P0 | 3 | 🔴 To Do | - |
| US-3 | As a user, I want to see my backup status on home | P0 | 5 | 🔴 To Do | - |
| US-4 | As a user, I want to select folders for backup | P0 | 5 | 🔴 To Do | - |
| US-5 | As a user, I want to trigger sync manually | P0 | 3 | 🔴 To Do | - |

**Total Points:** 21  
**Capacity:** 24 points (1 developer, 2 weeks)

---

## ✅ Tasks

### Task 1.1: Project Setup with Tailwind

**Related Story:** US-1, US-2, US-3  
**Estimated Hours:** 8  
**Status:** 🔴 To Do

```
[ ] Install NativeWind and Tailwind CSS
    - npx expo install nativewind tailwindcss
[ ] Configure tailwind.config.ts with cyber-gold theme
[ ] Setup babel.config.js for NativeWind
[ ] Create nativewind-env.d.ts for TypeScript
[ ] Configure TypeScript strict mode
[ ] Setup ESLint with Expo config
[ ] Configure Husky pre-commit hooks
[ ] Setup folder structure (src/, models/, services/, etc.)
[ ] Install Poppins fonts and configure
```

**Acceptance Criteria:**
- [ ] `npm run lint` passes with no errors
- [ ] TypeScript compiles with no errors
- [ ] Tailwind classes work in components
- [ ] Cyber-gold theme colors available
- [ ] Poppins fonts load correctly

---

### Task 1.2: Mockup Login Screen

**Related Story:** US-1  
**Estimated Hours:** 6  
**Status:** 🔴 To Do

```
[ ] Create app/(auth)/login.tsx
[ ] Design cyber-gold themed login UI
[ ] Add app logo with gold glow effect
[ ] Implement "Sign in with Google" button
[ ] Add loading state animation
[ ] Add terms/privacy footer
[ ] Setup Expo Router auth route
[ ] Create mock authentication function
```

**Acceptance Criteria:**
- [ ] UI matches cyber-gold theme design
- [ ] Logo displays with gold glow
- [ ] Google sign-in button styled properly
- [ ] Button shows loading state
- [ ] Navigation configured in Expo Router

**UI Components:**
```tsx
- Logo (gradient circle with icon)
- Title "CloudMemoryStick"
- Subtitle "Backup your emulator data"
- Google Sign-in Button (gold primary)
- Terms footer text
```

---

### Task 1.3: Mockup Home Screen

**Related Story:** US-2, US-3  
**Estimated Hours:** 8  
**Status:** 🔴 To Do

```
[ ] Create app/(tabs)/index.tsx
[ ] Design home screen layout
[ ] Create status card with gold gradient
[ ] Display backup statistics (mock data)
- Last backup time
- Total backups count
- Storage used
[ ] Add quick action buttons (Scan, Backup)
[ ] Create recent backups section
[ ] Add sync status indicator
[ ] Implement pull-to-refresh
[ ] Setup tab navigation
```

**Acceptance Criteria:**
- [ ] Home screen displays correctly
- [ ] Status card shows gold gradient
- [ ] Mock data displays properly
- [ ] Quick action buttons functional (mock)
- [ ] Sync status indicator visible
- [ ] Pull-to-refresh works

**UI Sections:**
```tsx
1. Header (app title)
2. Status Card (gold gradient)
   - Last backup
   - Total backups
   - Storage used
3. Quick Actions Card
   - Scan button
   - Backup button
4. Recent Backups Card
5. Sync Status Card
```

---

### Task 1.4: Folder Selection Mockup

**Related Story:** US-4  
**Estimated Hours:** 6  
**Status:** 🔴 To Do

```
[ ] Create app/folder-select.tsx
[ ] Design folder list UI
[ ] Create mock emulator folder data
[ ] Implement folder item component
- Folder name
- Path
- Size
- Checkbox for selection
[ ] Add select all functionality
[ ] Create continue button
[ ] Add scan animation placeholder
```

**Acceptance Criteria:**
- [ ] Folder list displays mock data
- [ ] Checkboxes toggle selection
- [ ] Select all works
- [ ] Continue button enabled when folders selected
- [ ] Navigation to/from home works

**Mock Data Structure:**
```typescript
const mockFolders = [
  {
    id: '1',
    name: 'Android Studio Emulator',
    path: '/Android/data/com.android.emulator/',
    size: '2.4 GB',
    fileCount: 1240,
    selected: false,
  },
  {
    id: '2',
    name: 'Genymotion',
    path: '/Android/data/com.genymotion/',
    size: '1.8 GB',
    fileCount: 856,
    selected: false,
  },
];
```

---

### Task 1.5: Sync Data Mockup

**Related Story:** US-5  
**Estimated Hours:** 6  
**Status:** 🔴 To Do

```
[ ] Create app/sync.tsx
[ ] Design sync progress UI
[ ] Create progress card with gold glow
[ ] Display sync statistics
- Files synced
- Total size
- Upload speed
- ETA
[ ] Add progress bar animation
[ ] Create file list with status
- Pending
- Syncing
- Completed
- Failed
[ ] Add pause/resume button
[ ] Add cancel button
```

**Acceptance Criteria:**
- [ ] Progress displays correctly
- [ ] Progress bar animates
- [ ] File status updates (mock)
- [ ] Pause/resume toggles
- [ ] Cancel stops sync (mock)

**UI Components:**
```tsx
1. Progress Card (gold gradient)
   - Circular progress or linear bar
   - Percentage
   - Files completed / total
2. Stats Row
   - Speed
   - ETA
   - Size
3. File List
   - Current file
   - Status indicators
4. Action Buttons
   - Pause/Resume
   - Cancel
```

---

### Task 1.6: Google Drive Integration Setup

**Related Story:** US-2, US-5  
**Estimated Hours:** 8  
**Status:** 🔴 To Do

```
[ ] Install expo-auth-session
[ ] Install expo-secure-store
[ ] Setup Google Cloud Project
- Enable Drive API v3
- Create OAuth2 credentials
- Configure consent screen
[ ] Configure Keycloak (or mock for now)
- Create realm
- Setup Google identity provider
- Configure OAuth2 client
[ ] Create GoogleDriveService class skeleton
- getOrCreateRootFolder()
- uploadFile()
- listFiles()
[ ] Create "CloudMemoryStick" folder in Drive (manual for now)
[ ] Store folder ID in config
```

**Acceptance Criteria:**
- [ ] Google Cloud Project configured
- [ ] Drive API enabled
- [ ] OAuth credentials stored in .env
- [ ] Service class created with interface
- [ ] CloudMemoryStick folder exists in Drive
- [ ] Folder ID documented

**Google Drive Structure:**
```
Google Drive/
└── CloudMemoryStick/          # Root backup folder
    ├── Android_Studio_2026-02-22/
    │   ├── data/
    │   ├── cache/
    │   └── metadata.json
    └── Genymotion_2026-02-22/
        ├── data/
        └── metadata.json
```

---

### Task 1.7: Core Components Library

**Related Story:** US-1, US-2, US-3, US-4, US-5  
**Estimated Hours:** 10  
**Status:** 🔴 To Do

```
[ ] Create Button component (primary, secondary, outline, ghost)
[ ] Create Card component (default, elevated, outlined, gold)
[ ] Create Input component
[ ] Create Badge component
[ ] Create LoadingSpinner component
[ ] Create ProgressBar component
[ ] Create FolderItem component
[ ] Create SyncStatus component
[ ] Export all from components/ui/index.ts
```

**Acceptance Criteria:**
- [ ] All components use Tailwind classes
- [ ] Cyber-gold theme applied
- [ ] Components are reusable
- [ ] Props properly typed
- [ ] Accessible (a11y props)

---

### Task 1.8: Navigation Setup

**Related Story:** US-1, US-2  
**Estimated Hours:** 4  
**Status:** 🔴 To Do

```
[ ] Configure Expo Router
[ ] Create app/(tabs)/_layout.tsx
[ ] Setup tab bar with cyber-gold theme
[ ] Create tabs: Home, History, Settings
[ ] Add auth guard (redirect to login if not authenticated)
[ ] Create navigation utility functions
```

**Acceptance Criteria:**
- [ ] Tab navigation works
- [ ] Tab bar styled with theme
- [ ] Auth guard redirects properly
- [ ] Deep linking configured

---

### Task 1.9: Testing & Polish

**Related Story:** All  
**Estimated Hours:** 6  
**Status:** 🔴 To Do

```
[ ] Test all screens on Android emulator
[ ] Test navigation flows
[ ] Test button interactions
[ ] Verify theme colors render correctly
[ ] Check accessibility (screen reader)
[ ] Fix any visual bugs
[ ] Update README with setup instructions
```

**Acceptance Criteria:**
- [ ] No crashes on navigation
- [ ] All buttons respond to touch
- [ ] Theme displays correctly
- [ ] No visual glitches
- [ ] README updated

---

## 🧪 Testing Requirements

| Test Type | Coverage Target | Status |
|-----------|-----------------|--------|
| Component Tests | Key components | 🔴 Pending |
| Navigation Tests | All flows | 🔴 Pending |
| Manual Testing | Full app | 🔴 Pending |

### Test Cases

```
[ ] TC-UI-01: Login screen renders correctly
[ ] TC-UI-02: Home screen displays mock data
[ ] TC-UI-03: Folder selection toggles work
[ ] TC-UI-04: Sync progress animates
[ ] TC-NAV-01: Login → Home navigation
[ ] TC-NAV-02: Home → Folder Select navigation
[ ] TC-NAV-03: Folder Select → Sync navigation
[ ] TC-THEME-01: Gold colors render correctly
[ ] TC-THEME-02: Dark background displays
[ ] TC-A11Y-01: Screen reader announces buttons
```

---

## 📅 Sprint Calendar

| Week | Dates | Focus |
|------|-------|-------|
| 1 | 02/23 - 03/01 | Setup + Login + Home + Components |
| 2 | 03/02 - 03/08 | Folder Select + Sync + Drive Setup + Polish |

### Key Dates
- **Sprint Planning:** 02/23
- **Mid-Sprint Review:** 02/27
- **Component Freeze:** 03/05
- **Sprint Review:** 03/08
- **Retrospective:** 03/08

---

## 🚧 Blockers & Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| NativeWind compatibility issues | High | Medium | Test early, fallback to StyleSheet |
| Google OAuth setup complexity | Medium | Medium | Use mock auth initially |
| Tailwind class performance | Medium | Low | Profile and optimize if needed |
| Font loading delays | Low | Low | Show loading state, cache fonts |

---

## 📊 Definition of Done

- [ ] All screens implemented with mock data
- [ ] Navigation flows working
- [ ] Components use Tailwind classes
- [ ] Cyber-gold theme applied consistently
- [ ] Google Drive folder created
- [ ] Manual testing complete
- [ ] No critical bugs
- [ ] README updated

---

## 📝 Notes

### Dependencies
```json
{
  "nativewind": "^4.0.0",
  "tailwindcss": "^3.4.0",
  "expo-auth-session": "~6.0.0",
  "expo-secure-store": "~14.0.0",
  "expo-font": "~14.0.0"
}
```

### Environment Variables

```env
# .env.example

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-secret

# Google Drive
GOOGLE_DRIVE_FOLDER_ID=cloudmemorystick-folder-id

# Keycloak (if using)
KEYCLOAK_ISSUER=https://your-keycloak.com/realms/your-realm
KEYCLOAK_CLIENT_ID=cloudmemorystick
KEYCLOAK_REDIRECT_URI=cloudmemorystick://auth
```

### Technical Decisions

- **NativeWind over StyleSheet**: Better reusability, Tailwind ecosystem
- **Mock data first**: Faster iteration, decouple UI from backend
- **Expo Router**: File-based routing, better DX
- **Cyber-Gold theme**: Unique visual identity, premium feel

### Screen Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Splash    │────▶│   Login     │────▶│    Home     │
│   Screen    │     │   Screen    │     │   Screen    │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                    ┌─────────────────────────┼─────────┐
                    │                         │         │
                    ▼                         ▼         ▼
             ┌─────────────┐           ┌───────────┐  ┌────────┐
             │   Folder    │           │  History  │  │Settings│
             │  Selection  │           │  Screen   │  │ Screen │
             └─────────────┘           └───────────┘  └────────┘
                    │
                    ▼
             ┌─────────────┐
             │    Sync     │
             │   Screen    │
             └─────────────┘
```

---

## 🔗 Related Documents

- [PRD](../PRD.md) - User Stories US-1 through US-5
- [TDD](../TDD.md) - Architecture, Services
- [Roadmap](./ROADMAP.md) - Phase 1, Sprint 1
- [Design Rules](../../.qwen/steering/design-rules.md) - Cyber-Gold Theme
- [Steering Constitution](../../.qwen/steering/STEERING_CONSTITUTION.md) - MVVM Architecture

---

*Created: 2026-02-22 | Last Updated: 2026-02-22*
