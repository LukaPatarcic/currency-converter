import { ThemedView } from '@/components/ui/ThemedView'
import { ThemedText } from '@/components/ui/ThemedText'
import { Link, Href } from 'expo-router'
import React from 'react'
import { FlagImage } from '@/components/FlagImage'
import { Currency } from '@/api/currencies'
import { StyleSheet } from 'react-native'

interface CurrencyItemProps {
  currency: Currency
  href: Href
}

export const CurrencyItem = ({ currency, href }: CurrencyItemProps) => {
  return (
    <Link href={href} push>
      <ThemedView style={styles.container}>
        <FlagImage code={currency.code.toLowerCase()} />
        <ThemedText>
          {currency.name} - {currency.code}
        </ThemedText>
      </ThemedView>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
})
