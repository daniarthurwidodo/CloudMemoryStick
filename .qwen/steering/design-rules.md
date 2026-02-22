# Design Rules: Reusable Components & Cyber-Gold Theme

**Version:** 2.0.0  
**Last Updated:** February 22, 2026

---

## Overview

This document establishes design rules for building reusable components with a **cyber-gold aesthetic** using **Tailwind CSS** styling adapted for React Native, **Poppins font**, and **shadcn-inspired** design patterns.

---

## Design Philosophy

### Core Principles
1. **Reusability First**: Every component should be composable and configurable
2. **Cyber-Gold Aesthetic**: Dark backgrounds with gold accents and glowing effects
3. **Consistency**: Unified design tokens across all components
4. **Accessibility**: WCAG AA compliance minimum
5. **Performance**: Optimized rendering and animations

---

## Design Tokens

### Colors (Cyber-Gold Theme)

```typescript
// constants/design-tokens.ts

export const CyberGoldColors = {
  // Background colors (dark cyber base)
  cyber: {
    bg: '#0B0B0F',        // Deep space black - main background
    surface: '#121218',   // Dark surface - cards, sections
    elevated: '#1A1A22',  // Elevated surfaces - modals, overlays
    border: '#2A2A35',    // Border color - dividers, outlines
  },
  
  // Gold accent colors (luxury cyber feel)
  gold: {
    primary: '#D4AF37',   // Classic gold - primary actions
    bright: '#FFD700',    // Bright gold - highlights, glows
    muted: '#A67C00',     // Muted gold - secondary elements
    soft: '#F5E6B3',      // Soft gold - text accents
  },
  
  // Text colors
  text: {
    primary: '#FAFAFA',     // Near white - main text
    secondary: '#A1A1AA',   // Muted gray - secondary text
    tertiary: '#71717A',    // Subtle gray - hints
    gold: '#D4AF37',        // Gold accent text
    goldBright: '#FFD700',  // Bright gold for emphasis
  },
  
  // Status colors (cyber-themed)
  status: {
    success: '#00FF9D',     // Neon green
    warning: '#FFB800',     // Amber
    error: '#FF3B3B',       // Red
    info: '#00FFFF',        // Cyan
  },
  
  // Gradients
  gradients: {
    gold: ['#D4AF37', '#FFD700', '#D4AF37'],
    goldSubtle: ['#F5E6B3', '#D4AF37'],
    cyber: ['#1A1A22', '#121218', '#0B0B0F'],
    goldGlow: ['rgba(212,175,55,0.4)', 'transparent'],
  },
};
```

