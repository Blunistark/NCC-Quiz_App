import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

export default function QuizResult() {
  const { score, total } = useLocalSearchParams();
  const percentage = Math.round((Number(score) / Number(total)) * 100);

  const getGrade = (percent: number) => {
    if (percent >= 90) return 'Excellent';
    if (percent >= 80) return 'Very Good';
    if (percent >= 70) return 'Good';
    if (percent >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  return (
    <View style={styles.container}>
      <Card style={styles.scoreCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.date}>
            {new Date().toLocaleDateString('en-US', { 
              month: 'uppercase',
              day: 'numeric'
            })}
          </Text>
          
          <Text variant="headlineLarge" style={styles.mainText}>
            You completed the quiz with
          </Text>
          
          <Text variant="displayLarge" style={styles.percentage}>
            {percentage}%
          </Text>
          
          <Text variant="headlineMedium" style={styles.accuracy}>
            accuracy!
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.scoreCard}>
        <Card.Content>
          <Text variant="headlineLarge" style={styles.score}>
            {score}/{total}
          </Text>
          
          <Text variant="headlineSmall" style={styles.percentage}>
            {percentage}%
          </Text>

          <Text variant="titleLarge" style={styles.grade}>
            {getGrade(percentage)}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/(app)/quizzes')}
          style={styles.button}
        >
          Take Another Quiz
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => router.push('/(app)/dashboard')}
          style={styles.button}
        >
          Back to Dashboard
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scoreCard: {
    backgroundColor: '#FFC800', // Duolingo yellow
    borderRadius: 20,
    marginBottom: 30,
  },
  date: {
    color: '#784910', // Dark brown text
    marginBottom: 10,
  },
  mainText: {
    color: '#784910',
    textAlign: 'center',
  },
  percentage: {
    fontSize: 72,
    color: '#784910',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  accuracy: {
    color: '#784910',
    textAlign: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 48,
    marginBottom: 10,
  },
  grade: {
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginBottom: 10,
  },
}); 