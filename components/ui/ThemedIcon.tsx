import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { StyleProp, TextStyle } from 'react-native'

interface Props {
  name: 'settings' | 'compare-arrows'
  style?: StyleProp<TextStyle>
}

export const ThemedIcon = ({ name, style }: Props) => {
  const color = useThemeColor('text')

  return <MaterialIcons color={color} size={24} name={name} style={style} />
}
