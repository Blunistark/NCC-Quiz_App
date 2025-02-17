import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { AuthProvider } from '../lib/auth';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#E31E24',    // NCC Dark Blue
    secondary: '#1B3C8D',  // NCC Red
    tertiary: '#4B9CD3',   // NCC Light Blue
    background: '#FFFFFF',
    error: '#FF4B4B',
    surface: '#F5F5F5',
  },
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
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