### Tailwind Configuration

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0B0B0F',
          surface: '#121218',
          elevated: '#1A1A22',
          border: '#2A2A35',
        },
        gold: {
          primary: '#D4AF37',
          bright: '#FFD700',
          muted: '#A67C00',
          soft: '#F5E6B3',
        },
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212,175,55,0.4)',
        'gold-glow-strong': '0 0 40px rgba(255,215,0,0.6)',
        'cyber-elevated': '0 4px 20px rgba(0,0,0,0.5)',
      },
      fontFamily: {
        popsins: ['Poppins', 'sans-serif'],
        popsinsMedium: ['Poppins-Medium', 'sans-serif'],
        popsinsSemiBold: ['Poppins-SemiBold', 'sans-serif'],
        popsinsBold: ['Poppins-Bold', 'sans-serif'],
      },
      fontSize: {
        'xs': ['10px', { lineHeight: '14px' }],
        'sm': ['12px', { lineHeight: '16px' }],
        'md': ['14px', { lineHeight: '20px' }],
        'lg': ['16px', { lineHeight: '24px' }],
        'xl': ['18px', { lineHeight: '26px' }],
        '2xl': ['20px', { lineHeight: '28px' }],
        '3xl': ['24px', { lineHeight: '32px' }],
        '4xl': ['30px', { lineHeight: '38px' }],
        '5xl': ['36px', { lineHeight: '44px' }],
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
      borderRadius: {
        '4xl': '32px',
        'cyber': '8px',
        'cyber-lg': '12px',
      },
      animation: {
        'gold-pulse': 'goldPulse 2s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        goldPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### Typography (Poppins)

```typescript
// constants/typography.ts

export const Typography = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    extrabold: 'Poppins-ExtraBold',
  },
  
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 30,
    '5xl': 36,
    '6xl': 48,
  },
  
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

// Tailwind class equivalents:
// font-poppins = fontFamily.regular
// font-poppins-medium = fontFamily.medium
// font-poppins-semibold = fontFamily.semibold
// font-poppins-bold = fontFamily.bold
// text-gold-primary = gold.primary
// text-gold-bright = gold.bright
```

### Spacing (8pt Grid + Tailwind)

```typescript
// Tailwind spacing uses rem units
// 1rem = 16px by default

// Common spacing values:
// p-1 = 4px, p-2 = 8px, p-3 = 12px, p-4 = 16px
// p-5 = 20px, p-6 = 24px, p-8 = 32px, p-10 = 40px
// p-12 = 48px, p-16 = 64px, p-20 = 80px, p-24 = 96px

// Custom spacing for cyber theme:
export const Spacing = {
  gap: {
    xs: 4,    // gap-1
    sm: 8,    // gap-2
    md: 16,   // gap-4
    lg: 24,   // gap-6
    xl: 32,   // gap-8
    '2xl': 48, // gap-12
  },
  padding: {
    button: 16,  // px-4
    card: 16,    // p-4
    screen: 20,  // px-5
  },
};
```

### Border Radius

```typescript
// Tailwind classes:
// rounded-none = 0
// rounded-sm = 2px
// rounded = 4px
// rounded-md = 6px
// rounded-lg = 8px
// rounded-xl = 12px
// rounded-2xl = 16px
// rounded-3xl = 24px
// rounded-full = 9999px

// Cyber theme specific:
export const BorderRadius = {
  cyber: 8,      // rounded-lg
  cyberLg: 12,   // rounded-xl
  button: 6,     // rounded-md
  card: 8,       // rounded-lg
  input: 6,      // rounded-md
  badge: 9999,   // rounded-full
};
```

### Shadows & Glow Effects

```typescript
// Tailwind shadow classes with custom cyber-gold:
// shadow-gold-glow = 0 0 20px rgba(212,175,55,0.4)
// shadow-gold-glow-strong = 0 0 40px rgba(255,215,0,0.6)

// Standard shadows for elevated surfaces:
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  gold: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 0,
  },
};
```

### Animation

```typescript
// Tailwind animation classes:
// animate-gold-pulse - Pulsing gold effect
// animate-fade-in - Fade in animation
// animate-slide-up - Slide up animation

// Duration classes:
// duration-100 = 100ms
// duration-200 = 200ms
// duration-300 = 300ms
// duration-500 = 500ms

// Easing:
// ease-in
// ease-out
// ease-in-out
```

---

## Component Architecture with NativeWind

### Setup

```bash
# Install NativeWind for Tailwind in React Native
npx expo install nativewind tailwindcss
npx tailwindcss init
```

```typescript
// nativewind-env.d.ts
/// <reference types="nativewind/types" />
```

```typescript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

### Base Component Pattern with Tailwind

```typescript
// components/ui/base/button.tsx
import React, { memo } from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';
import { styled } from 'nativewind';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

/**
 * Cyber-Gold themed Button component
 * Uses Tailwind classes via NativeWind
 */
export const Button = memo(function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  ...pressableProps
}: ButtonProps) {
  return (
    <Pressable
      className={`
        flex-row items-center justify-center gap-2
        ${getVariantClasses(variant)}
        ${getSizeClasses(size)}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#0B0B0F' : '#D4AF37'} />
      ) : (
        <>
          {leftIcon}
          <Text className={`font-poppins-semibold ${getTextSizeClasses(size)} ${getTextColorClasses(variant)}`}>
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </Pressable>
  );
});

function getVariantClasses(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return 'bg-gold-primary shadow-gold-glow';
    case 'secondary':
      return 'bg-cyber-elevated border border-cyber-border';
    case 'outline':
      return 'bg-transparent border-2 border-gold-primary';
    case 'ghost':
      return 'bg-transparent';
    case 'danger':
      return 'bg-red-500';
    default:
      return 'bg-gold-primary';
  }
}

function getSizeClasses(size: ButtonSize): string {
  switch (size) {
    case 'sm':
      return 'px-3 py-2 rounded-md';
    case 'md':
      return 'px-4 py-3 rounded-lg';
    case 'lg':
      return 'px-6 py-4 rounded-xl';
    default:
      return 'px-4 py-3 rounded-lg';
  }
}

function getTextSizeClasses(size: ButtonSize): string {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-base';
    case 'lg':
      return 'text-lg';
    default:
      return 'text-base';
  }
}

function getTextColorClasses(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return 'text-cyber-bg';
    case 'secondary':
    case 'outline':
      return 'text-gold-primary';
    case 'ghost':
      return 'text-gold-primary';
    case 'danger':
      return 'text-white';
    default:
      return 'text-cyber-bg';
  }
}
```

---

## shadcn-Inspired Components (Cyber-Gold)

### Card Component

```typescript
// components/ui/base/card.tsx
import React, { memo, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { styled } from 'nativewind';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gold';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  style?: ViewStyle;
}

export const Card = memo(function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  style,
}: CardProps) {
  return (
    <View
      className={`
        rounded-lg overflow-hidden
        ${getVariantClasses(variant)}
        ${getPaddingClasses(padding)}
        ${className}
      `}
      style={style}
    >
      {children}
    </View>
  );
});

function getVariantClasses(variant: CardProps['variant']): string {
  switch (variant) {
    case 'default':
      return 'bg-cyber-surface';
    case 'elevated':
      return 'bg-cyber-elevated shadow-lg';
    case 'outlined':
      return 'bg-transparent border border-cyber-border';
    case 'gold':
      return 'bg-gradient-to-br from-gold-primary to-gold-muted shadow-gold-glow';
    default:
      return 'bg-cyber-surface';
  }
}

function getPaddingClasses(padding: CardProps['padding']): string {
  switch (padding) {
    case 'none':
      return '';
    case 'sm':
      return 'p-2';
    case 'md':
      return 'p-4';
    case 'lg':
      return 'p-6';
    default:
      return 'p-4';
  }
}

// Card sub-components
export const CardHeader = memo(function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={`pb-3 border-b border-cyber-border ${className}`}>{children}</View>;
});

export const CardTitle = memo(function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Text className={`font-poppins-bold text-xl text-gold-primary ${className}`}>
      {children}
    </Text>
  );
});

export const CardDescription = memo(function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Text className={`font-poppins text-sm text-gray-400 ${className}`}>
      {children}
    </Text>
  );
});

export const CardContent = memo(function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={`py-4 ${className}`}>{children}</View>;
});

export const CardFooter = memo(function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={`pt-3 border-t border-cyber-border ${className}`}>{children}</View>;
});
```

### Input Component

```typescript
// components/ui/base/input.tsx
import React, { memo, forwardRef, useState } from 'react';
import { TextInput, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Input = memo(
  forwardRef<any, InputProps>(function Input(
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      ...props
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View className={`w-full ${className}`}>
        {label && (
          <Text className="font-poppins-medium text-sm text-gray-400 mb-1">
            {label}
          </Text>
        )}
        
        <View
          className={`
            flex-row items-center
            bg-cyber-surface
            border rounded-lg px-3
            ${isFocused ? 'border-gold-primary shadow-gold-glow' : 'border-cyber-border'}
            ${error ? 'border-red-500' : ''}
          `}
        >
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          
          <TextInput
            ref={ref}
            className="flex-1 font-poppins text-base text-gray-100 py-3"
            placeholderTextColor="#71717A"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {rightIcon && (
            <View className="ml-2">
              {typeof rightIcon === 'function' ? rightIcon() : rightIcon}
            </View>
          )}
        </View>
        
        {(error || helperText) && (
          <Text className={`text-xs font-poppins mt-1 ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </Text>
        )}
      </View>
    );
  })
);
```

### Badge Component

```typescript
// components/ui/base/badge.tsx
import React, { memo } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styled } from 'nativewind';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'gold';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
  style?: ViewStyle;
}

