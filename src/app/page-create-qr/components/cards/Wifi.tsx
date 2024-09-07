import { TextInput, View, Text, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router'
import InputEntry from '../InputEntry'
import { validateANDSaveCreateQR } from '@/functions/validates'

export default function wifi() {

    const [valueWifi, setValueWifi] = useState({
        name: '',
        password: '',
        security: ''
    })
    const handleChange = (name: string, value: string) => {
        setValueWifi({ ...valueWifi, [name]: value })
    }

    const btnCreateQr = async () => {
        if (valueWifi.name == '' || valueWifi.password == '' || valueWifi.security == '') {
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
        const wifiData = `WIFI:S:${valueWifi.name};T:${valueWifi.security};P:${valueWifi.password};H:false;;`
        router.push('/page-generate-qr/' + encodeURIComponent(wifiData))
        await validateANDSaveCreateQR(wifiData)
    }

    return (
        <View>

            <InputEntry
                title='Red'
                placeholder='Name of the network'
                funcChange={value => handleChange('name', value)}
            />
            <InputEntry
                title='Password'
                placeholder='********'
                funcChange={value => handleChange('password', value)}
            />
            <InputEntry
                title='Security'
                placeholder='WPA/WPA2'
                funcChange={value => handleChange('security', value)}
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
