import { ThemedText } from '@/components/ui/ThemedText'
import { version } from '../package.json'

export const Version = () => {
  return <ThemedText style={{ textAlign: 'center' }}>v. {version}</ThemedText>
}
