import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../lib/auth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="(auth)" 
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="(app)" 
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </PaperProvider>
    </AuthProvider>
  );
} 