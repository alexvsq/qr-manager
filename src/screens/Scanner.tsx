
import Camara from '@/components/Camara';
import { View } from 'react-native';
import { IconCard } from '@/components/cards';
import React, { useState } from 'react'
import { useContextData } from '@/contexts/context'

export function PrincipalScanner() {
    const { torch, setTorch } = useContextData()
    const toggleTorch = () => {
        setTorch(!torch)
    }

    return (
        <View className='flex flex-row justify-around px-2 my-3'>
            <IconCard
                source={require('@assets/icons/icons-png/flash.png')}
                title='Flash'
                func={toggleTorch}
                active={torch}
            />
            <IconCard
                source={require('@assets/icons/icons-png/image.png')}
                title='Image'
            />
        </View>
    )
}
export function SecondaryScanner() {

    return (
        <>

            <Camara />
        </>
    )
}

