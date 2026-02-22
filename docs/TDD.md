# Technical Design Document (TDD)
# CloudMemoryStick - Android Emulator Cloud Backup

**Version:** 1.0.0  
**Date:** February 22, 2026  
**Status:** Draft  
**Author:** Development Team

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [System Architecture](#2-system-architecture)
3. [Data Models](#3-data-models)
4. [Service Layer Design](#4-service-layer-design)
5. [ViewModel Layer Design](#5-viewmodel-layer-design)
6. [View Layer Design](#6-view-layer-design)
7. [Database Design](#7-database-design)
8. [API Integration](#8-api-integration)
9. [Security Design](#9-security-design)
10. [File System Operations](#10-file-system-operations)
11. [Background Sync Design](#11-background-sync-design)
12. [Error Handling](#12-error-handling)
13. [Testing Strategy](#13-testing-strategy)
14. [Dependencies](#14-dependencies)
15. [Implementation Roadmap](#15-implementation-roadmap)

---

## 1. Architecture Overview

### 1.1 Architectural Pattern

This application follows the **MVVM (Model-ViewModel-View)** pattern with **3-Tier Architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Screens   │  │ Components  │  │    Hooks    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    BUSINESS LOGIC LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Auth VM   │  │  Backup VM  │  │  History VM │         │
│  │   Sync VM   │  │  Settings VM│  │   Base VM   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                       DATA LAYER                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Models    │  │  Services   │  │ Repositories│         │
│  │  Entities   │  │   (API)     │  │  (Storage)  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Directory Structure

```
CloudMemoryStick/
├── app/                              # Expo Router screens
│   ├── (auth)/                       # Auth flow screens
│   │   ├── login.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/                       # Main app tabs
│   │   ├── index.tsx                 # Home screen
│   │   ├── history.tsx               # Backup history
│   │   ├── settings.tsx              # Settings
│   │   └── _layout.tsx
│   ├── backup/                       # Backup detail screen
│   │   └── [id].tsx
│   └── _layout.tsx                   # Root layout
│
├── src/
│   ├── models/                       # Data Layer - Models
│   │   ├── entities/
│   │   │   ├── user.ts
│   │   │   ├── backup.ts
│   │   │   ├── emulator.ts
│   │   │   └── sync-job.ts
│   │   ├── interfaces/
│   │   │   ├── auth-service.ts
│   │   │   ├── drive-service.ts
│   │   │   ├── file-service.ts
│   │   │   └── repository.ts
│   │   └── dtos/
│   │       ├── token.dto.ts
│   │       └── drive-file.dto.ts
│   │
│   ├── services/                     # Data Layer - Services
│   │   ├── api/
│   │   │   ├── keycloak.service.ts
│   │   │   └── google-drive.service.ts
│   │   ├── storage/
│   │   │   ├── secure-storage.service.ts
│   │   │   └── database.service.ts
│   │   └── system/
│   │       ├── file-system.service.ts
│   │       ├── permission.service.ts
│   │       └── network.service.ts
│   │
│   ├── repositories/                 # Data Layer - Repositories
│   │   ├── auth.repository.ts
│   │   ├── backup.repository.ts
│   │   └── settings.repository.ts
│   │
│   ├── viewmodels/                   # Business Logic Layer
│   │   ├── base/
│   │   │   └── base-viewmodel.ts
│   │   └── features/
│   │       ├── auth.viewmodel.ts
│   │       ├── backup.viewmodel.ts
│   │       ├── history.viewmodel.ts
│   │       └── sync.viewmodel.ts
│   │
│   ├── views/                        # Presentation Layer
│   │   ├── screens/
│   │   │   ├── login.screen.tsx
│   │   │   ├── home.screen.tsx
│   │   │   ├── history.screen.tsx
│   │   │   └── settings.screen.tsx
│   │   └── components/
│   │       ├── common/
│   │       │   ├── button.tsx
│   │       │   ├── card.tsx
│   │       │   ├── input.tsx
│   │       │   └── loading.tsx
│   │       └── features/
│   │           ├── emulator-list.tsx
│   │           ├── backup-progress.tsx
│   │           └── sync-status.tsx
│   │
│   └── core/                         # Cross-cutting concerns
│       ├── navigation/
│       ├── theme/
│       │   ├── colors.ts
│       │   └── typography.ts
│       └── utils/
│           ├── formatters.ts
│           └── validators.ts
│
├── hooks/                            # Shared React hooks
│   ├── use-auth.ts
│   ├── use-backup.ts
│   └── use-sync.ts
│
├── constants/
│   ├── config.ts
│   └── routes.ts
│
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 2. System Architecture

### 2.1 Component Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         CloudMemoryStick                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│  │   Login     │    │    Home     │    │   History   │          │
│  │   Screen    │    │   Screen    │    │   Screen    │          │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘          │
│         │                  │                  │                  │
│         ▼                  ▼                  ▼                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│  │    Auth     │    │   Backup    │    │   History   │          │
│  │  ViewModel  │    │  ViewModel  │    │  ViewModel  │          │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘          │
│         │                  │                  │                  │
│         ▼                  ▼                  ▼                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Service Layer                          │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │ Keycloak │  │  Google  │  │   File   │  │  Local   │   │    │
│  │  │ Service  │  │  Drive   │  │  System  │  │   DB     │   │    │
│  │  │          │  │ Service  │  │ Service  │  │ Service  │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
      ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
      │   Keycloak   │ │  Google API  │ │ Local Storage│
      │    Server    │ │   (Drive)    │ │   (SQLite)   │
      └──────────────┘ └──────────────┘ └──────────────┘
```

### 2.2 Data Flow

```
User Action → View → ViewModel → Service → External API/Storage
                                            │
                                            ▼
                                      Response/Data
                                            │
                                            ▼
User Update ← View ← ViewModel ← Service ← Processed Data
```

---

## 3. Data Models

### 3.1 User Entity

```typescript
// src/models/entities/user.ts

export interface User {
  /** Unique user identifier from Keycloak */
  id: string;
  /** User's email address */
  email: string;
  /** User's display name */
  displayName: string;
  /** Profile picture URL */
  avatarUrl?: string;
  /** Google Drive user ID */
  googleDriveUserId?: string;
  /** Account creation timestamp */
  createdAt: Date;
  /** Last login timestamp */
  lastLoginAt: Date;
  /** Account status */
  status: UserStatus;
}

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface AuthTokens {
  /** OAuth2 access token */
  accessToken: string;
  /** OAuth2 refresh token */
  refreshToken: string;
  /** Token expiration timestamp */
  expiresAt: Date;
  /** Refresh token expiration */
  refreshExpiresAt: Date;
  /** Token type (Bearer) */
  tokenType: string;
  /** Granted scopes */
  scope: string[];
}
```

### 3.2 Backup Entity

```typescript
// src/models/entities/backup.ts

export interface Backup {
  /** Unique backup identifier */
  id: string;
  /** User who created the backup */
  userId: string;
  /** Emulator folder path */
  emulatorPath: string;
  /** Emulator name/type */
  emulatorName: string;
  /** Google Drive folder ID */
  driveFolderId: string;
  /** Google Drive folder URL */
  driveFolderUrl: string;
  /** Total backup size in bytes */
  totalSize: number;
  /** Total file count */
  fileCount: number;
  /** Backup status */
  status: BackupStatus;
  /** Backup start timestamp */
  startedAt: Date;
  /** Backup completion timestamp */
  completedAt?: Date;
  /** Error message if failed */
  errorMessage?: string;
  /** Files included in backup */
  files: BackupFile[];
}

export type BackupStatus = 
  | 'pending'
  | 'scanning'
  | 'uploading'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface BackupFile {
  /** Relative file path */
  path: string;
  /** File size in bytes */
  size: number;
  /** File MIME type */
  mimeType?: string;
  /** Google Drive file ID */
  driveFileId: string;
  /** File hash for integrity check */
  hash?: string;
  /** Upload status */
  status: 'pending' | 'uploaded' | 'failed';
  /** Error message if failed */
  error?: string;
}

export interface BackupProgress {
  /** Current status */
  status: BackupStatus;
  /** Percentage complete (0-100) */
  percentage: number;
  /** Files uploaded / Total files */
  filesCompleted: number;
  filesTotal: number;
  /** Bytes uploaded / Total bytes */
  bytesUploaded: number;
  bytesTotal: number;
  /** Upload speed in bytes/second */
  speed?: number;
  /** Estimated time remaining in seconds */
  eta?: number;
  /** Current file being uploaded */
  currentFile?: string;
  /** Error message if any */
  error?: string;
}
```

### 3.3 Emulator Entity

```typescript
// src/models/entities/emulator.ts

export interface Emulator {
  /** Unique identifier */
  id: string;
  /** Emulator type/name */
  name: EmulatorType;
  /** Full folder path */
  path: string;
  /** Total size in bytes */
  size: number;
  /** Total file count */
  fileCount: number;
  /** Last modified timestamp */
  lastModified: Date;
  /** Whether it's selected for backup */
  isSelected: boolean;
  /** Whether auto-sync is enabled */
  autoSyncEnabled: boolean;
  /** Last backup timestamp */
  lastBackupAt?: Date;
  /** Last sync timestamp */
  lastSyncAt?: Date;
  /** Sync status */
  syncStatus: SyncStatus;
}

export type EmulatorType =
  | 'android-studio'
  | 'genymotion'
  | 'bluestacks'
  | 'ldplayer'
  | 'nox'
  | 'memu'
  | 'unknown';

export type SyncStatus = 
  | 'idle'
  | 'monitoring'
  | 'syncing'
  | 'error';

export interface EmulatorScanResult {
  /** Whether scan was successful */
  success: boolean;
  /** List of detected emulators */
  emulators: Emulator[];
  /** Scan timestamp */
  scannedAt: Date;
  /** Error message if failed */
  error?: string;
}
```

### 3.4 Sync Job Entity

```typescript
// src/models/entities/sync-job.ts

export interface SyncJob {
  /** Unique job identifier */
  id: string;
  /** Associated emulator ID */
  emulatorId: string;
  /** Job type */
  type: SyncJobType;
  /** Job status */
  status: SyncJobStatus;
  /** Files to sync */
  changes: FileChange[];
  /** Retry count */
  retryCount: number;
  /** Created timestamp */
  createdAt: Date;
  /** Last attempt timestamp */
  lastAttemptAt?: Date;
  /** Completed timestamp */
  completedAt?: Date;
  /** Error message if failed */
  error?: string;
}

export type SyncJobType = 'upload' | 'delete' | 'update';

export type SyncJobStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface FileChange {
  /** File path relative to emulator root */
  path: string;
  /** Change type */
  changeType: 'created' | 'modified' | 'deleted';
  /** File size */
  size: number;
  /** File hash */
  hash?: string;
  /** Last modified timestamp */
  lastModified: Date;
}

export interface SyncSettings {
  /** Enable/disable auto-sync globally */
  enabled: boolean;
  /** Sync only on WiFi */
  wifiOnly: boolean;
  /** Sync interval in minutes */
  intervalMinutes: number;
  /** Enable notifications */
  notifications: boolean;
  /** Battery optimization respected */
  respectBattery: boolean;
}
```

### 3.5 History Entry Entity

```typescript
// src/models/entities/history.ts

export interface HistoryEntry {
  /** Unique entry identifier */
  id: string;
  /** Entry type */
  type: HistoryType;
  /** Related backup ID */
  backupId?: string;
  /** Related sync job ID */
  syncJobId?: string;
  /** Entry title */
  title: string;
  /** Entry description */
  description: string;
  /** Entry status */
  status: 'success' | 'warning' | 'error' | 'info';
  /** Timestamp */
  timestamp: Date;
  /** Additional data */
  metadata?: Record<string, unknown>;
}

export type HistoryType = 
  | 'backup_started'
  | 'backup_completed'
  | 'backup_failed'
  | 'sync_started'
  | 'sync_completed'
  | 'sync_failed'
  | 'login'
  | 'logout'
  | 'settings_changed';
```

---

## 4. Service Layer Design

### 4.1 Keycloak Authentication Service

```typescript
// src/services/api/keycloak.service.ts

import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

export interface KeycloakConfig {
  realm: string;
  clientId: string;
  issuer: string;
  redirectUri: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  refreshExpiresAt: Date;
}

class KeycloakAuthService {
  private config: KeycloakConfig;
  private discovery: AuthSession.AuthSessionDiscovery | null;

  constructor(config: KeycloakConfig) {
    this.config = config;
    this.discovery = null;
  }

  /**
   * Initialize the authentication service
   */
  async initialize(): Promise<void> {
    this.discovery = await AuthSession.loadAsyncOptions({
      issuer: this.config.issuer,
    });
  }

  /**
   * Start OAuth2 login flow with Google provider
   */
  async login(): Promise<TokenResponse> {
    const redirectUri = AuthSession.makeRedirectUri({
      path: this.config.redirectUri,
    });

    const result = await AuthSession.startAsync({
      discovery: this.discovery!,
      clientId: this.config.clientId,
      redirectUri,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      extraParams: {
        provider: 'google',
      },
    });

    if (result.type !== 'success') {
      throw new Error('Authentication failed');
    }

    const tokens = this.processTokenResponse(result.params);
    await this.saveTokens(tokens);

    return tokens;
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<TokenResponse> {
    const refreshToken = await SecureStore.getItemAsync('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.config.issuer}/protocol/openid-connect/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.config.clientId,
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    const tokens = this.processTokenResponse(data);
    await this.saveTokens(tokens);

    return tokens;
  }

  /**
   * Logout and clear tokens
   */
  async logout(): Promise<void> {
    const idToken = await SecureStore.getItemAsync('id_token');
    
    // Clear local tokens
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await SecureStore.deleteItemAsync('id_token');
    await SecureStore.deleteItemAsync('user_info');

    // Revoke tokens with Keycloak
    if (idToken) {
      await fetch(
        `${this.config.issuer}/protocol/openid-connect/logout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: this.config.clientId,
            refresh_token: await SecureStore.getItemAsync('refresh_token') || '',
          }),
        }
      );
    }
  }

  /**
   * Get current access token (refresh if needed)
   */
  async getAccessToken(): Promise<string> {
    const expiresAt = await SecureStore.getItemAsync('token_expires_at');
    
    if (!expiresAt || new Date(expiresAt) < new Date(Date.now() + 5 * 60 * 1000)) {
      // Token expires in less than 5 minutes, refresh
      return (await this.refreshToken()).accessToken;
    }

    const token = await SecureStore.getItemAsync('access_token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    return token;
  }

  /**
   * Get current user info
   */
  async getUserInfo(): Promise<User> {
    const token = await this.getAccessToken();
    
    const response = await fetch(
      `${this.config.issuer}/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    return this.mapToUser(data);
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      if (!token) return false;

      const expiresAt = await SecureStore.getItemAsync('token_expires_at');
      if (!expiresAt) return false;

      return new Date(expiresAt) > new Date();
    } catch {
      return false;
    }
  }

  private processTokenResponse(data: Record<string, any>): TokenResponse {
    const now = Date.now();
    
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: new Date(now + data.expires_in * 1000),
      refreshExpiresAt: new Date(now + data.refresh_expires_in * 1000),
    };
  }

  private async saveTokens(tokens: TokenResponse): Promise<void> {
    await SecureStore.setItemAsync('access_token', tokens.accessToken);
    await SecureStore.setItemAsync('refresh_token', tokens.refreshToken);
    await SecureStore.setItemAsync('token_expires_at', tokens.expiresAt.toISOString());
    await SecureStore.setItemAsync('refresh_expires_at', tokens.refreshExpiresAt.toISOString());
  }

  private mapToUser(data: any): User {
    return {
      id: data.sub,
      email: data.email,
      displayName: data.name,
      avatarUrl: data.picture,
      status: 'active',
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
  }
}

export default KeycloakAuthService;
```

### 4.2 Google Drive Service

```typescript
// src/services/api/google-drive.service.ts

import { Request } from 'googleapis';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime: string;
  modifiedTime: string;
  parents?: string[];
  webViewLink: string;
}

export interface UploadOptions {
  fileName: string;
  mimeType: string;
  content: Blob | Uint8Array;
  parentId?: string;
  onProgress?: (progress: UploadProgress) => void;
}

export interface UploadProgress {
  bytesUploaded: number;
  bytesTotal: number;
  percentage: number;
}

class GoogleDriveService {
  private accessTokenProvider: () => Promise<string>;

  constructor(accessTokenProvider: () => Promise<string>) {
    this.accessTokenProvider = accessTokenProvider;
  }

  /**
   * Get user's Drive information
   */
  async getDriveInfo(): Promise<{ user: string; quota: number }> {
    const token = await this.accessTokenProvider();
    
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/about?fields=user,storageQuota',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Drive info');
    }

    return response.json();
  }

  /**
   * Create or get CloudMemoryStick root folder
   */
  async getOrCreateRootFolder(): Promise<string> {
    const folderName = 'CloudMemoryStick';
    
    // Search for existing folder
    const existing = await this.searchFolder(folderName, 'root');
    
    if (existing.length > 0) {
      return existing[0].id;
    }

    // Create new folder
    return this.createFolder(folderName, 'root');
  }

  /**
   * Create folder in Drive
   */
  async createFolder(name: string, parentId: string): Promise<string> {
    const token = await this.accessTokenProvider();

    const response = await fetch(
      'https://www.googleapis.com/drive/v3/files',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [parentId],
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create folder');
    }

    const data = await response.json();
    return data.id;
  }

  /**
   * Search for folders by name
   */
  async searchFolder(name: string, parentId?: string): Promise<DriveFile[]> {
    const token = await this.accessTokenProvider();
    
    let query = `mimeType='application/vnd.google-apps.folder' and name='${name}' and trashed=false`;
    if (parentId) {
      query += ` and '${parentId}' in parents`;
    }

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,createdTime)`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search folders');
    }

    const data = await response.json();
    return data.files;
  }

  /**
   * Upload file to Drive with progress tracking
   */
  async uploadFile(options: UploadOptions): Promise<DriveFile> {
    const token = await this.accessTokenProvider();
    
    const metadata = {
      name: options.fileName,
      parents: options.parentId ? [options.parentId] : [],
    };

    const boundary = 'cloudmemorystick_upload_boundary';
    const delimiter = `--${boundary}`;
    const newLine = '\r\n';

    const metadataPart = delimiter + newLine +
      'Content-Type: application/json; charset=utf-8' + newLine + newLine +
      JSON.stringify(metadata) + newLine;

    const filePart = delimiter + newLine +
      'Content-Type: ' + options.mimeType + newLine + newLine;

    // Calculate total size
    const metadataBytes = new TextEncoder().encode(metadataPart);
    const fileBytes = options.content instanceof Uint8Array 
      ? options.content 
      : new Uint8Array(await (options.content as Blob).arrayBuffer());
    const closingDelimiter = new TextEncoder().encode(newLine + delimiter + '--' + newLine);
    
    const totalSize = metadataBytes.length + fileBytes.length + filePart.length + closingDelimiter.length;

    // Create readable stream for upload
    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,size,mimeType,createdTime,modifiedTime,webViewLink',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: new Blob([metadataPart, filePart, fileBytes, closingDelimiter]),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    return response.json();
  }

  /**
   * Upload file using resumable upload for large files
   */
  async uploadFileResumable(options: UploadOptions): Promise<DriveFile> {
    const token = await this.accessTokenProvider();
    
    // Step 1: Initiate resumable upload
    const initResponse = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: options.fileName,
          parents: options.parentId ? [options.parentId] : [],
        }),
      }
    );

    if (!initResponse.ok) {
      throw new Error('Failed to initiate upload');
    }

    const uploadUrl = initResponse.headers.get('Location')!;

    // Step 2: Upload file content
    const content = options.content instanceof Uint8Array
      ? options.content
      : new Uint8Array(await (options.content as Blob).arrayBuffer());

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': options.mimeType,
        'Content-Range': `bytes 0-${content.length - 1}/${content.length}`,
      },
      body: content,
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to complete upload');
    }

    return uploadResponse.json();
  }

  /**
   * Delete file from Drive
   */
  async deleteFile(fileId: string): Promise<void> {
    const token = await this.accessTokenProvider();

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete file');
    }
  }

  /**
   * List files in folder
   */
  async listFiles(parentId: string): Promise<DriveFile[]> {
    const token = await this.accessTokenProvider();
    
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${parentId}' in parents and trashed=false&fields=files(id,name,mimeType,size,createdTime,modifiedTime)`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to list files');
    }

    const data = await response.json();
    return data.files;
  }
}

