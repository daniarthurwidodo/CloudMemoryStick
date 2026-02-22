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
      <View style={[styles.iconContainer, { backgroundColor: '#FFD700' }]}>
        <Ionicons name={name} size={size} color={focused ? '#000' : '#000'} />
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
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
