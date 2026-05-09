import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
}

export function FormField({ label, ...textInputProps }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputProps} style={[styles.input, textInputProps.style]} placeholderTextColor="#94A3B8" />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 12
  },
  label: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '700',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A'
  }
});
