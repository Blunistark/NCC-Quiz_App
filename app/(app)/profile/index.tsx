import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../lib/auth';

type Profile = {
  name: string;
  regimental_number: string;
  unit: string;
  school_college: string;
  directorate: string;
  group: string;
} | null;

export default function Profile() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle(); // Use maybeSingle instead of single

      if (error) throw error;

      if (!data) {
        // If no profile exists, redirect to complete profile
        router.replace('/(app)/complete-profile');
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load profile');
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
        <Button onPress={fetchProfile}>Retry</Button>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text>No profile found</Text>
        <Button 
          mode="contained" 
          onPress={() => router.replace('/(app)/complete-profile')}
          style={styles.button}
        >
          Complete Profile
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Profile</Text>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.field}>
            <Text variant="labelLarge">Email</Text>
            <Text variant="bodyLarge">{session?.user?.email}</Text>
          </View>

          <View style={styles.field}>
            <Text variant="labelLarge">Name</Text>
            <Text variant="bodyLarge">{profile.name}</Text>
          </View>

          <View style={styles.field}>
            <Text variant="labelLarge">Regimental Number</Text>
            <Text variant="bodyLarge">{profile.regimental_number}</Text>
          </View>

          <View style={styles.field}>
            <Text variant="labelLarge">Unit</Text>
            <Text variant="bodyLarge">{profile.unit}</Text>
          </View>

          <View style={styles.field}>
            <Text variant="labelLarge">School/College</Text>
            <Text variant="bodyLarge">{profile.school_college}</Text>
          </View>

          <View style={styles.field}>
            <Text variant="labelLarge">Directorate</Text>
            <Text variant="bodyLarge">{profile.directorate}</Text>
          </View>

          <View style={styles.field}>
            <Text variant="labelLarge">Group</Text>
            <Text variant="bodyLarge">{profile.group}</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/(app)/profile/edit')}
          style={styles.button}
        >
          Edit Profile
        </Button>

        <Button
          mode="outlined"
          onPress={() => supabase.auth.signOut()}
          style={styles.button}
        >
          Sign Out
        </Button>
      </View>
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
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
  },
  field: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
}); 