import { View, StyleSheet, Pressable } from 'react-native'
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

    return (

        <View
            style={[
                { marginBottom: insets.bottom }]}
            className='w-full bg-white'
        >
            <View className='bg-bg-1 py-[7px] px-2  rounded-t-[20px]'>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
})