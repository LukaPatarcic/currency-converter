import { Pressable, View } from 'react-native'
import { ThemedIcon } from '@/components/ui/ThemedIcon'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useCurrencyStore } from '@/store/use-currency-store'

export const SwitchCurrencies = () => {
  const backgroundColor = useThemeColor('background')
  const switchCurrencies = useCurrencyStore(state => state.switchCurrencies)

  return (
    <Pressable onPress={switchCurrencies}>
      <View
        style={{
          backgroundColor,
          padding: 5,
          justifyContent: 'center',
          width: '100%',
          height: 35,
        }}
      >
        <ThemedIcon
          name="compare-arrows"
          style={{
            transform: [{ translateX: '-50%' }, { rotate: '90deg' }],
            position: 'absolute',
            left: '50%',
          }}
        />
      </View>
    </Pressable>
  )
}
