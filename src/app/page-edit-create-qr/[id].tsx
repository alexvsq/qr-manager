import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { getOneRow, deleteOneRow } from '@/functions/sql/history-qr'
import { useEffect, useState } from 'react'
import { HistoryData } from '@/types/types'
import { Image } from 'expo-image';
import { returnSource } from '@/functions/functions'

export default function EditCreatedQr() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView>
            <View className='flex items-center mt-1 mb-4'>
                <Text className=' text-white'>Editar</Text>
                <Text className=' text-white'>{id}</Text>
                <Text className=' text-white'>HOLAAAAAAA</Text>
            </View>
        </ScrollView>
    )
}