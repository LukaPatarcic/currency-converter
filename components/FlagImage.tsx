import { Image, ImageStyle } from 'expo-image'
import { StyleProp } from 'react-native'

export const FlagImage = ({
  code,
  size = 64,
  style,
}: {
  code: string
  size?: number
  style?: StyleProp<ImageStyle>
}) => {
  return (
    <Image
      source={{
        uri: `https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${code.toLowerCase()}.svg`,
      }}
      style={[{ width: size, height: size }, style]}
    />
  )
}
