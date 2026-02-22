import { colors } from '@/constants/theme';
import { useEffect, useState } from 'react';
import { Animated, Image, ImageProps, StyleSheet, View } from 'react-native';

interface ImageWithSkeletonProps extends ImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export function ImageWithSkeleton({
  width = 60,
  height = 60,
  borderRadius = 8,
  style,
  ...props
}: ImageWithSkeletonProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const pulseAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [loading, pulseAnim]);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[{ width, height, borderRadius }, style]}>
      {loading && (
        <Animated.View
          style={[
            styles.skeleton,
            {
              width,
              height,
              borderRadius,
              opacity,
            },
          ]}
        />
      )}
      <Image
        {...props}
        style={[
          {
            width,
            height,
            borderRadius,
            backgroundColor: colors.bgSecondary,
          },
          style,
          loading && styles.hidden,
        ]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    position: 'absolute',
    backgroundColor: colors.bgSecondary,
  },
  hidden: {
    opacity: 0,
  },
});
