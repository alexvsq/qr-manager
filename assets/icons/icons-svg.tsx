import React from "react"
import { View } from "react-native"
import { Image } from 'expo-image'

export function CrossBlue(props: any) {
  return (

    <View
      style={{ width: 22, height: 22 }}
    >
      <Image
        source={require('@assets/icons/icons-png/crossBlue.png')}
        style={{ width: '100%', height: '100%' }}
        contentFit='contain'
      />
    </View>

  )
}