export const Badge = memo(function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  style,
}: BadgeProps) {
  return (
    <View
      className={`
        flex-row items-center self-start rounded-full gap-1
        ${getVariantClasses(variant)}
        ${getSizeClasses(size)}
        ${className}
      `}
      style={style}
    >
      {dot && <View className={`w-1.5 h-1.5 rounded-full ${getDotColorClasses(variant)}`} />}
      <Text className={`font-poppins-medium ${getTextSizeClasses(size)}`}>
        {children}
      </Text>
    </View>
  );
});

function getVariantClasses(variant: BadgeVariant): string {
  switch (variant) {
    case 'default':
      return 'bg-cyber-elevated';
    case 'primary':
      return 'bg-gold-primary/20';
    case 'success':
      return 'bg-green-500/20';
    case 'warning':
      return 'bg-amber-500/20';
    case 'error':
      return 'bg-red-500/20';
    case 'gold':
      return 'bg-gradient-to-r from-gold-primary to-gold-bright';
    default:
      return 'bg-cyber-elevated';
  }
}

function getSizeClasses(size: BadgeSize): string {
  switch (size) {
    case 'sm':
      return 'px-2 py-0.5';
    case 'md':
      return 'px-3 py-1';
    case 'lg':
      return 'px-4 py-1.5';
    default:
      return 'px-3 py-1';
  }
}

