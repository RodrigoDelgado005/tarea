import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="Usuario" options={{ headerShown: false }} />
        <Stack.Screen name="TablaPosiciones" options={{ headerShown: false }} />
        <Stack.Screen name="Fixture" options={{ headerShown: false }} />
        <Stack.Screen name="Seguidor" options={{ headerShown: false }} />
        <Stack.Screen name="Jugadores" options={{ headerShown: false }} />
        <Stack.Screen name="Estadisticas" options={{ headerShown: false }} />
        <Stack.Screen name="Estangasions" options={{ headerShown: false }} />
        <Stack.Screen name="Administrador" options={{ headerShown: false }} />
        <Stack.Screen name="AdministradorScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
