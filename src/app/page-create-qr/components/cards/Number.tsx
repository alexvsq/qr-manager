import { View, Text, Alert, TouchableOpacity } from 'react-native'
import InputEntry from '../InputEntry'
import { useState } from 'react';
import { router } from 'expo-router'
import { validateANDSaveCreateQR } from '@/functions/validates'
import { useContextData } from '@/contexts/context'

export default function Number() {

    const { listCreates, setListCreates } = useContextData()
    const [valueData, setValueData] = useState({
        number: '',
    })
    const handleChange = (name: string, value: string) => {
        setValueData({ ...valueData, [name]: value })
    }

    const btnCreateQr = async () => {
        if (valueData.number == '') {
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
        //"TEL:9214165577"
        const dataNumber = `TEL:${valueData.number}`
        router.push('/page-generate-qr/' + encodeURIComponent(dataNumber))
        const newRow = await validateANDSaveCreateQR(dataNumber)
        if (newRow) {
            setListCreates([...listCreates, newRow])
        }
    }

    return (
        <View>
            <InputEntry
                title='Number'
                placeholder='+1 23456789'
                funcChange={value => handleChange('number', value)}
                inputMode='tel'
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
