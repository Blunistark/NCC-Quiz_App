import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, RadioButton, ActivityIndicator, ProgressBar } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../lib/supabase';

type Question = {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
};

type MockTest = {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  total_questions: number;
};

export default function MockTestScreen() {
  const { id } = useLocalSearchParams();
  const [test, setTest] = useState<MockTest | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    fetchTestAndQuestions();
  }, [id]);

  useEffect(() => {
    if (test?.duration_minutes) {
      setTimeLeft(test.duration_minutes * 60);
    }
  }, [test]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTestSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  async function fetchTestAndQuestions() {
    try {
      // Fetch test details
      const { data: testData, error: testError } = await supabase
        .from('mock_tests')
        .select('*')
        .eq('id', id)
        .single();

      if (testError) throw testError;
      setTest(testData);

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('mock_test_questions')
        .select('*')
        .eq('mock_test_id', id);

      if (questionsError) throw questionsError;
      setQuestions(questionsData);
    } catch (error) {
      setError('Failed to load test');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleTestSubmit = async () => {
    Alert.alert(
      'Submit Test',
      'Are you sure you want to submit your test?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: async () => {
            try {
              const score = questions.reduce((acc, question) => {
                return acc + (answers[question.id] === question.correct_answer ? 1 : 0);
              }, 0);

              // Save test result
              await supabase.from('mock_test_results').insert({
                user_id: (await supabase.auth.getUser()).data.user?.id,
                mock_test_id: id,
                score,
                total_questions: questions.length,
                completed_at: new Date().toISOString(),
              });

              router.push({
                pathname: '/(app)/mock-tests/result',
                params: { score, total: questions.length }
              });
            } catch (error) {
              console.error('Error saving results:', error);
              Alert.alert('Error', 'Failed to save test results');
            }
          },
        },
      ]
    );
  };

  const startTest = () => {
    setTestStarted(true);
    // Start the timer here if you have one
  };

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
        <Button onPress={fetchTestAndQuestions}>Retry</Button>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercentage = currentIndex / questions.length;

  return (
    <View style={styles.container}>
      {!testStarted ? (
        <View style={styles.centered}>
          <Text variant="headlineMedium" style={styles.title}>Ready to Start?</Text>
          <Text variant="bodyLarge" style={styles.instructions}>
            You will have {test?.duration_minutes} minutes to complete {test?.total_questions} questions.
          </Text>
          <Button 
            mode="contained" 
            onPress={startTest}
            style={styles.button}
          >
            Start Test
          </Button>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.timer}>Time Left: {formatTime(timeLeft)}</Text>
            <ProgressBar progress={progressPercentage} style={styles.progress} />
            <Text style={styles.questionCount}>
              Question {currentIndex + 1} of {questions.length}
            </Text>
          </View>

          <ScrollView style={styles.content}>
            <Text variant="headlineSmall" style={styles.question}>
              {currentQuestion.question_text}
            </Text>

            <RadioButton.Group
              onValueChange={value => handleAnswer(currentQuestion.id, value)}
              value={answers[currentQuestion.id] || ''}
            >
              {['A', 'B', 'C', 'D'].map((option) => (
                <View key={option} style={styles.option}>
                  <RadioButton.Item
                    label={`${option}. ${currentQuestion[`option_${option.toLowerCase()}`]}`}
                    value={option}
                  />
                </View>
              ))}
            </RadioButton.Group>
          </ScrollView>

          <View style={styles.navigation}>
            <Button
              mode="outlined"
              onPress={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            
            {currentIndex === questions.length - 1 ? (
              <Button
                mode="contained"
                onPress={handleTestSubmit}
              >
                Submit Test
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              >
                Next
              </Button>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  progress: {
    marginVertical: 10,
  },
  questionCount: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  question: {
    marginBottom: 20,
  },
  option: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  title: {
    marginBottom: 20,
  },
  instructions: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
}); 