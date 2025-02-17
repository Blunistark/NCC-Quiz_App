import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../../lib/supabase';

type MockTest = {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  total_questions: number;
};

export default function MockTests() {
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMockTests();
  }, []);

  async function fetchMockTests() {
    try {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*');

      if (error) throw error;

      setMockTests(data);
    } catch (error) {
      setError('Failed to load mock tests');
      console.error('Error:', error);
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
        <Button onPress={fetchMockTests}>Retry</Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Mock Tests</Text>

      {mockTests.map((test) => (
        <Card key={test.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{test.title}</Text>
            <Text variant="bodyMedium">{test.description}</Text>
            <Text variant="bodyMedium">Duration: {test.duration_minutes} minutes</Text>
            <Text variant="bodyMedium">Questions: {test.total_questions}</Text>
          </Card.Content>
          <Card.Actions>
            <Button 
              onPress={() => router.push({
                pathname: '/(app)/mock-tests/[id]',
                params: { id: test.id }
              })}
            >
              Start Test
            </Button>
          </Card.Actions>
        </Card>
      ))}
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
  },
  card: {
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
}); 