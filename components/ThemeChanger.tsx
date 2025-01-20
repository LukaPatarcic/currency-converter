import { ThemedText } from '@/components/ui/ThemedText'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { ThemedView } from '@/components/ui/ThemedView'
import { useSettingsStore } from '@/store/use-settings-store'

const themeOptions = ['System Default', 'Light', 'Dark']
const map: Record<string, 'automatic' | 'light' | 'dark'> = {
  'System Default': 'automatic',
  Light: 'light',
  Dark: 'dark',
}

export const ThemeChanger = () => {
  const theme = useSettingsStore(state => state.theme)
  const setTheme = useSettingsStore(state => state.setTheme)
  const index = themeOptions.indexOf(map[theme])
  return (
    <ThemedView style={{ padding: 10, gap: 10 }}>
      <ThemedText>Application Theme</ThemedText>
      <SegmentedControl
        values={themeOptions}
        selectedIndex={index}
        onChange={event => {
          const index = event.nativeEvent.selectedSegmentIndex
          setTheme(map[themeOptions[index]])
        }}
      />
    </ThemedView>
  )
}
