import { View, Text, Pressable, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router'
import InputEntry from '../InputEntry'
import { validateANDSaveCreateQR } from '@/functions/validates'
import { useContextData } from '@/contexts/context'

export default function wifi() {

    const { listCreates, setListCreates } = useContextData()
    const [valueWifi, setValueWifi] = useState({
        name: '',
        password: '',
        security: 'WPA'
    })
    const handleChange = (name: string, value: string) => {
        setValueWifi({ ...valueWifi, [name]: value })
    }

    const btnCreateQr = async () => {
        if (valueWifi.name == '') {
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
        const newRow = await validateANDSaveCreateQR(wifiData)
        if (newRow) {
            setListCreates([...listCreates, newRow])
        }
    }

    return (
        <View>

            <InputEntry
                title='Red'
                placeholder='Name of the network'
                funcChange={value => handleChange('name', value)}
            />

            {
                valueWifi.security !== '' &&
                <InputEntry
                    title='Password'
                    placeholder='********'
                    funcChange={value => handleChange('password', value)}
                />
            }
            <View className='my-1'>
                <Text className='text-text-dark px-2 font-semibold mb-2'>Security</Text>
                <View className='flex  flex-row items-center justify-around bg-bg-2 rounded-[10px]'>
                    <TouchableOpacity
                        onPress={() => handleChange('security', 'WPA')}
                        className=' py-2'>
                        <Text className={`text-blue px-1  ${valueWifi.security == 'WPA' ? 'text-blue' : 'text-[#9B9B9B]'}`}>WPA/WPA2</Text>
                    </TouchableOpacity>
                    <View className='h-full w-[1px] bg-lines-dark'></View>
                    <TouchableOpacity
                        onPress={() => handleChange('security', 'WEP')}
                        className=' py-2'>
                        <Text className={`text-blue px-1  ${valueWifi.security == 'WEP' ? 'text-blue' : 'text-[#9B9B9B]'}`}>WEP</Text>
                    </TouchableOpacity>
                    <View className='h-full w-[1px] bg-lines-dark'></View>
                    <TouchableOpacity
                        onPress={() => handleChange('security', '')}
                        className=' py-2'>
                        <Text className={`text-blue px-1  ${valueWifi.security == '' ? 'text-blue' : 'text-[#9B9B9B]'}`}>NONE</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
