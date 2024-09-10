import { View, Text, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image';
import { returnSource } from '@/functions/functions'
import ComponentCreate from '@/app/page-create-qr/components/ComponentCreate';

export default function Type() {

    const { type } = useLocalSearchParams();

    return (
        <ScrollView className=' flex-1 bg-bg-1  px-3'>
            <View className='flex items-center mt-4'>

                <View className=' bg-bg-2 aspect-square flex-row items-center justify-center rounded-full p-4 mb-2 h-[90px]'>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={returnSource(String(type))}
                        contentFit='contain'
                    />
                </View>

                <View className=' bg-blue ' style={{ paddingHorizontal: 16, paddingBottom: 2, borderRadius: 40, marginVertical: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>{type}</Text>
                </View>

            </View>

            <ComponentCreate
                type={String(type)}
            />
            <View >
                <Text className='text-white text-lg px-1'>Notes</Text>
                <View className='bg-bg-2 w-full h-20 my-2 rounded-[15px]'>
                    <TextInput
                        placeholder='Write your notes here'
                        placeholderTextColor={'#9B9B9B'}
                        style={{ width: '100%', padding: 12, color: '#fff' }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}