export default GoogleDriveService;
```

### 4.3 File System Service

```typescript
// src/services/system/file-system.service.ts

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export interface FileInfo {
  path: string;
  name: string;
  size: number;
  mimeType?: string;
  lastModified: Date;
  isDirectory: boolean;
}

export interface ScanOptions {
  basePath: string;
  recursive?: boolean;
  maxDepth?: number;
  includePatterns?: string[];
  excludePatterns?: string[];
}

class FileSystemService {
  /**
   * Known emulator folder locations
   */
  private emulatorPaths: string[] = [
    '/Android/data/com.android.emulator/',
    '/Android/data/com.genymotion/',
    '/Android/data/com.bluestacks/',
    '/Android/data/com.ldplayer/',
    '/Android/data/com.noxplayer/',
    '/Android/data/com.memu/',
    '/sdcard/Android/data/',
  ];

  /**
   * Scan for emulator folders
   */
  async scanForEmulators(): Promise<EmulatorScanResult> {
    try {
      const emulators: Emulator[] = [];

      for (const basePath of this.emulatorPaths) {
        const exists = await this.folderExists(basePath);
        
        if (exists) {
          const emulatorType = this.detectEmulatorType(basePath);
          const stats = await this.getFolderStats(basePath);
          
          emulators.push({
            id: this.generateId(basePath),
            name: emulatorType,
            path: basePath,
            size: stats.totalSize,
            fileCount: stats.fileCount,
            lastModified: stats.lastModified,
            isSelected: false,
            autoSyncEnabled: false,
            syncStatus: 'idle',
          });
        }
      }

      return {
        success: true,
        emulators,
        scannedAt: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        emulators: [],
        scannedAt: new Date(),
        error: error instanceof Error ? error.message : 'Scan failed',
      };
    }
  }

