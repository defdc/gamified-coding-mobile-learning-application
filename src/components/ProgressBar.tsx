import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const bounded = Math.max(0, Math.min(1, progress));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${bounded * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 10,
    backgroundColor: '#E6EAF2',
    borderRadius: 999,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    backgroundColor: '#2F6FED'
  }
});
