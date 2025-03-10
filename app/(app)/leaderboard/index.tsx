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
  quiz_title: string;
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      fetchLeaderboard();
    }
  }, [selectedTopic]);

  async function fetchTopics() {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('subject');

      if (error) throw error;

      // Extract unique subjects
      const subjects = Array.from(new Set(data.map((quiz) => quiz.subject)));
      setTopics(subjects);
      setSelectedTopic(subjects[0]); // Set the first topic as default
    } catch (error) {
      console.error('Error fetching topics:', error);
      setError('Failed to load topics');
    }
  }

  async function fetchLeaderboard() {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('quiz_results')
        .select(`
          user_id,
          score,
          profiles!quiz_results_user_id_fkey (
            name
          ),
          quizzes (
            subject
          )
        `)
        .eq('quizzes.subject', selectedTopic); // Ensure selectedTopic is a valid subject

      if (error) throw error;

      console.log('Fetched data:', data);

      // Check if data is valid
      if (!data || !Array.isArray(data)) {
        setEntries([]);
        return;
      }

      // Process data to calculate totals and averages
      const userScores = data.reduce<Record<string, LeaderboardEntry>>((acc, curr) => {
        const userId = curr.user_id;
        const userName = curr.profiles ? curr.profiles.name : 'Unknown'; // Get user's name from profiles

        if (!acc[userId]) {
          acc[userId] = {
            user_id: userId,
            name: userName,
            total_score: 0,
            tests_completed: 0,
            average_score: 0,
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
      console.error('Error fetching leaderboard:', error);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <Button mode="contained" onPress={fetchLeaderboard} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  if (!entries.length) {
    return (
      <View style={styles.centered}>
        <Text>No leaderboard data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Leaderboard for {selectedTopic}</Text>

      <View style={styles.filters}>
        {topics.map((topic) => (
          <Chip
            key={topic}
            selected={selectedTopic === topic}
            onPress={() => setSelectedTopic(topic)}
            style={styles.chip}
          >
            {topic}
          </Chip>
        ))}
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Rank</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Score</DataTable.Title>
          <DataTable.Title numeric>Avg</DataTable.Title>
        </DataTable.Header>

        {entries.map((entry, index) => (
          <DataTable.Row key={entry.user_id} style={styles.row}>
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
    backgroundColor: '#f9f9f9', // Light background color
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', // Primary color
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chip: {
    marginHorizontal: 5,
    backgroundColor: '#4CAF50', // Chip background color
    color: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    marginTop: 10,
  },
  row: {
    backgroundColor: '#ffffff', // Row background color
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Row border color
  },
});