  /**
   * Get folder statistics
   */
  async getFolderStats(path: string): Promise<{
    totalSize: number;
    fileCount: number;
    lastModified: Date;
  }> {
    let totalSize = 0;
    let fileCount = 0;
    let lastModified = new Date(0);

    const scanFolder = async (folderPath: string) => {
      const entries = await FileSystem.readDirectoryAsync(folderPath);
      
      for (const entry of entries) {
        const fullPath = `${folderPath}${entry}`;
        const info = await FileSystem.getInfoAsync(fullPath);
        
        if (info.exists) {
          if (info.isDirectory) {
            await scanFolder(fullPath + '/');
          } else {
            totalSize += info.size || 0;
            fileCount++;
            const modified = new Date(info.modificationTime || 0);
            if (modified > lastModified) {
              lastModified = modified;
            }
          }
        }
      }
    };

    await scanFolder(path);

    return { totalSize, fileCount, lastModified };
  }

  /**
   * List files in folder
   */
  async listFiles(path: string, recursive: boolean = false): Promise<FileInfo[]> {
    const files: FileInfo[] = [];

    const scanFolder = async (folderPath: string) => {
      const entries = await FileSystem.readDirectoryAsync(folderPath);
      
      for (const entry of entries) {
        const fullPath = `${folderPath}${entry}`;
        const info = await FileSystem.getInfoAsync(fullPath);
        
        if (info.exists) {
          files.push({
            path: fullPath,
            name: entry,
            size: info.size || 0,
            lastModified: new Date(info.modificationTime || 0),
            isDirectory: info.isDirectory || false,
          });

          if (info.isDirectory && recursive) {
            await scanFolder(fullPath + '/');
          }
        }
      }
    };

    await scanFolder(path);
    return files;
  }

