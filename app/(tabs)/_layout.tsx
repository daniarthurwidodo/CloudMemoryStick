import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedTabIcon } from '@/components/animated-tab-icon';
import { HapticTab } from '@/components/haptic-tab';
import { TabIconWithIndicator } from '@/components/tab-icon-with-indicator';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSyncModal } from '@/providers/sync-modal-provider';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { showSyncModal } = useSyncModal();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#8E8E93' : '#999',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#8E8E93' : '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0A0A0F' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: 'transparent',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithIndicator 
              name="home-outline" 
              color={color} 
              focused={focused}
              activeColor={Colors[colorScheme ?? 'dark'].tint}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sync"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            showSyncModal();
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              name="sync" 
              color={Colors[colorScheme ?? 'dark'].tint} 
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithIndicator 
              name="time-outline" 
              color={color} 
              focused={focused}
              activeColor={Colors[colorScheme ?? 'dark'].tint}
            />
          ),
        }}
      />
    </Tabs>
  );
}

