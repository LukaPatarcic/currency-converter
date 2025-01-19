import React from 'react'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCurrencyStore } from '@/store/use-currency-store'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

// React Query Client
const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const fetchCurrencies = useCurrencyStore(state => state.fetchCurrencies)
  const [loaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      fetchCurrencies()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
