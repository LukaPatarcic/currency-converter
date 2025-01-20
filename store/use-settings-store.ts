import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { mmkvStorage } from '@/helpers/mmkv'
import { Animated } from 'react-native'

type Theme = 'light' | 'dark' | 'automatic'

interface SettingsStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useSettingsStore = create(
  persist<SettingsStore>(
    (set, get) => ({
      theme: 'automatic',
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)
