import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { IconCreate, IconHistory, IconScanner, IconSettings } from '@assets/icons/icons-navbar/icons'
import { useContextData } from '@/contexts/context'


export default function footeNavbar() {

    const { setScreen } = useContextData();

    const screens = [
        {
            module: IconScanner,
            name: 'scanner'
        },
        {
            module: IconCreate,
            name: 'create'
        },
        {
            module: IconHistory,
            name: 'history'
        },
        {
            module: IconSettings,
            name: 'settings'
        }
    ]



    return (
        <View className='absolute bottom-0 w-full h-[70px]  flex justify-center items-center'>
            <View className='bg-bg-2 py-3 px-7  rounded-full'>
                <View style={styles.containerButtons}>
                    {
                        screens.map((item, index) => {
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        setScreen(item.name)

                                    }}
                                >
                                    <item.module />
                                </Pressable>
                            )
                        })
                    }
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
        gap: 40
    },
})