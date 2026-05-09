import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GamificationState } from '../types';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';

interface GamificationPanelProps {
  state: GamificationState;
}

export function GamificationPanel({ state }: GamificationPanelProps) {
  const levelProgress = (state.xp % 100) / 100;

  return (
    <Card>
      <Text style={styles.title}>Gamification Progress</Text>
      <View style={styles.row}>
        <Text style={styles.stat}>XP: {state.xp}</Text>
        <Text style={styles.stat}>Level: {state.level}</Text>
        <Text style={styles.stat}>Streak: {state.streak}</Text>
      </View>
      <ProgressBar progress={levelProgress} />
      <Text style={styles.caption}>{100 - (state.xp % 100)} XP to next level</Text>
      <Text style={styles.badgeTitle}>Badges</Text>
      <View style={styles.badges}>
        {state.badges.length === 0 ? (
          <Text style={styles.emptyBadge}>No badge yet. Complete a lesson to earn one.</Text>
        ) : (
          state.badges.map((badge) => (
            <View key={badge} style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  stat: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2F6FED'
  },
  caption: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8
  },
  badgeTitle: {
    marginTop: 14,
    fontSize: 14,
    color: '#172033',
    fontWeight: '800'
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8
  },
  badge: {
    backgroundColor: '#FFF7DF',
    borderWidth: 1,
    borderColor: '#F7C948',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999
  },
  badgeText: {
    color: '#8A5A00',
    fontWeight: '700'
  },
  emptyBadge: {
    color: '#6B7280'
  }
});
