import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Banner } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

export default function Dashboard() {
  const { session, isProfileComplete } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.container}>
      {!isProfileComplete && (
        <Banner
          visible={true}
          actions={[
            {
              label: 'Complete Profile',
              onPress: () => router.push('/(app)/profile'),
            },
          ]}
        >
          Please complete your profile to access all features
        </Banner>
      )}
      
      <Text variant="headlineMedium" style={styles.welcome}>
        Welcome
      </Text>

      <View style={styles.grid}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Quizzes</Text>
            <Text variant="bodyMedium">Practice with topic-based quizzes</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => router.push('/(app)/quizzes')}>
              Start Quiz
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Mock Tests</Text>
            <Text variant="bodyMedium">Take a comprehensive mock test</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => router.push('/(app)/mock-tests')}>
              Start Test
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Leaderboard</Text>
            <Text variant="bodyMedium">Check your ranking</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => router.push('/(app)/leaderboard')}>
              View Rankings
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Profile</Text>
            <Text variant="bodyMedium">Manage your profile</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => router.push('/(app)/profile')}>
              View Profile
            </Button>
          </Card.Actions>
        </Card>
      </View>

      <Button 
        mode="outlined" 
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        Sign Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 20,
  },
  signOutButton: {
    marginTop: 20,
    marginBottom: 40,
  },
}); 