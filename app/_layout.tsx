// app/_layout.tsx
import { Slot } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { HistoryProvider } from '@/hooks/HistoryContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <HistoryProvider>
        <Slot /> {/* <- Cho phép load layout con như (tabs), Screens/... */}
        <StatusBar style="auto" />
      </HistoryProvider>
    </ThemeProvider>
  );
}
