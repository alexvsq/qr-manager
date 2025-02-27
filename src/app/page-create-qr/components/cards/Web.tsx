import { View, Text, Alert, TouchableOpacity } from 'react-native'
import InputEntry from '../InputEntry'
import { useState } from 'react';
import { router } from 'expo-router'
import { validateANDSaveCreateQR } from '@/functions/validates'
import { useContextData } from '@/contexts/context'

export default function Web() {

    const { listCreates, setListCreates } = useContextData()
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
        const newRow = await validateANDSaveCreateQR(dataWeb)
        if (newRow) {
            setListCreates([...listCreates, newRow])
        }
    }

    return (
        <View>
            <InputEntry
                title='Web'
                placeholder='www.google.com'
                funcChange={value => handleChange('web', value)}
                maxLength={150}
                inputMode='url'
            />

            <View className='flex  w-full items-center justify-center my-2'>

                <TouchableOpacity
                    onPress={btnCreateQr}
                    className='bg-blue py-1 px-4 rounded-full my-1'
                >
                    <Text className='text-white'>Create QR code</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
