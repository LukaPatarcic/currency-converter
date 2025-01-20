import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { Link } from 'expo-router'
import { ThemedIcon } from '@/components/ui/ThemedIcon'

export const HeaderSettings = () => {
  return (
    <View>
      <Link href="/settings" push>
        <ThemedIcon name="settings" />
      </Link>
    </View>
  )
}
