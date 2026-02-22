import SyncModal from '@/components/sync-modal';
import React, { createContext, useContext, useState } from 'react';

interface SyncModalContextType {
  showSyncModal: () => void;
  hideSyncModal: () => void;
}

const SyncModalContext = createContext<SyncModalContextType | undefined>(undefined);

export function SyncModalProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  const showSyncModal = () => setVisible(true);
  const hideSyncModal = () => setVisible(false);

  return (
    <SyncModalContext.Provider value={{ showSyncModal, hideSyncModal }}>
      {children}
      <SyncModal visible={visible} onClose={hideSyncModal} />
    </SyncModalContext.Provider>
  );
}

export function useSyncModal() {
  const context = useContext(SyncModalContext);
  if (!context) {
    throw new Error('useSyncModal must be used within SyncModalProvider');
  }
  return context;
}
