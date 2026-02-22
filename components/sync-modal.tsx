import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface SyncModalProps {
  visible: boolean;
  onClose: () => void;
}

type SyncStatus = 'uploading' | 'success' | 'error';

export default function SyncModal({ visible, onClose }: SyncModalProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<SyncStatus>('uploading');
  const [errorMessage, setErrorMessage] = useState('');
  const progressAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (visible) {
      // Reset state when modal opens
      setProgress(0);
      setStatus('uploading');
      setErrorMessage('');
      progressAnim.setValue(0);
      
      // Simulate upload process
      simulateUpload();
    }
  }, [visible]);

  const simulateUpload = async () => {
    try {
      // Simulate upload with progress updates over 4 seconds
      const totalDuration = 4000; // 4 seconds
      const steps = 20;
      const stepDuration = totalDuration / steps;
      
      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        const progressValue = (i / steps) * 100;
        setProgress(Math.round(progressValue));
        
        Animated.timing(progressAnim, {
          toValue: progressValue,
          duration: stepDuration,
          useNativeDriver: false,
        }).start();

        // Simulate random error at 50%
        if (i === steps / 2 && Math.random() > 0.7) {
          throw new Error('Network connection lost');
        }
      }
      
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleRetry = () => {
    setProgress(0);
    setStatus('uploading');
    setErrorMessage('');
    progressAnim.setValue(0);
    simulateUpload();
  };

  const handleClose = () => {
    if (status !== 'uploading') {
      onClose();
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {status === 'uploading' && 'Syncing Data'}
            {status === 'success' && 'Sync Complete'}
            {status === 'error' && 'Sync Failed'}
          </Text>

          {status === 'uploading' && (
            <>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      { width: progressWidth },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.loader}
              />
              <Text style={styles.message}>Uploading your data...</Text>
            </>
          )}

          {status === 'success' && (
            <>
              <View style={styles.iconContainer}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
              <Text style={styles.message}>
                Your data has been synced successfully
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleClose}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </>
          )}

          {status === 'error' && (
            <>
              <View style={styles.iconContainer}>
                <Text style={styles.errorIcon}>✕</Text>
              </View>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
              <Text style={styles.message}>
                Please check your connection and try again
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={handleClose}
                >
                  <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRetry}
                >
                  <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loader: {
    marginVertical: spacing.lg,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  successIcon: {
    fontSize: 48,
    color: colors.success,
  },
  errorIcon: {
    fontSize: 48,
    color: colors.error,
  },
  errorMessage: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    minWidth: 120,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
  },
});