  /**
   * Read file content
   */
  async readFile(path: string): Promise<Uint8Array> {
    const base64 = await FileSystem.readAsStringAsync(path, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Convert base64 to Uint8Array
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes;
  }

  /**
   * Check if folder exists
   */
  async folderExists(path: string): Promise<boolean> {
    try {
      const info = await FileSystem.getInfoAsync(path);
      return info.exists && info.isDirectory;
    } catch {
      return false;
    }
  }

  /**
   * Request storage permissions
   */
  async requestPermissions(): Promise<boolean> {
    const { granted } = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    return granted;
  }

  private detectEmulatorType(path: string): EmulatorType {
    if (path.includes('com.android.emulator')) return 'android-studio';
    if (path.includes('com.genymotion')) return 'genymotion';
    if (path.includes('com.bluestacks')) return 'bluestacks';
    if (path.includes('com.ldplayer')) return 'ldplayer';
    if (path.includes('com.noxplayer')) return 'nox';
    if (path.includes('com.memu')) return 'memu';
    return 'unknown';
  }

  private generateId(path: string): string {
    return btoa(path).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  }
}

export default FileSystemService;
```

---

## 5. ViewModel Layer Design

### 5.1 Base ViewModel

```typescript
// src/viewmodels/base/base-viewmodel.ts

export type Unsubscribe = () => void;

export abstract class BaseViewModel<TState> {
  protected stateListeners: ((state: TState) => void)[] = [];
  protected _state: TState;

