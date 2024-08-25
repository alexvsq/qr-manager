import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { IconCreate, IconHistory, IconScanner, IconSettings } from '@assets/icons/icons-navbar/icons'

export default function footeNavbar() {
    return (
        <View className='absolute bottom-0 w-full h-[70px]  flex justify-center items-center'>
            <View className='bg-bg-2 py-3 px-7  rounded-full'>
                <View style={styles.containerButtons}>
                    <IconScanner />
                    <IconCreate />
                    <IconHistory />
                    <IconSettings />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30
    },
})