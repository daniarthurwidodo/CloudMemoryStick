import { colors } from '@/constants/theme';
import { Image, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Your emulator cloud overview</Text>
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

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PPSSPP</Text>
          <Text style={styles.sectionSize}>1.8 GB</Text>
        </View>

        <View style={styles.gameCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }}
            style={styles.gameIcon}
          />
          <View style={styles.gameInfo}>
            <Text style={styles.gameName}>God of War: Ghost of Sparta</Text>
            <Text style={styles.gameFile}>.sav file</Text>
          </View>
        </View>

        <View style={styles.gameCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }}
            style={styles.gameIcon}
          />
          <View style={styles.gameInfo}>
            <Text style={styles.gameName}>Final Fantasy VII</Text>
            <Text style={styles.gameFile}>.sav file</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DuckStation</Text>
          <Text style={styles.sectionSize}>950 MB</Text>
        </View>

        <View style={styles.gameCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }}
            style={styles.gameIcon}
          />
          <View style={styles.gameInfo}>
            <Text style={styles.gameName}>Resident Evil 2</Text>
            <Text style={styles.gameFile}>.mcr memory</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  syncCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  syncContent: {
    flex: 1,
  },
  syncLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  syncStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  sectionSize: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  gameCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.bgSecondary,
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  gameFile: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
