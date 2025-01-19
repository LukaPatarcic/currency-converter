import React from 'react'
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useMutation } from '@tanstack/react-query'
import { useCurrencyStore } from '@/store/use-currency-store'
import { ThemedView } from '@/components/ThemedView'
import { ConversionResponse, convertCurrency } from '@/api/currencies'
import { ThemedTextInput } from '@/components/ui/ThemedTextInput'
import { CurrencyItem } from '@/components/CurrencyItem'

export default function HomeScreen() {
  const [fromCurrency, toCurrency] = useCurrencyStore(
    state => state.defaultCurrencies,
  )
  const [result, setResult] = React.useState<ConversionResponse | null>(null)
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
      {fromCurrency && (
        <CurrencyItem currency={fromCurrency} href="/search?index=0" />
      )}
      {toCurrency && (
        <CurrencyItem currency={toCurrency} href="/search?index=1" />
      )}
      <ThemedTextInput
        submitBehavior="blurAndSubmit"
        onSubmitEditing={onSubmit}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      {result && (
        <ThemedView>
          <ThemedText>{result.result.toFixed(2)}</ThemedText>
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
