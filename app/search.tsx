import React from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native'
import { Image } from 'expo-image'
import { ThemedText } from '@/components/ThemedText'
import { useCurrencyStore } from '@/store/use-currency-store'
import { ThemedView } from '@/components/ThemedView'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Currency } from '@/api/currencies'

export default function SearchScreen() {
  const router = useRouter()
  const { index } = useLocalSearchParams<{ index: '0' | '1' }>()
  const countries = useCurrencyStore(state => state.currencies)
  const setDefaultCurrency = useCurrencyStore(state => state.setDefaultCurrency)

  const onItemPress = (item: Currency) => {
    setDefaultCurrency(item, index)
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={countries}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <Pressable onPress={() => onItemPress(item)}>
            <ThemedView
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                width: '100%',
              }}
            >
              <Image
                style={{ width: 64, height: 64, marginRight: 10 }}
                source={`https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${item.code.toLowerCase()}.svg`}
              />
              <ThemedText>{item.name}</ThemedText>
            </ThemedView>
          </Pressable>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
