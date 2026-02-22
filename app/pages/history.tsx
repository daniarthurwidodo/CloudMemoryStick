import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { useBackupHistory } from '@/src/core/query/hooks';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HistoryPage() {
  const { data: historyItems, isLoading } = useBackupHistory();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  const failedItems = historyItems?.filter((item) => item.status === 'failed') ?? [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Backup History</Text>
        <Text style={styles.subtitle}>Track your sync activity</Text>
      </View>
      
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>
          {failedItems.length === 0 
            ? 'No recent restore failures' 
            : `${failedItems.length} failed operation${failedItems.length > 1 ? 's' : ''}`}
        </Text>
        <Text style={styles.statusSubtitle}>
          {failedItems.length === 0 
            ? 'All systems operating normally' 
            : 'Review failed operations below'}
        </Text>
      </View>

      {!historyItems || historyItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="time-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>No backup history</Text>
          <Text style={styles.emptySubtitle}>Your backup activity will appear here</Text>
        </View>
      ) : (
        <View style={styles.historyList}>
          {historyItems.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyHeader}>
                <View style={styles.historyInfo}>
                  <Text style={styles.gameName}>{item.game}</Text>
                  <Text style={styles.emulatorName}>{item.emulator}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  item.status === 'success' && styles.statusSuccess,
                  item.status === 'failed' && styles.statusFailed,
                  item.status === 'pending' && styles.statusPending,
                ]}>
                  <Text style={styles.statusText}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              
              <View style={styles.historyDetails}>
                <Text style={styles.detailText}>
                  {item.action === 'backup' ? '↑' : '↓'} {item.action.toUpperCase()}
                </Text>
                <Text style={styles.detailText}>•</Text>
                <Text style={styles.detailText}>{item.size}</Text>
                <Text style={styles.detailText}>•</Text>
                <Text style={styles.detailText}>
                  {item.date} {item.time}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    paddingHorizontal: spacing.lg,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  statusTitle: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statusSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  historyList: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  historyItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  historyInfo: {
    flex: 1,
  },
  gameName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  emulatorName: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  statusSuccess: {
    backgroundColor: '#10b98120',
  },
  statusFailed: {
    backgroundColor: '#ef444420',
  },
  statusPending: {
    backgroundColor: '#f59e0b20',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  historyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyTitle: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
