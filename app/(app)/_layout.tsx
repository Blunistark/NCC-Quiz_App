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
          headerBackVisible: false,
          headerShown : false
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
          title: 'Quizzes',
          headerTitle: 'Quizzes',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="quizzes/[id]"
        options={{
          title: 'Quiz',
          headerTitle: 'Quiz',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="quizzes/result"
        options={{
          title: 'Quiz Result',
          headerTitle: 'Quiz Result',
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="mock-tests"
        options={{
          title: 'Mock Tests',
          headerTitle: 'Mock Tests',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="mock-tests/[id]"
        options={{
          title: 'Mock Test',
          headerTitle: 'Mock Test',
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="mock-tests/result"
        options={{
          title: 'Test Result',
          headerTitle: 'Test Result',
          headerShown: false,
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          headerTitle: 'Leaderboard',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Profile',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="profile/edit"
        options={{
          title: 'Edit Profile',
          headerTitle: 'Edit Profile',
          headerShown: false
        }}
      />
    </Stack>
  );
} 