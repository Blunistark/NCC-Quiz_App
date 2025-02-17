import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

export default function MockTestResult() {
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
      <Text variant="headlineMedium" style={styles.title}>Test Completed!</Text>
      
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
          onPress={() => router.push('/(app)/mock-tests')}
          style={styles.button}
        >
          Take Another Test
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => router.push('/(app)/leaderboard')}
          style={styles.button}
        >
          View Leaderboard
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
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  scoreCard: {
    marginBottom: 30,
  },
  score: {
    textAlign: 'center',
    fontSize: 48,
    marginBottom: 10,
  },
  percentage: {
    textAlign: 'center',
    marginBottom: 10,
  },
  grade: {
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  button: {
    marginBottom: 10,
  },
}); 