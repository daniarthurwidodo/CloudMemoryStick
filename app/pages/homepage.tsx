import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { mockEmulatorSections } from '@/data/mockup-data';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Your emulator cloud overview</Text>
        </View>
        <Pressable style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.syncCard}>
        <View style={styles.syncContent}>
          <Text style={styles.syncLabel}>AUTO SYNC</Text>
          <Text style={styles.syncStatus}>Google Drive Connected</Text>
        </View>
        <Switch
          value={true}
          trackColor={{ false: '#3A3A44', true: colors.textPrimary }}
          thumbColor={colors.textPrimary}
        />
      </View>

      <Pressable style={styles.addFolderButton}>
        <Text style={styles.addFolderText}>Add folder</Text>
      </Pressable>

      {mockEmulatorSections.map((section) => (
        <View key={section.name} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.name}</Text>
            <Text style={styles.sectionSize}>{section.size}</Text>
          </View>

          {section.games.map((game) => (
            <View key={game.id} style={styles.gameCard}>
              <View style={styles.gameInfo}>
                <Text style={styles.gameName}>{game.name}</Text>
                <Text style={styles.gameFile}>{game.fileType}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoutButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
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
  syncCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  syncContent: {
    flex: 1,
  },
  syncLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  syncStatus: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  addFolderButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  addFolderText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.bgPrimary,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
  },
  sectionSize: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  gameCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gameIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.bgSecondary,
    marginRight: spacing.md,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  gameFile: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
