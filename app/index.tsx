import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'expo-router'
import { useCurrencyStore } from '@/store/use-currency-store'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'
import { ConversionResponse, convertCurrency, Currency } from '@/api/currencies'

export default function HomeScreen() {
  const defaultCurrencies = useCurrencyStore(state => state.defaultCurrencies)
  const [result, setResult] = React.useState<ConversionResponse | null>(null)
  const [fromCurrency, toCurrency] = defaultCurrencies
  const currencyConverterMutation = useMutation({
    mutationFn: ({
      fromCurrency,
      toCurrency,
      amount,
    }: {
      fromCurrency: string
      toCurrency: string
      amount: string
    }) => convertCurrency(fromCurrency, toCurrency, amount),
  })

  const onSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (!fromCurrency || !toCurrency) return
    const amount = e.nativeEvent.text
    currencyConverterMutation
      .mutateAsync({
        fromCurrency: fromCurrency?.code,
        toCurrency: toCurrency?.code,
        amount,
      })
      .then(setResult)
  }

  return (
    <View style={styles.container}>
      <Link href="/search?index=0">
        <ThemedView
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Image
            style={{ width: 64, height: 64, marginRight: 10 }}
            source={`https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${fromCurrency?.code.toLowerCase()}.svg`}
          />
          <ThemedText>{fromCurrency?.name}</ThemedText>
        </ThemedView>
      </Link>

      <Link href="/search?index=1">
        <ThemedView
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Image
            style={{ width: 64, height: 64, marginRight: 10 }}
            source={`https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${toCurrency?.code.toLowerCase()}.svg`}
          />
          <ThemedText>{toCurrency?.name}</ThemedText>
        </ThemedView>
      </Link>

      <TextInput
        style={{
          width: '100%',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'white',
          color: 'white',
        }}
        submitBehavior="blurAndSubmit"
        onSubmitEditing={onSubmit}
        keyboardType="numeric"
      />
      {result && (
        <ThemedView>
          <ThemedText>{result.result}</ThemedText>
        </ThemedView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
