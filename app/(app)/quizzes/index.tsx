import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../../lib/supabase';

type Quiz = {
  id: string;
  title: string;
  subject: string;
  total_questions: number;
};

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*');

      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      setError('Failed to load quizzes');
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
        <Button onPress={fetchQuizzes}>Retry</Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Available Quizzes</Text>

      {quizzes.map((quiz) => (
        <Card key={quiz.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{quiz.title}</Text>
            <Text variant="bodyMedium">Subject: {quiz.subject}</Text>
            <Text variant="bodyMedium">Questions: {quiz.total_questions}</Text>
          </Card.Content>
          <Card.Actions>
            <Button 
              onPress={() => router.push({
                pathname: '/(app)/quizzes/[id]',
                params: { id: quiz.id }
              })}
            >
              Start Quiz
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