import SyncModal from '@/components/sync-modal';
import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SyncScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const handleSyncPress = () => {
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sync</Text>
          <Text style={styles.subtitle}>Manage your cloud synchronization</Text>
        </View>

        <View style={styles.syncRow}>
          <View style={styles.syncLeft}>
            <Text style={styles.syncLabel}>AUTO SYNC</Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusIndicator, { backgroundColor: isConnected ? colors.success : '#3A3A44' }]} />
              <Text style={styles.syncStatus}>
                {isConnected ? 'Google Drive Connected' : 'Google Drive is not connected'}
              </Text>
            </View>
          </View>
          <Switch
            value={autoSyncEnabled}
            onValueChange={setAutoSyncEnabled}
            trackColor={{ false: '#3A3A44', true: colors.textPrimary }}
            thumbColor={colors.textPrimary}
          />
        </View>

        <TouchableOpacity style={styles.card} onPress={handleSyncPress}>
          <Text style={styles.cardTitle}>Manual Sync</Text>
          <Text style={styles.cardSubtitle}>Trigger a sync operation manually</Text>
          <View style={styles.syncButton}>
            <Text style={styles.syncButtonText}>Start Sync</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <SyncModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    paddingHorizontal: spacing.lg,
  },
  header: {
    marginTop: spacing.headerTop,
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  syncRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    paddingVertical: spacing.md,
  },
  syncLeft: {
    flex: 1,
  },
  syncLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
  },
  syncStatus: {
    ...typography.body,
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
  },
  cardTitle: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  syncButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  syncButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
