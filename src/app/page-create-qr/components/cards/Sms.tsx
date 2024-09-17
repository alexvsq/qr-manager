import { View, Text, Alert, TouchableOpacity } from 'react-native'
import InputEntry from '../InputEntry'
import { useState } from 'react';
import { router } from 'expo-router'
import { validateANDSaveCreateQR } from '@/functions/validates'
import { useContextData } from '@/contexts/context'

export default function Sms() {

    const { listCreates, setListCreates } = useContextData()
    const [valueData, setValueData] = useState({
        number: '',
        message: ''
    })
    const handleChange = (name: string, value: string) => {
        setValueData({ ...valueData, [name]: value })
    }

    const btnCreateQr = async () => {
        if (valueData.number == '' || valueData.message == '') {
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
        //"SMSTO:924165577:Hola cómo estás "
        const dataSms = `SMSTO:${valueData.number}:${valueData.message}`
        router.push('/page-generate-qr/' + encodeURIComponent(dataSms))
        const newRow = await validateANDSaveCreateQR(dataSms)
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
            <InputEntry
                title='Message'
                placeholder='example message'
                funcChange={value => handleChange('message', value)}
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
