import React, { useState } from 'react'
import {
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import { useCurrencyStore } from '@/store/use-currency-store'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Currency } from '@/api/currencies'
import { ThemedTextInput } from '@/components/ui/ThemedTextInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchItem } from '@/components/SearchItem'

export default function SearchScreen() {
  const router = useRouter()
  const { index } = useLocalSearchParams<{ index: '0' | '1' }>()
  const initialCountries = useCurrencyStore(state => state.currencies)
  const [countries, setCountries] = useState(initialCountries)
  const setDefaultCurrency = useCurrencyStore(state => state.setDefaultCurrency)

  const onItemPress = (item: Currency) => {
    setDefaultCurrency(item, index)
    router.back()
  }

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text.toLowerCase().trim()
    const filteredCountries = initialCountries.filter(
      country =>
        country.name.toLowerCase().includes(text) ||
        country.code.toLowerCase().includes(text),
    )

    setCountries(filteredCountries)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedTextInput
        autoFocus
        placeholder="Search for Currency"
        onChange={onChange}
      />
      <FlatList
        data={countries}
        style={{ width: '100%' }}
        keyboardShouldPersistTaps="always"
        renderItem={({ item }) => (
          <SearchItem item={item} onItemPress={onItemPress} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
