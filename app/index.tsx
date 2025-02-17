import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Link } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Quiz App NCC
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Prepare for your exams with interactive quizzes
      </Text>
      <View style={styles.buttonContainer}>
        <Link href="/(auth)/login" asChild>
          <Button mode="contained" style={styles.button}>
            Login
          </Button>
        </Link>
        <Link href="/(auth)/register" asChild>
          <Button mode="outlined" style={styles.button}>
            Register
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginVertical: 10,
  },
}); 