import { TextInput, TextInputProps, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

export const ThemedTextInput = (props: TextInputProps) => {
  const backgroundColor = useThemeColor('background')
  const color = useThemeColor('text')
  const border = useThemeColor('border')

  return (
    <TextInput
      style={[
        styles.textInput,
        {
          borderColor: border,
          color,
          backgroundColor,
        },
      ]}
      placeholderTextColor={color}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    height: 40,
  },
})
