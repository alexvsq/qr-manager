import { View, Text, Alert, Pressable } from 'react-native'
import InputEntry from '../InputEntry'
import { useState } from 'react';
import { router } from 'expo-router'
import { validateANDSaveCreateQR } from '@/functions/validates'

export default function Web() {

    const [valueData, setValueData] = useState({
        web: '',
    })
    const handleChange = (name: string, value: string) => {
        setValueData({ ...valueData, [name]: value })
    }

    const btnCreateQr = async () => {
        if (valueData.web == '') {
            Alert.alert(
                'Error',
                'Fill all the fields',
                [{
                    text: 'Cancel',
                    style: 'cancel'
                }]
            )
            return
        }
        const dataWeb = `https://${valueData.web}`
        router.push('/page-generate-qr/' + encodeURIComponent(dataWeb))
        await validateANDSaveCreateQR(dataWeb)
    }

    return (
        <View>
            <InputEntry
                title='Web'
                placeholder='www.google.com'
                funcChange={value => handleChange('web', value)}
                maxLength={120}
                inputMode='url'
            />

            <View className='flex  w-full items-center justify-center my-2'>

                <Pressable
                    onPress={btnCreateQr}
                    className='bg-blue py-1 px-4 rounded-full my-1'
                >
                    <Text className='text-white'>Create QR code</Text>
                </Pressable>

            </View>
        </View>
    )
}
