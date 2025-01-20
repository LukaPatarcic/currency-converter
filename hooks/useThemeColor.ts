/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useSettingsStore } from '@/store/use-settings-store'

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const settingsTheme = useSettingsStore(state => state.theme)
  const theme = settingsTheme === 'automatic' ? useColorScheme() : settingsTheme

  return Colors[theme!][colorName]
}
