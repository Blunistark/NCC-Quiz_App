import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, RadioButton, ActivityIndicator } from 'react-native-paper';
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

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  async function fetchQuestions() {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', id);

      if (error) throw error;

      setQuestions(data);
    } catch (error) {
      setError('Failed to load questions');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const currentQuestion = questions[currentIndex];

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
        <Button onPress={fetchQuestions}>Retry</Button>
      </View>
    );
  }

  if (!questions.length) {
    return (
      <View style={styles.centered}>
        <Text>No questions available</Text>
      </View>
    );
  }

  const handleAnswer = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    setShowResult(true);

    // Move to next question after 2 seconds (reduced from 5)
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        handleSubmit();
      }
    }, 1000); // Changed from 5000 to 2000 milliseconds
  };

  const handleSubmit = async () => {
    Alert.alert(
      'Submit Quiz',
      'Are you sure you want to submit your answers?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: async () => {
            try {
              // Calculate score by comparing answers with correct answers
              const score = questions.reduce((total, question) => {
                const userAnswer = selectedAnswer;
                return total + (userAnswer === question.correct_answer ? 1 : 0);
              }, 0);

              // Save quiz result
              await supabase.from('quiz_results').insert({
                user_id: (await supabase.auth.getUser()).data.user?.id,
                quiz_id: id,
                score,
                total_questions: questions.length,
                completed_at: new Date().toISOString(),
              });

              // Navigate to result screen
              router.push({
                pathname: '/(app)/quizzes/result',
                params: { score, total: questions.length }
              });
            } catch (error) {
              console.error('Error saving results:', error);
              Alert.alert('Error', 'Failed to save quiz results');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.progress}>
        Question {currentIndex + 1} of {questions.length}
      </Text>

      <Text variant="headlineSmall" style={styles.question}>
        {currentQuestion.question_text}
      </Text>

      <RadioButton.Group
        onValueChange={value => setSelectedAnswer(value)}
        value={selectedAnswer || ''}
      >
        {['A', 'B', 'C', 'D'].map((option) => {
          const optionText = currentQuestion[`option_${option.toLowerCase()}`];
          const isCorrect = showResult && option === currentQuestion.correct_answer;
          const isWrong = showResult && selectedAnswer === option && !isCorrect;

          return (
            <View key={option} style={[
              styles.option,
              isCorrect && styles.correctOption,
              isWrong && styles.wrongOption,
            ]}>
              <RadioButton.Item
                label={`${option}. ${optionText}`}
                value={option}
                disabled={showResult}
              />
            </View>
          );
        })}
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={handleAnswer}
        disabled={!selectedAnswer || showResult}
        style={styles.button}
      >
        Submit Answer
      </Button>
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
  progress: {
    textAlign: 'center',
    marginBottom: 20,
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
  correctOption: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  wrongOption: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
}); 