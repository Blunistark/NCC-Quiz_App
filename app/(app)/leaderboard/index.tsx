import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Chip, ActivityIndicator, DataTable } from 'react-native-paper';
import { supabase } from '../../../lib/supabase';

type LeaderboardEntry = {
  user_id: string;
  name: string;
  total_score: number;
  tests_completed: number;
  average_score: number;
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<'quiz' | 'mock'>('quiz');

  useEffect(() => {
    fetchLeaderboard();
  }, [type]);

  async function fetchLeaderboard() {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from(type === 'quiz' ? 'quiz_results' : 'mock_test_results')
        .select(`
          user_id,
          score,
          profiles!${type === 'quiz' ? 'quiz_results_user_id_fkey' : 'mock_test_results_user_id_fkey'} (
            name
          )
        `);

      if (error) throw error;
      if (!data) return;

      // Process data to calculate totals and averages
      const userScores = data.reduce<Record<string, LeaderboardEntry>>((acc, curr) => {
        const userId = curr.user_id;
        if (!acc[userId]) {
          acc[userId] = {
            user_id: userId,
            name: curr.profiles[0]?.name || 'Unknown',
            total_score: 0,
            tests_completed: 0,
            average_score: 0
          };
        }
        acc[userId].total_score += curr.score;
        acc[userId].tests_completed += 1;
        acc[userId].average_score = Math.round(acc[userId].total_score / acc[userId].tests_completed);
        return acc;
      }, {});

      // Sort by total score
      const sortedEntries = Object.values(userScores).sort((a, b) => b.total_score - a.total_score);
      setEntries(sortedEntries);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <Button onPress={fetchLeaderboard}>Retry</Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Leaderboard</Text>

      <View style={styles.filters}>
        <Chip
          selected={type === 'quiz'}
          onPress={() => setType('quiz')}
          style={styles.chip}
        >
          Quizzes
        </Chip>
        <Chip
          selected={type === 'mock'}
          onPress={() => setType('mock')}
          style={styles.chip}
        >
          Mock Tests
        </Chip>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Rank</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Score</DataTable.Title>
          <DataTable.Title numeric>Avg</DataTable.Title>
        </DataTable.Header>

        {entries.map((entry, index) => (
          <DataTable.Row key={entry.user_id}>
            <DataTable.Cell>{index + 1}</DataTable.Cell>
            <DataTable.Cell>{entry.name}</DataTable.Cell>
            <DataTable.Cell numeric>{entry.total_score}</DataTable.Cell>
            <DataTable.Cell numeric>{entry.average_score}%</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chip: {
    marginHorizontal: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
}); 