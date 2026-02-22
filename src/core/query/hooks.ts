import {
    mockAuthUser,
    mockBackupHistoryItems,
    mockEmulatorSections,
    mockSyncStatus,
    type AuthUser,
    type BackupHistoryItem,
    type EmulatorSection,
    type SyncStatus,
} from '@/data/mockup-data';
import { useQuery } from '@tanstack/react-query';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Query Keys
export const queryKeys = {
  auth: ['auth'] as const,
  emulators: ['emulators'] as const,
  syncStatus: ['syncStatus'] as const,
  backupHistory: ['backupHistory'] as const,
};

// Mock API Functions
const fetchAuthUser = async (): Promise<AuthUser> => {
  await delay(300);
  return mockAuthUser;
};

const fetchEmulatorSections = async (): Promise<EmulatorSection[]> => {
  await delay(500);
  return mockEmulatorSections;
};

const fetchSyncStatus = async (): Promise<SyncStatus> => {
  await delay(200);
  return mockSyncStatus;
};

const fetchBackupHistory = async (): Promise<BackupHistoryItem[]> => {
  await delay(400);
  return mockBackupHistoryItems;
};

// Query Hooks
export const useAuthUser = () => {
  return useQuery({
    queryKey: queryKeys.auth,
    queryFn: fetchAuthUser,
  });
};

export const useEmulatorSections = () => {
  return useQuery({
    queryKey: queryKeys.emulators,
    queryFn: fetchEmulatorSections,
  });
};

export const useSyncStatus = () => {
  return useQuery({
    queryKey: queryKeys.syncStatus,
    queryFn: fetchSyncStatus,
  });
};

export const useBackupHistory = () => {
  return useQuery({
    queryKey: queryKeys.backupHistory,
    queryFn: fetchBackupHistory,
  });
};
