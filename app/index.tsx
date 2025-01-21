import React, { useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useCurrencyStore } from '@/store/use-currency-store'
import { ThemedTextInput } from '@/components/ui/ThemedTextInput'
import { CurrencyItem } from '@/components/CurrencyItem'
import { useFocusEffect } from 'expo-router'
import { SwitchCurrencies } from '@/components/SwitchCurrencies'

export default function HomeScreen() {
  const {
    defaultCurrencies,
    currencies,
    setDefaultCurrency,
    convertCurrency,
    amount,
    result,
    setAmount,
  } = useCurrencyStore()
  const [fromCurrency, toCurrency] = defaultCurrencies

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      return
    }

    setDefaultCurrency(currencies[0], '0')
    setDefaultCurrency(currencies[1], '1')
  }, [])

  useFocusEffect(
    useCallback(() => {
      convertCurrency()
    }, []),
  )

  return (
    <View style={styles.container}>
      <View style={styles.currencyContainer}>
        <View style={styles.fromCurrencyContainer}>
          {fromCurrency && (
            <CurrencyItem currency={fromCurrency} href="/search?index=0" />
          )}
          <ThemedTextInput
            submitBehavior="blurAndSubmit"
            value={amount}
            onChangeText={setAmount}
            onSubmitEditing={convertCurrency}
            keyboardType="numeric"
            placeholder="Enter amount"
          />
        </View>

        <SwitchCurrencies />

        <View style={styles.toCurrencyContainer}>
          {toCurrency && (
            <CurrencyItem currency={toCurrency} href="/search?index=1" />
          )}
          <ThemedTextInput
            editable={false}
            value={result}
            placeholder={`Value from ${fromCurrency?.code} to ${toCurrency?.code}`}
          />
        </View>
      </View>
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
  fromCurrencyContainer: {
    gap: 10,
  },
  toCurrencyContainer: {
    gap: 10,
  },
  currencyContainer: {
    width: '100%',
    gap: 30,
  },
})
