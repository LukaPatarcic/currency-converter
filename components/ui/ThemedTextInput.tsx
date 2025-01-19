import { TextInput, TextInputProps } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

interface ThemedTextInputProps extends TextInputProps {
  lightColor?: string
  darkColor?: string
}

export const ThemedTextInput = (props: ThemedTextInputProps) => {
  const backgroundColor = useThemeColor(
    { light: props?.lightColor, dark: props?.darkColor },
    'background',
  )
  const color = useThemeColor(
    { light: props?.lightColor, dark: props?.darkColor },
    'text',
  )

  return (
    <TextInput
      style={{
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
        height: 40,
        borderColor: color,
        color,
        backgroundColor,
      }}
      placeholderTextColor={color}
      {...props}
    />
  )
}
