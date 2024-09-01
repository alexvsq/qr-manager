
import Camara from '@/module/Camara';
import { View } from 'react-native';
import { IconCard } from '@/components/cards';
import React, { useState } from 'react'
import { useContextData } from '@/contexts/context'
import { getAllDataSql, deleteAllData } from '@/functions/sql-functions'

export function PrincipalScanner() {
    const { torch, setTorch } = useContextData()
    const toggleTorch = () => {
        setTorch(!torch)
    }
    async function getDataSql2() {
        const data = await getAllDataSql()
        console.log(data)
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
                func={getDataSql2}
                func2={deleteAllData}
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

