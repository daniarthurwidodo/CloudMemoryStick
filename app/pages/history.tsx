import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { mockBackupHistoryItems } from '@/data/mockup-data';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HistoryPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Backup History</Text>
        <Text style={styles.subtitle}>Track your sync activity</Text>
      </View>
      
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>No recent restore failures</Text>
        <Text style={styles.statusSubtitle}>All systems operating normally</Text>
      </View>

      <View style={styles.historyList}>
        {mockBackupHistoryItems.map((item) => (
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
    </ScrollView>
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
});
