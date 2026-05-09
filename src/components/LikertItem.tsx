import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface LikertItemProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function LikertItem({ label, value, onChange }: LikertItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((score) => (
          <Pressable
            key={score}
            onPress={() => onChange(score)}
            style={[styles.choice, value === score && styles.selected]}
          >
            <Text style={[styles.choiceText, value === score && styles.selectedText]}>{score}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14
  },
  label: {
    color: '#1F2937',
    lineHeight: 20,
    fontSize: 14,
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    gap: 8
  },
  choice: {
    width: 42,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    backgroundColor: '#2F6FED',
    borderColor: '#2F6FED'
  },
  choiceText: {
    color: '#334155',
    fontWeight: '700'
  },
  selectedText: {
    color: '#FFFFFF'
  }
});
