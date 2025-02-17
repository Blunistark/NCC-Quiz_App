import { Stack } from 'expo-router';
import { useAuth } from '../../lib/auth';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AppLayout() {
  const { session, isProfileComplete } = useAuth();

  useEffect(() => {
    if (session && !isProfileComplete) {
      router.replace('/(app)/complete-profile');
    }
  }, [session, isProfileComplete]);

  if (!session) return null;

  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="complete-profile"
        options={{
          title: 'Complete Profile',
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="quizzes"
        options={{
          title: 'Quizzes'
        }}
      />
      <Stack.Screen
        name="quizzes/[id]"
        options={{
          title: 'Quiz'
        }}
      />
      <Stack.Screen
        name="quizzes/result"
        options={{
          title: 'Quiz Result',
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="mock-tests"
        options={{
          title: 'Mock Tests'
        }}
      />
      <Stack.Screen
        name="mock-tests/[id]"
        options={{
          title: 'Mock Test',
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="mock-tests/result"
        options={{
          title: 'Test Result',
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard'
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile'
        }}
      />
      <Stack.Screen
        name="profile/edit"
        options={{
          title: 'Edit Profile'
        }}
      />
    </Stack>
  );
} 