function getTextSizeClasses(size: BadgeSize): string {
  switch (size) {
    case 'sm':
      return 'text-xs';
    case 'md':
      return 'text-sm';
    case 'lg':
      return 'text-base';
    default:
      return 'text-sm';
  }
}

function getDotColorClasses(variant: BadgeVariant): string {
  switch (variant) {
    case 'primary':
      return 'bg-gold-primary';
    case 'success':
      return 'bg-green-500';
    case 'warning':
      return 'bg-amber-500';
    case 'error':
      return 'bg-red-500';
    case 'gold':
      return 'bg-gold-bright';
    default:
      return 'bg-gray-400';
  }
}
```

---

## Screen Templates

### Login Screen Template

```typescript
// app/(auth)/login.tsx
import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/ui/base/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-cyber-bg">
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
      
      {/* Header */}
      <View className="flex-1 justify-center items-center px-8">
        {/* Logo */}
        <View className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-gold-primary to-gold-bright shadow-gold-glow-strong items-center justify-center">
          <Text className="text-6xl">💾</Text>
        </View>
        
        {/* Title */}
        <Text className="font-poppins-bold text-4xl text-gold-primary mb-2">
          CloudMemoryStick
        </Text>
        <Text className="font-poppins text-base text-gray-400 text-center mb-12">
          Backup your emulator data to the cloud
        </Text>
        
        {/* Login Button */}
        <Button
          title="Sign in with Google"
          onPress={() => {}}
          variant="primary"
          size="lg"
          className="w-full shadow-gold-glow"
          leftIcon={
            <Text className="text-xl mr-2">🔐</Text>
          }
        />
        
        {/* Footer */}
        <Text className="font-poppins text-xs text-gray-500 mt-8 text-center">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
      
      {/* Bottom decoration */}
      <View className="h-32 bg-gradient-to-t from-gold-primary/10 to-transparent" />
    </SafeAreaView>
  );
}
```

### Home Screen Template

```typescript
// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/base/card';
import { Button } from '@/components/ui/base/button';
import { Badge } from '@/components/ui/base/badge';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-cyber-bg">
      <ScrollView 
        className="flex-1 px-5"
        refreshControl={
          <RefreshControl tintColor="#D4AF37" />
        }
      >
        {/* Header */}
        <View className="py-6">
          <Text className="font-poppins-bold text-3xl text-gold-primary mb-1">
            CloudMemoryStick
          </Text>
          <Text className="font-poppins text-sm text-gray-400">
            Manage your emulator backups
          </Text>
        </View>
        
        {/* Status Card */}
        <Card variant="gold" className="mb-5">
          <CardHeader>
            <CardTitle>Backup Status</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-poppins text-gray-300">Last Backup</Text>
              <Badge variant="success">
                <Text className="text-white">2 hours ago</Text>
              </Badge>
            </View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-poppins text-gray-300">Total Backups</Text>
              <Text className="font-poppins-bold text-xl text-gold-bright">12</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="font-poppins text-gray-300">Storage Used</Text>
              <Text className="font-poppins-bold text-xl text-gold-bright">2.4 GB</Text>
            </View>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card variant="elevated" className="mb-5">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex-row gap-3">
            <Button
              title="Scan"
              onPress={() => {}}
              variant="primary"
              className="flex-1"
            />
            <Button
              title="Backup"
              onPress={() => {}}
              variant="secondary"
              className="flex-1"
            />
          </CardContent>
        </Card>
        
        {/* Recent Backups */}
        <Card variant="outlined" className="mb-5">
          <CardHeader>
            <CardTitle>Recent Backups</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Backup items would go here */}
            <View className="py-8 items-center">
              <Text className="font-poppins text-gray-500">No recent backups</Text>
            </View>
          </CardContent>
        </Card>
        
        {/* Sync Status */}
        <Card variant="default" className="mb-20">
          <CardContent className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-3 h-3 rounded-full bg-green-500 shadow-gold-glow" />
              <Text className="font-poppins text-gray-300">Auto-sync enabled</Text>
            </View>
            <Badge variant="gold">
              <Text className="text-cyber-bg">Active</Text>
            </Badge>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
