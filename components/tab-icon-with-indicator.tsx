import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface TabIconWithIndicatorProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
  size?: number;
  activeColor?: string;
}

export function TabIconWithIndicator({ 
  name, 
  color, 
  focused, 
  size = 28,
  activeColor = '#FFD700'
}: TabIconWithIndicatorProps) {
  return (
    <View style={styles.container}>
      {focused && (
        <View style={[styles.indicator, { backgroundColor: activeColor }]} />
      )}
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 40,
    height: 3,
    borderRadius: 2,
  },
});