  constructor(initialState: TState) {
    this._state = initialState;
  }

  get state(): TState {
    return this._state;
  }

  /**
   * Update state partially
   */
  protected setState(newState: Partial<TState>): void {
    this._state = { ...this._state, ...newState };
    this.notifyStateChange();
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: TState) => void): Unsubscribe {
    this.stateListeners.push(listener);
    // Notify immediately with current state
    listener(this._state);
    
    return () => {
      this.stateListeners = this.stateListeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  protected notifyStateChange(): void {
    this.stateListeners.forEach(listener => listener(this._state));
  }

  /**
   * Cleanup resources
   */
  abstract dispose(): void;
}
```

### 5.2 Auth ViewModel

```typescript
// src/viewmodels/features/auth.viewmodel.ts

import { BaseViewModel } from './base/base-viewmodel';
import KeycloakAuthService from '@/services/api/keycloak.service';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export class AuthViewModel extends BaseViewModel<AuthState> {
  private authService: KeycloakAuthService;

  constructor(authService: KeycloakAuthService) {
    super(initialState);
    this.authService = authService;
  }

  /**
   * Initialize auth state from storage
   */
  async initialize(): Promise<void> {
    const isAuthenticated = await this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      try {
        const user = await this.authService.getUserInfo();
        this.setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        this.setState({
          error: 'Failed to load user info',
          isLoading: false,
        });
      }
    }
  }

  /**
   * Login with Google
   */
  async login(): Promise<boolean> {
    this.setState({ isLoading: true, error: null });

    try {
      const tokens = await this.authService.login();
      const user = await this.authService.getUserInfo();

      this.setState({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      return false;
    }
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    this.setState({ isLoading: true });

    try {
      await this.authService.logout();
      this.setState(initialState);
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Logout failed',
        isLoading: false,
      });
    }
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.setState({ error: null });
  }

  dispose(): void {
    this.stateListeners = [];
  }
}
```

### 5.3 Backup ViewModel

```typescript
// src/viewmodels/features/backup.viewmodel.ts

import { BaseViewModel } from './base/base-viewmodel';
import GoogleDriveService from '@/services/api/google-drive.service';
import FileSystemService from '@/services/system/file-system.service';
import { BackupRepository } from '@/repositories/backup.repository';

interface BackupState {
  emulators: Emulator[];
  selectedEmulatorIds: string[];
  isScanning: boolean;
  isUploading: boolean;
  progress: BackupProgress | null;
  currentBackup: Backup | null;
  error: string | null;
}

const initialState: BackupState = {
  emulators: [],
  selectedEmulatorIds: [],
  isScanning: false,
  isUploading: false,
  progress: null,
  currentBackup: null,
  error: null,
};

export class BackupViewModel extends BaseViewModel<BackupState> {
  private driveService: GoogleDriveService;
  private fileSystemService: FileSystemService;
  private backupRepository: BackupRepository;

  constructor(
    driveService: GoogleDriveService,
    fileSystemService: FileSystemService,
    backupRepository: BackupRepository
  ) {
    super(initialState);
    this.driveService = driveService;
    this.fileSystemService = fileSystemService;
    this.backupRepository = backupRepository;
  }