```

---

## Usage Examples

### Form Example (Cyber-Gold Theme)

```typescript
// Example: Login Form with cyber-gold theme
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/base/card';
import { Button } from '@/components/ui/base/button';
import { Input } from '@/components/ui/base/input';
import { Badge } from '@/components/ui/base/badge';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-cyber-bg p-5">
      <Badge variant="gold" size="lg" className="mb-6 self-center">
        <Text className="text-cyber-bg font-poppins-bold">CloudMemoryStick v2.0</Text>
      </Badge>
      
      <Card variant="elevated" className="shadow-gold-glow">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>
        
        <CardContent className="gap-4">
          <Input
            label="Email"
            placeholder="user@cyber.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </CardContent>
        
        <CardFooter>
          <Button
            title="Sign In"
            onPress={() => {}}
            loading={false}
            variant="primary"
            className="w-full shadow-gold-glow-strong"
          />
        </CardFooter>
      </Card>
    </View>
  );
}
```

---

## Component Development Checklist

### Before Creating a Component
- [ ] Check if existing component can be extended
- [ ] Define clear single responsibility
- [ ] Identify all variants/states needed
- [ ] Plan props interface
- [ ] Consider accessibility requirements

### Component Requirements (NativeWind)
- [ ] TypeScript with proper types (no `any`)
- [ ] Use `styled` from nativewind or `className` prop
- [ ] Tailwind classes for styling (avoid inline styles)
- [ ] Accessible (accessibilityRole, accessibilityLabel, etc.)
- [ ] Touch target minimum 44x44 (p-3 minimum)
- [ ] Loading/disabled states
- [ ] Error states where applicable
- [ ] JSDoc comments for public API
- [ ] Consistent with cyber-gold theme

### Theme Compliance
- [ ] Uses cyber background colors (bg, surface, elevated)
- [ ] Gold accents for primary actions
- [ ] Proper text contrast (WCAG AA)
- [ ] Consistent border radius (rounded-lg for cards)
- [ ] Shadow effects for elevated surfaces

---

## Font Installation

### Expo Setup with NativeWind

```bash
# Install required packages
npx expo install expo-font nativewind tailwindcss

# Install Poppins fonts
# Download from https://fonts.google.com/specimen/Poppins
# Place in assets/fonts/
```

```typescript
// app/_layout.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { styled } from 'nativewind';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('@/assets/fonts/Poppins-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-cyber-bg">
        <Text className="text-gold-primary">Loading...</Text>
      </View>
    );
  }

  return <App />;
}
```

---

## Tailwind Utility Classes Reference

### Background Colors
```
bg-cyber-bg       - #0B0B0F (main background)
bg-cyber-surface  - #121218 (cards, sections)
bg-cyber-elevated - #1A1A22 (modals, overlays)
bg-gold-primary   - #D4AF37 (primary buttons)
bg-gold-bright    - #FFD700 (highlights)
```

### Text Colors
```
text-gray-100  - Near white (primary text)
text-gray-400  - Muted gray (secondary text)
text-gray-500  - Subtle gray (hints)
text-gold-primary  - #D4AF37 (accent text)
text-gold-bright   - #FFD700 (emphasis)
```

### Border Colors
```
border-cyber-border - #2A2A35 (dividers)
border-gold-primary - #D4AF37 (accent borders)
```

### Shadows
```
shadow-gold-glow        - Gold glow effect
shadow-gold-glow-strong - Strong gold glow
shadow-lg               - Standard large shadow
```

### Font Classes
```
font-poppins         - Regular weight
font-poppins-medium  - Medium weight
font-poppins-semibold - SemiBold weight
font-poppins-bold    - Bold weight
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-02-22 | Updated to Tailwind/NativeWind with cyber-gold theme |
| 1.0.0 | 2026-02-22 | Initial design rules with cyber theme |

---

*This document serves as the definitive guide for UI component design. All new components must follow these guidelines.*
