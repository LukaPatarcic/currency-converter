import React, { useCallback, useEffect } from 'react'
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useMutation } from '@tanstack/react-query'
import { useCurrencyStore } from '@/store/use-currency-store'
import { ThemedView } from '@/components/ui/ThemedView'
import { ConversionResponse, convertCurrency } from '@/api/currencies'
import { ThemedTextInput } from '@/components/ui/ThemedTextInput'
import { CurrencyItem } from '@/components/CurrencyItem'
import { useFocusEffect } from 'expo-router'
import { BackgroundView } from '@/components/ui/BackgroundView'
import { ThemedIcon } from '@/components/ui/ThemedIcon'
import { SwitchCurrencies } from '@/components/SwitchCurrencies'

export default function HomeScreen() {
  const defaultCurrencies = useCurrencyStore(state => state.defaultCurrencies)
  const [fromCurrency, toCurrency] = defaultCurrencies
  const currencies = useCurrencyStore(state => state.currencies)
  const setDefaultCurrency = useCurrencyStore(state => state.setDefaultCurrency)
  const [result, setResult] = React.useState<ConversionResponse | null>(null)
  const [amount, setAmount] = React.useState('')
  const [_, setRerender] = React.useState(false)
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

  const mutateCurrency = () => {
    if (!fromCurrency || !toCurrency) {
      return
    }
    currencyConverterMutation
      .mutateAsync({
        fromCurrency: fromCurrency?.code,
        toCurrency: toCurrency?.code,
        amount,
      })
      .then(setResult)
  }

  const onSubmit = () => {
    mutateCurrency()
  }

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      return
    }

    setDefaultCurrency(currencies[0], '0')
    setDefaultCurrency(currencies[1], '1')
  }, [])

  useFocusEffect(
    useCallback(() => {
      setRerender(true)
      mutateCurrency()

      return () => {
        setRerender(false)
      }
    }, []),
  )

  return (
    <View style={styles.container}>
      <View style={styles.currencyContainer}>
        {fromCurrency && (
          <CurrencyItem currency={fromCurrency} href="/search?index=0" />
        )}
        <SwitchCurrencies />
        {toCurrency && (
          <CurrencyItem currency={toCurrency} href="/search?index=1" />
        )}
      </View>

      <ThemedTextInput
        submitBehavior="blurAndSubmit"
        value={amount}
        onChangeText={setAmount}
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyContainer: {
    position: 'relative',
    gap: 10,
  },
})