  /**
   * Scan for emulator folders
   */
  async scanForEmulators(): Promise<void> {
    this.setState({ isScanning: true, error: null });

    try {
      const result = await this.fileSystemService.scanForEmulators();
      
      if (result.success) {
        // Merge with existing selections
        const emulators = result.emulators.map(emulator => ({
          ...emulator,
          isSelected: this._state.selectedEmulatorIds.includes(emulator.id),
        }));

        this.setState({
          emulators,
          isScanning: false,
        });
      } else {
        this.setState({
          error: result.error || 'Scan failed',
          isScanning: false,
        });
      }
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Scan failed',
        isScanning: false,
      });
    }
  }

  /**
   * Toggle emulator selection
   */
  toggleEmulatorSelection(emulatorId: string): void {
    const { selectedEmulatorIds, emulators } = this._state;
    
    const isSelected = selectedEmulatorIds.includes(emulatorId);
    const newSelectedIds = isSelected
      ? selectedEmulatorIds.filter(id => id !== emulatorId)
      : [...selectedEmulatorIds, emulatorId];

    const updatedEmulators = emulators.map(e => ({
      ...e,
      isSelected: newSelectedIds.includes(e.id),
    }));

    this.setState({
      selectedEmulatorIds: newSelectedIds,
      emulators: updatedEmulators,
    });
  }

  /**
   * Start backup process
   */
  async startBackup(): Promise<void> {
    const { selectedEmulatorIds, emulators } = this._state;
    
    if (selectedEmulatorIds.length === 0) {
      this.setState({ error: 'No emulators selected' });
      return;
    }

    this.setState({ isUploading: true, error: null });

    try {
      const rootFolderId = await this.driveService.getOrCreateRootFolder();
      const selectedEmulators = emulators.filter(e => selectedEmulatorIds.includes(e.id));

      for (const emulator of selectedEmulators) {
        await this.backupEmulator(emulator, rootFolderId);
      }

      this.setState({
        isUploading: false,
        progress: null,
        currentBackup: null,
      });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Backup failed',
        isUploading: false,
      });
    }
  }

  /**
   * Backup single emulator
   */
  private async backupEmulator(
    emulator: Emulator,
    rootFolderId: string
  ): Promise<void> {
    // Create emulator folder in Drive
    const emulatorFolderId = await this.driveService.createFolder(
      `${emulator.name}_${new Date().toISOString().split('T')[0]}`,
      rootFolderId
    );

    // Create backup record
    const backup: Backup = {
      id: this.generateId(),
      userId: 'current-user',
      emulatorPath: emulator.path,
      emulatorName: emulator.name,
      driveFolderId: emulatorFolderId,
      driveFolderUrl: `https://drive.google.com/drive/folders/${emulatorFolderId}`,
      totalSize: emulator.size,
      fileCount: emulator.fileCount,
      status: 'uploading',
      startedAt: new Date(),
      files: [],
    };

    this.setState({ currentBackup: backup });

    // Get files to upload
    const files = await this.fileSystemService.listFiles(emulator.path, true);

    // Upload files
    let uploadedCount = 0;
    let uploadedBytes = 0;

    for (const file of files) {
      if (!file.isDirectory) {
        try {
          const content = await this.fileSystemService.readFile(file.path);
          
          await this.driveService.uploadFile({
            fileName: file.name,
            mimeType: file.mimeType || 'application/octet-stream',
            content,
            parentId: emulatorFolderId,
            onProgress: (progress) => {
              this.updateProgress({
                status: 'uploading',
                percentage: Math.round((uploadedBytes + progress.bytesUploaded) / emulator.size * 100),
                filesCompleted: uploadedCount,
                filesTotal: files.filter(f => !f.isDirectory).length,
                bytesUploaded: uploadedBytes + progress.bytesUploaded,
                bytesTotal: emulator.size,
                currentFile: file.name,
              });
            },
          });

          uploadedCount++;
          uploadedBytes += file.size;

          backup.files.push({
            path: file.path,
            size: file.size,
            driveFileId: 'file-id',
            status: 'uploaded',
          });
        } catch (error) {
          backup.files.push({
            path: file.path,
            size: file.size,
            driveFileId: '',
            status: 'failed',
            error: error instanceof Error ? error.message : 'Upload failed',
          });
        }
      }
    }

    // Update backup status
    backup.status = 'completed';
    backup.completedAt = new Date();
    backup.lastBackupAt = new Date();

    await this.backupRepository.save(backup);

    this.setState({
      progress: {
        status: 'completed',
        percentage: 100,
        filesCompleted: uploadedCount,
        filesTotal: files.filter(f => !f.isDirectory).length,
        bytesUploaded: uploadedBytes,
        bytesTotal: emulator.size,
      },
    });
  }

  /**
   * Update progress state
   */
  private updateProgress(progress: BackupProgress): void {
    this.setState({ progress });
  }

  /**
   * Cancel current backup
   */
  cancelBackup(): void {
    this.setState({
      isUploading: false,
      progress: null,
      currentBackup: null,
    });
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.setState({ error: null });
  }

  private generateId(): string {
    return `backup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  dispose(): void {
    this.stateListeners = [];
  }
}
```

---

## 6. View Layer Design

### 6.1 Screen Components Structure

```typescript
// app/(tabs)/index.tsx - Home Screen

import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useBackupViewModel } from '@/hooks/use-backup';
import { EmulatorList } from '@/views/components/features/emulator-list';
import { BackupProgress } from '@/views/components/features/backup-progress';
import { Button } from '@/views/components/common/button';
import { Card } from '@/views/components/common/card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const viewModel = useBackupViewModel();
  const [state, setState] = React.useState(viewModel.state);

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(setState);
    viewModel.scanForEmulators();
    return unsubscribe;
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedText type="title" style={styles.header}>
          Backup Emulator
        </ThemedText>

        <Card style={styles.section}>
          <ThemedText type="subtitle">Detected Emulators</ThemedText>
          <EmulatorList
            emulators={state.emulators}
            selectedIds={state.selectedEmulatorIds}
            onToggleSelection={viewModel.toggleEmulatorSelection}
            isLoading={state.isScanning}
          />
        </Card>

        {state.isUploading && state.progress && (
          <Card style={styles.section}>
            <BackupProgress progress={state.progress} />
          </Card>
        )}

        <Card style={styles.section}>
          <Button
            title="Scan for Emulators"
            onPress={() => viewModel.scanForEmulators()}
            disabled={state.isScanning || state.isUploading}
            variant="secondary"
          />
          <Button
            title="Start Backup"
            onPress={() => viewModel.startBackup()}
            disabled={state.selectedEmulatorIds.length === 0 || state.isUploading}
            variant="primary"
            style={styles.button}
          />
        </Card>

        {state.error && (
          <Card variant="outlined" style={styles.errorCard}>
            <ThemedText style={styles.errorText}>{state.error}</ThemedText>
          </Card>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
  },
  errorCard: {
    borderColor: '#FF3B3B',
  },
  errorText: {
    color: '#FF3B3B',
  },
});
```

---

## 7. Database Design

### 7.1 SQLite Schema

```sql
-- Database schema for local storage

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  google_drive_user_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME
);

-- Backups table
CREATE TABLE IF NOT EXISTS backups (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  emulator_path TEXT NOT NULL,
  emulator_name TEXT NOT NULL,
  drive_folder_id TEXT NOT NULL,
  drive_folder_url TEXT NOT NULL,
  total_size INTEGER NOT NULL,
  file_count INTEGER NOT NULL,
  status TEXT NOT NULL,
  started_at DATETIME NOT NULL,
  completed_at DATETIME,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Backup files table
CREATE TABLE IF NOT EXISTS backup_files (
  id TEXT PRIMARY KEY,
  backup_id TEXT NOT NULL,
  path TEXT NOT NULL,
  size INTEGER NOT NULL,
  mime_type TEXT,
  drive_file_id TEXT NOT NULL,
  hash TEXT,
  status TEXT NOT NULL,
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (backup_id) REFERENCES backups(id) ON DELETE CASCADE
);

-- Emulators table
CREATE TABLE IF NOT EXISTS emulators (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  size INTEGER NOT NULL,
  file_count INTEGER NOT NULL,
  last_modified DATETIME NOT NULL,
  is_selected INTEGER DEFAULT 0,
  auto_sync_enabled INTEGER DEFAULT 0,
  last_backup_at DATETIME,
  last_sync_at DATETIME,
  sync_status TEXT DEFAULT 'idle',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sync jobs table
CREATE TABLE IF NOT EXISTS sync_jobs (
  id TEXT PRIMARY KEY,
  emulator_id TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  retry_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_attempt_at DATETIME,
  completed_at DATETIME,
  error TEXT,
  FOREIGN KEY (emulator_id) REFERENCES emulators(id) ON DELETE CASCADE
);

-- File changes table
CREATE TABLE IF NOT EXISTS file_changes (
  id TEXT PRIMARY KEY,
  sync_job_id TEXT NOT NULL,
  path TEXT NOT NULL,
  change_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  hash TEXT,
  last_modified DATETIME NOT NULL,
  FOREIGN KEY (sync_job_id) REFERENCES sync_jobs(id) ON DELETE CASCADE
);

-- History entries table
CREATE TABLE IF NOT EXISTS history_entries (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  backup_id TEXT,
  sync_job_id TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  timestamp DATETIME NOT NULL,
  metadata TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (backup_id) REFERENCES backups(id) ON DELETE SET NULL,
  FOREIGN KEY (sync_job_id) REFERENCES sync_jobs(id) ON DELETE SET NULL
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_backups_user_id ON backups(user_id);
CREATE INDEX IF NOT EXISTS idx_backups_status ON backups(status);
CREATE INDEX IF NOT EXISTS idx_backups_started_at ON backups(started_at);
CREATE INDEX IF NOT EXISTS idx_sync_jobs_status ON sync_jobs(status);
CREATE INDEX IF NOT EXISTS idx_history_timestamp ON history_entries(timestamp);
CREATE INDEX IF NOT EXISTS idx_history_type ON history_entries(type);
```

---

## 8. API Integration

### 8.1 Keycloak Endpoints

```typescript
// constants/config.ts

export const KeycloakConfig = {
  // Replace with your Keycloak server URL
  issuer: 'https://your-keycloak-server.com/realms/your-realm',
  clientId: 'cloudmemorystick',
  redirectUri: 'cloudmemorystick://auth',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
};

// Keycloak API Endpoints:
// POST /protocol/openid-connect/token - Token exchange/refresh
// GET /protocol/openid-connect/userinfo - User info
// POST /protocol/openid-connect/logout - Logout
// GET /.well-known/openid-configuration - Discovery document
```

### 8.2 Google Drive API Endpoints

```typescript
// Google Drive API v3 Endpoints:
// GET /drive/v3/about - Get Drive info
// GET /drive/v3/files - List/search files
// POST /drive/v3/files - Create file/folder
// PUT /drive/v3/files/{fileId} - Update file
// DELETE /drive/v3/files/{fileId} - Delete file
// POST /upload/drive/v3/files - Upload file
```

---

## 9. Security Design

### 9.1 Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│   App    │     │ Keycloak │     │  Google  │     │   Drive  │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │                │
     │ 1. Login      │                │                │
     │──────────────>│                │                │
     │                │                │                │
     │ 2. Redirect   │                │                │
     │<──────────────│                │                │
     │                │                │                │
     │ 3. Auth       │                │                │
     │───────────────────────────────>│                │
     │                │                │                │
     │ 4. Callback   │                │                │
     │<──────────────────────────────│                │
     │                │                │                │
     │ 5. Token      │                │                │
     │<──────────────│                │                │
     │                │                │                │
     │ 6. Store      │                │                │
     │   Tokens      │                │                │
     │                │                │                │
     │ 7. Access     │                │                │
     │───────────────────────────────────────────────>│
     │                │                │                │
```

### 9.2 Token Storage

```typescript
// Secure token storage using expo-secure-store

interface SecureTokenStorage {
  access_token: string;      // Encrypted
  refresh_token: string;     // Encrypted
  id_token: string;          // Encrypted
  token_expires_at: string;  // ISO timestamp
  refresh_expires_at: string; // ISO timestamp
  user_info: string;         // JSON string, encrypted
}

// Token refresh strategy:
// - Check token expiry before each API call
// - Refresh if expires in < 5 minutes
// - Handle refresh failure by re-authentication
```

### 9.3 Permission Model

```typescript
// Required Android permissions

const Permissions = {
  // Storage access for emulator folders
  READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
  WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
  MANAGE_EXTERNAL_STORAGE: 'android.permission.MANAGE_EXTERNAL_STORAGE',
  
  // Network access
  INTERNET: 'android.permission.INTERNET',
  ACCESS_NETWORK_STATE: 'android.permission.ACCESS_NETWORK_STATE',
  
  // Background sync (Android 12+)
  SCHEDULE_EXACT_ALARM: 'android.permission.SCHEDULE_EXACT_ALARM',
  RECEIVE_BOOT_COMPLETED: 'android.permission.RECEIVE_BOOT_COMPLETED',
};
```

---

## 10. File System Operations

### 10.1 File Access Strategy

```typescript
// Android Storage Access Framework (SAF) for scoped storage

// For Android 10+ (API 29+), use StorageAccessFramework
// For Android 9 and below, use traditional file access

class FileAccessStrategy {
  async accessFolder(path: string): Promise<FolderAccess> {
    if (Platform.OS === 'android' && Platform.Version >= 29) {
      // Use Storage Access Framework
      return this.accessViaSAF(path);
    } else {
      // Use traditional file access
      return this.accessTraditional(path);
    }
  }
}
```

### 10.2 File Change Detection

```typescript
// File monitoring using polling strategy

class FileChangeDetector {
  private fileStates: Map<string, FileState> = new Map();
  private intervalId?: NodeJS.Timeout;

  startMonitoring(paths: string[], intervalMs: number = 30000): void {
    // Initial scan
    paths.forEach(path => this.scanFile(path));

    // Periodic polling
    this.intervalId = setInterval(() => {
      paths.forEach(path => this.checkForChanges(path));
    }, intervalMs);
  }

  private async checkForChanges(path: string): Promise<void> {
    const currentState = await this.scanFile(path);
    const previousState = this.fileStates.get(path);

    if (previousState) {
      if (currentState.hash !== previousState.hash) {
        this.emit('change', { path, type: 'modified' });
      }
    }

    this.fileStates.set(path, currentState);
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

---

## 11. Background Sync Design

### 11.1 Task Scheduling

```typescript
// Background sync using expo-background-fetch and task manager

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const SYNC_TASK = 'SYNC_EMULATOR_FILES';

// Define the background task
TaskManager.defineTask(SYNC_TASK, async () => {
  try {
    const syncService = new SyncService();
    await syncService.performSync();
    
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Sync task failed:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Register the task
async function registerSyncTask() {
  await BackgroundFetch.registerTaskAsync(SYNC_TASK, {
    minimumInterval: 15 * 60, // 15 minutes
    stopOnTerminate: false,
    startOnBoot: true,
  });
}
```

### 11.2 Sync States

```
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌──────────┐
│  Idle   │────▶│ Pending  │────▶│ Syncing │────▶│ Complete │
└─────────┘     └──────────┘     └─────────┘     └──────────┘
     ▲                │                │              │
     │                │                │              │
     │                ▼                ▼              │
     │           ┌──────────┐    ┌─────────┐         │
     └───────────│ Cancelled│    │  Error  │─────────┘
                 └──────────┘    └─────────┘
```

---

## 12. Error Handling

### 12.1 Error Types

```typescript
// Centralized error handling

export enum ErrorType {
  // Authentication errors
  AUTH_NOT_AUTHENTICATED = 'AUTH_NOT_AUTHENTICATED',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  
  // Network errors
  NETWORK_OFFLINE = 'NETWORK_OFFLINE',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  NETWORK_SERVER_ERROR = 'NETWORK_SERVER_ERROR',
  
  // File system errors
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  FILE_ACCESS_DENIED = 'FILE_ACCESS_DENIED',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  
  // Drive errors
  DRIVE_QUOTA_EXCEEDED = 'DRIVE_QUOTA_EXCEEDED',
  DRIVE_PERMISSION_DENIED = 'DRIVE_PERMISSION_DENIED',
  DRIVE_FILE_EXISTS = 'DRIVE_FILE_EXISTS',
  
  // Sync errors
  SYNC_FAILED = 'SYNC_FAILED',
  SYNC_CONFLICT = 'SYNC_CONFLICT',
}

export class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public cause?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}
```

### 12.2 Error Boundary

```typescript
// React Error Boundary for UI errors

class ErrorBoundary extends React.Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean; error?: Error }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen error={this.state.error!} />;
    }
    return this.props.children;
  }
}
```

---

## 13. Testing Strategy

### 13.1 Test Pyramid

```
                    ┌───────┐
                   │  E2E  │      ~10%
                  │ Tests │
                 └───────┘
                ┌───────────┐
               │ Integration │    ~20%
              │   Tests     │
             └───────────────┘
            ┌─────────────────┐
           │    Unit Tests    │   ~70%
          └───────────────────┘
```

### 13.2 Unit Test Examples

```typescript
// tests/unit/viewmodels/auth.viewmodel.test.ts

describe('AuthViewModel', () => {
  let viewModel: AuthViewModel;
  let mockAuthService: MockKeycloakAuthService;

  beforeEach(() => {
    mockAuthService = new MockKeycloakAuthService();
    viewModel = new AuthViewModel(mockAuthService);
  });

  afterEach(() => {
    viewModel.dispose();
  });

  it('should initialize with unauthenticated state', () => {
    expect(viewModel.state.isAuthenticated).toBe(false);
    expect(viewModel.state.user).toBeNull();
  });

  it('should authenticate successfully', async () => {
    mockAuthService.mockLogin({ user: mockUser, tokens: mockTokens });

    const result = await viewModel.login();

    expect(result).toBe(true);
    expect(viewModel.state.isAuthenticated).toBe(true);
    expect(viewModel.state.user).toEqual(mockUser);
  });

  it('should handle login failure', async () => {
    mockAuthService.mockLoginError(new Error('Invalid credentials'));

    const result = await viewModel.login();

    expect(result).toBe(false);
    expect(viewModel.state.isAuthenticated).toBe(false);
    expect(viewModel.state.error).toBe('Invalid credentials');
  });
});
```

### 13.3 Integration Test Examples

```typescript
// tests/integration/backup.integration.test.ts

describe('Backup Integration', () => {
  it('should complete full backup flow', async () => {
    // Setup
    const authService = new KeycloakAuthService(config);
    await authService.login();

    const driveService = new GoogleDriveService(
      () => authService.getAccessToken()
    );
    const fileSystemService = new FileSystemService();
    const backupRepository = new BackupRepository(database);

    const viewModel = new BackupViewModel(
      driveService,
      fileSystemService,
      backupRepository
    );

    // Execute
    await viewModel.scanForEmulators();
    viewModel.toggleEmulatorSelection(viewModel.state.emulators[0].id);
    await viewModel.startBackup();

    // Verify
    expect(viewModel.state.progress?.status).toBe('completed');
    expect(viewModel.state.progress?.percentage).toBe(100);
  });
});
```

---

## 14. Dependencies

### 14.1 Core Dependencies

```json
{
  "dependencies": {
    "expo": "~54.0.33",
    "expo-auth-session": "~6.0.0",
    "expo-secure-store": "~14.0.0",
    "expo-file-system": "~18.0.0",
    "expo-document-picker": "~12.0.0",
    "expo-background-fetch": "~13.0.0",
    "expo-task-manager": "~12.0.0",
    "expo-sqlite": "~15.0.0",
    "react-native": "0.81.5",
    "react": "19.1.0"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "typescript": "~5.9.2",
    "jest": "^29.0.0",
    "@testing-library/react-native": "^12.0.0",
    "detox": "^20.0.0"
  }
}
```

### 14.2 Required Native Modules

```bash
# Install required Expo modules
npx expo install expo-auth-session
npx expo install expo-secure-store
npx expo install expo-file-system
npx expo install expo-document-picker
npx expo install expo-background-fetch
npx expo install expo-task-manager
npx expo install expo-sqlite
```

---

## 15. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Project setup and configuration
- [ ] Keycloak integration
- [ ] Base architecture (MVVM structure)
- [ ] Authentication flow
- [ ] Secure token storage

### Phase 2: Core Features (Week 3-4)

- [ ] File system service
- [ ] Emulator detection
- [ ] Google Drive integration
- [ ] Manual backup functionality
- [ ] Backup progress UI

### Phase 3: Data Layer (Week 5)

- [ ] SQLite database setup
- [ ] Repository implementations
- [ ] History tracking
- [ ] Settings persistence

### Phase 4: Auto Sync (Week 6-7)

- [ ] File change detection
- [ ] Background sync task
- [ ] Sync settings
- [ ] Conflict resolution

### Phase 5: Polish & Testing (Week 8)

- [ ] Error handling improvements
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization
- [ ] Bug fixes

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| MVVM | Model-View-ViewModel architecture pattern |
| Keycloak | Open-source Identity and Access Management |
| OAuth2 | Open authorization protocol |
| PKCE | Proof Key for Code Exchange |
| SAF | Storage Access Framework (Android) |
| E2E | End-to-End testing |

### B. References

- [Expo Documentation](https://docs.expo.dev/)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Google Drive API](https://developers.google.com/drive)
- [React Native Documentation](https://reactnative.dev/)
- [Android Storage](https://developer.android.com/training/data-storage)

### C. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-22 | Dev Team | Initial draft |

---

**APPROVALS**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Tech Lead | | | |
| Architecture Review | | | |
| Development Team | | | |
