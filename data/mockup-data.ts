/**
 * Mockup Data
 * Consolidated mock data for development and testing
 */

// Auth Mock Data
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const mockAuthUser: AuthUser = {
  id: 'mock-user-123',
  email: 'user@example.com',
  name: 'Demo User',
};

// Emulator Mock Data
export interface EmulatorGame {
  id: string;
  name: string;
  fileType: string;
  emulator: string;
}

export interface EmulatorSection {
  name: string;
  size: string;
  games: EmulatorGame[];
}

export const mockEmulatorSections: EmulatorSection[] = [
  {
    name: 'PPSSPP',
    size: '1.8 GB',
    games: [
      {
        id: 'ppsspp-1',
        name: 'God of War: Ghost of Sparta',
        fileType: '.sav file',
        emulator: 'PPSSPP',
      },
      {
        id: 'ppsspp-2',
        name: 'Final Fantasy VII',
        fileType: '.sav file',
        emulator: 'PPSSPP',
      },
    ],
  },
  {
    name: 'DuckStation',
    size: '950 MB',
    games: [
      {
        id: 'duckstation-1',
        name: 'Resident Evil 2',
        fileType: '.mcr memory',
        emulator: 'DuckStation',
      },
    ],
  },
];

// Sync Status Mock Data
export interface SyncStatus {
  autoSyncEnabled: boolean;
  provider: string;
  status: string;
}

export const mockSyncStatus: SyncStatus = {
  autoSyncEnabled: true,
  provider: 'Google Drive',
  status: 'Connected',
};

// History Mock Data
export interface BackupHistoryItem {
  id: string;
  date: string;
  time: string;
  emulator: string;
  game: string;
  action: 'backup' | 'restore';
  status: 'success' | 'failed' | 'pending';
  size: string;
}

export const mockBackupHistoryItems: BackupHistoryItem[] = [
  {
    id: 'history-1',
    date: '2024-02-22',
    time: '14:30',
    emulator: 'PPSSPP',
    game: 'God of War: Ghost of Sparta',
    action: 'backup',
    status: 'success',
    size: '850 MB',
  },
  {
    id: 'history-2',
    date: '2024-02-22',
    time: '12:15',
    emulator: 'DuckStation',
    game: 'Resident Evil 2',
    action: 'restore',
    status: 'success',
    size: '450 MB',
  },
  {
    id: 'history-3',
    date: '2024-02-21',
    time: '18:45',
    emulator: 'PPSSPP',
    game: 'Final Fantasy VII',
    action: 'backup',
    status: 'success',
    size: '950 MB',
  },
  {
    id: 'history-4',
    date: '2024-02-21',
    time: '10:20',
    emulator: 'DuckStation',
    game: 'Resident Evil 2',
    action: 'backup',
    status: 'failed',
    size: '450 MB',
  },
  {
    id: 'history-5',
    date: '2024-02-20',
    time: '16:00',
    emulator: 'PPSSPP',
    game: 'God of War: Ghost of Sparta',
    action: 'restore',
    status: 'success',
    size: '850 MB',
  },
];
