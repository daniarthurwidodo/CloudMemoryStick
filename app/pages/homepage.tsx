import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { useEmulatorSections, useSyncStatus } from '@/src/core/query/hooks';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function HomePage() {
  const { data: emulatorSections, isLoading: isLoadingEmulators } = useEmulatorSections();
  const { data: syncStatus, isLoading: isLoadingSync } = useSyncStatus();

  const handleAddFolder = async () => {
    try {
      // For Android 11+ (API 30+), use copyToCacheDirectory: false to get direct URI access
      // This allows access to /Android/data via Storage Access Framework
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const folderUri = result.assets[0].uri;
        const folderName = result.assets[0].name;
        
        Alert.alert(
          'Folder Selected',
          `Name: ${folderName}\nURI: ${folderUri}`,
        );
        // TODO: Add logic to process the selected folder
        // You can use expo-file-system to read/write using the URI
      }
    } catch (error) {
      console.error('Error picking folder:', error);
      Alert.alert('Error', 'Failed to open folder picker');
    }
  };

  if (isLoadingEmulators || isLoadingSync) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

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
          <Text style={styles.syncStatus}>
            {syncStatus?.provider} {syncStatus?.status}
          </Text>
        </View>
        <Switch
          value={syncStatus?.autoSyncEnabled ?? false}
          trackColor={{ false: '#3A3A44', true: colors.textPrimary }}
          thumbColor={colors.textPrimary}
        />
      </View>

      <Pressable style={styles.addFolderButton} onPress={handleAddFolder}>
        <Text style={styles.addFolderText}>Add folder</Text>
      </Pressable>

      {!emulatorSections || emulatorSections.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="folder-open-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>No emulators found</Text>
          <Text style={styles.emptySubtitle}>Add a folder to get started</Text>
        </View>
      ) : (
        emulatorSections.map((section) => (
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
        ))
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
