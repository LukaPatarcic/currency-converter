import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { mmkvStorage } from '@/helpers/mmkv'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'

type Theme = 'light' | 'dark' | 'automatic'

interface SettingsStore {
  theme: Theme
  themeValue: typeof DefaultTheme | typeof DarkTheme
  setTheme: (theme: Theme) => void
}

export const useSettingsStore = create(
  persist<SettingsStore>(
    (set, get) => ({
      theme: 'automatic',
      themeValue: DefaultTheme,
      setTheme: (theme: Theme) => {
        const themeValue = theme === 'dark' ? DarkTheme : DefaultTheme
        set({ theme, themeValue })
      },
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)
