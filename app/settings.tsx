import { View } from 'react-native'
import { ThemeChanger } from '@/components/ThemeChanger'
import { Version } from '@/components/Version'

export default function SettingsPage() {
  return (
    <View style={{ gap: 10 }}>
      <ThemeChanger />
      <Version />
    </View>
  )
}
