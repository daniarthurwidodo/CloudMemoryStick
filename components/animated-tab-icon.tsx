import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AnimatedTabIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
  size?: number;
}

export function AnimatedTabIcon({ name, color, focused, size = 28 }: AnimatedTabIconProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, focused && { backgroundColor: color }]}>
        <Ionicons name={name} size={size} color={focused ? '#000' : color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
