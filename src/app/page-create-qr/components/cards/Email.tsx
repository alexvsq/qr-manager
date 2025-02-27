import { View, Text, Alert, TouchableOpacity } from 'react-native'
import InputEntry from '../InputEntry'
import { useState } from 'react';
import { router } from 'expo-router'
import { validateANDSaveCreateQR } from '@/functions/validates'
import { useContextData } from '@/contexts/context'

export default function Email() {

    const { listCreates, setListCreates } = useContextData()
    const [valueData, setValueData] = useState({
        email: '',
        subject: '',
        message: ''
    })
    const handleChange = (name: string, value: string) => {
        setValueData({ ...valueData, [name]: value })
    }

    const btnCreateQr = async () => {
        if (valueData.email == '' || valueData.message == '') {
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
        //"MATMSG:TO:alejandro@gmail.com;SUB:Hola;BODY:Esto es una prueba;"
        const dataEmail = `MATMSG:TO:${valueData.email};SUB:${valueData.subject};BODY:${valueData.message};`
        router.push('/page-generate-qr/' + encodeURIComponent(dataEmail))
        const newRow = await validateANDSaveCreateQR(dataEmail)
        if (newRow) {
            setListCreates([...listCreates, newRow])
        }
    }

    return (
        <View>
            <InputEntry
                title='Address Email'
                placeholder='example@gmail.com'
                funcChange={value => handleChange('email', value)}
                inputMode='email'
            />
            <InputEntry
                title='Subject'
                placeholder='example subject'
                funcChange={value => handleChange('subject', value)}
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
