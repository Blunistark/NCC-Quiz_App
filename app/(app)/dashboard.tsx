import { View, StyleSheet, ScrollView, Image } from 'react-native';
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
      
      <View style={styles.header}>
        <Image 
          source={require('../../assets/ncc-logo.png')} 
          style={styles.logo}
        />
        <Text variant="headlineMedium" style={styles.welcome}>
          Welcome to NCC Quiz
        </Text>
      </View>

      <View style={styles.grid}>
        <Card style={[styles.card, { borderLeftColor: '#E31E24', borderLeftWidth: 4 }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <View>
                <Text variant="titleLarge" style={{ color: '#1B3C8D' }}>Quizzes</Text>
                <Text variant="bodyMedium">Practice with topic-based quizzes</Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained"
              style={{ backgroundColor: '#E31E24' }}
              onPress={() => router.push('/(app)/quizzes')}
            >
              Start Quiz
            </Button>
          </Card.Actions>
        </Card>

        <Card style={[styles.card, { borderLeftColor: '#E31E24', borderLeftWidth: 4 }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <View>
                <Text variant="titleLarge" style={{ color: '#1B3C8D' }}>Mock Tests</Text>
                <Text variant="bodyMedium">Take a comprehensive mock test</Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => router.push('/(app)/mock-tests')}>
              Start Test
            </Button>
          </Card.Actions>
        </Card>

        <Card style={[styles.card, { borderLeftColor: '#E31E24', borderLeftWidth: 4 }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <View>
                <Text variant="titleLarge" style={{ color: '#1B3C8D' }}>Leaderboard</Text>
                <Text variant="bodyMedium">Check your ranking</Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => router.push('/(app)/leaderboard')}>
              View Rankings
            </Button>
          </Card.Actions>
        </Card>

        <Card style={[styles.card, { borderLeftColor: '#E31E24', borderLeftWidth: 4 }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <View>
                <Text variant="titleLarge" style={{ color: '#1B3C8D' }}>Profile</Text>
                <Text variant="bodyMedium">Manage your profile</Text>
              </View>
            </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  welcome: {
    textAlign: 'center',
    color: '#1B3C8D',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
  },
}); 