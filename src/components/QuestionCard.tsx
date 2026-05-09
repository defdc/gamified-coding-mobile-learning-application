import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  showTopic?: boolean;
}

export function QuestionCard({ question, selectedOptionId, onSelect, showTopic = true }: QuestionCardProps) {
  return (
    <Card>
      {showTopic ? <Text style={styles.topic}>{question.topic}</Text> : null}
      <Text style={styles.prompt}>{question.prompt}</Text>
      {question.code ? <Text style={styles.code}>{question.code}</Text> : null}
      <View style={styles.optionList}>
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={[styles.option, selected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
                {option.id}. {option.text}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  topic: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 8
  },
  prompt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 10,
    lineHeight: 22
  },
  code: {
    backgroundColor: '#111827',
    color: '#F9FAFB',
    fontFamily: 'monospace',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    lineHeight: 20
  },
  optionList: {
    gap: 8
  },
  option: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12
  },
  selectedOption: {
    backgroundColor: '#EAF1FF',
    borderColor: '#2F6FED'
  },
  optionText: {
    color: '#1F2937',
    fontSize: 15,
    lineHeight: 20
  },
  selectedOptionText: {
    color: '#1D4ED8',
    fontWeight: '700'
  }
});
