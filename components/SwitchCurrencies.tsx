import { Pressable, View } from 'react-native'
import { ThemedIcon } from '@/components/ui/ThemedIcon'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useCurrencyStore } from '@/store/use-currency-store'

export const SwitchCurrencies = () => {
  const backgroundColor = useThemeColor('tint')
  const setDefaultCurrency = useCurrencyStore(state => state.setDefaultCurrency)
  const defaultCurrencies = useCurrencyStore(state => state.defaultCurrencies)

  const onPress = () => {
    const [fromCurrency, toCurrency] = [...defaultCurrencies]
    if (!fromCurrency || !toCurrency) {
      return
    }

    setDefaultCurrency(toCurrency, '0')
    setDefaultCurrency(fromCurrency, '1')
  }
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor,
          padding: 5,
          borderRadius: 100,
          position: 'absolute',
          right: 0,
          zIndex: 2,
          top: '50%',
          transform: 'translateY(-17.5%)',
        }}
      >
        <ThemedIcon
          name="compare-arrows"
          style={{ transform: 'rotate(90deg)' }}
        />
      </View>
    </Pressable>
  )
}
