import { ThemedView } from '@/components/ui/ThemedView'
import { Image } from 'expo-image'
import { ThemedText } from '@/components/ui/ThemedText'
import { Pressable } from 'react-native'
import React from 'react'
import { Currency } from '@/api/currencies'
import { StyleSheet } from 'react-native'

interface Props {
  onItemPress: (item: Currency) => void
  item: Currency
}

export const SearchItem = ({ onItemPress, item }: Props) => {
  const code = item.code.toLowerCase()
  const source = `https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${code}.svg`
  return (
    <Pressable onPress={() => onItemPress(item)}>
      <ThemedView style={styles.container}>
        <Image style={styles.image} source={source} />
        <ThemedText>
          {item.name} - {item.code}
        </ThemedText>
      </ThemedView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  image: { width: 64, height: 64, marginRight: 10 },
})
