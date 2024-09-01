import { View, Text, StyleSheet, Pressable, Platform } from 'react-native'
import React from 'react'
import { IconCreate, IconHistory, IconScanner, IconSettings } from '@assets/icons/icons-navbar/icons'
import { useContextData } from '@/contexts/context'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function footeNavbar() {

    const { screen, setScreen } = useContextData();

    const screens = [
        {
            module: IconScanner,
            name: 'scanner'
        },
        {
            module: IconHistory,
            name: 'history'
        },
        {
            module: IconCreate,
            name: 'create'
        },
        {
            module: IconSettings,
            name: 'settings'
        }
    ]

    const insets = useSafeAreaInsets(); //

    const isAndroid = Platform.OS === 'android';

    return (

        <View
            style={[
                { marginBottom: insets.bottom },
                isAndroid && { paddingBottom: 5 }
            ]}
            className='absolute bottom-0 w-full flex items-center'
        >
            <View className='bg-bg-2 py-[7px] px-2  rounded-full'>
                <View style={styles.containerButtons}>
                    {
                        screens.map((item, index) => {

                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        setScreen(item.name)
                                    }}
                                    className={`${item.name == screen ? 'bg-blue rounded-full' : ''} p-[7px] `}
                                >
                                    <item.module
                                        active={item.name == screen ? true : false}
                                    />
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
        gap: 30
    },
})