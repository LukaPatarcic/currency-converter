import { useSettingsStore } from '@/store/use-settings-store'
import { View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

interface Props {
  children: React.ReactNode
}

export const BackgroundView = ({ children }: Props) => {
  const backgroundColor = useThemeColor('background')
  return (
    <View style={{ backgroundColor, height: '100%', padding: 10 }}>
      {children}
    </View>
  )
}
