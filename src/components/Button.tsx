import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
}

export function AppButton({ title, onPress, disabled, variant = 'primary', style }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style
      ]}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 6
  },
  primary: {
    backgroundColor: '#2F6FED'
  },
  secondary: {
    backgroundColor: '#EEF3FF',
    borderColor: '#BFD0FF',
    borderWidth: 1
  },
  danger: {
    backgroundColor: '#D64545'
  },
  disabled: {
    opacity: 0.45
  },
  pressed: {
    opacity: 0.75
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  secondaryText: {
    color: '#2F6FED'
  }
});
