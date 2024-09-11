import { View, Text, Alert, Pressable, TextInput } from 'react-native'
import InputEntry from '../InputEntry'
import { useState } from 'react';
import { router } from 'expo-router'
import { validateANDSaveCreateQR } from '@/functions/validates'

export default function TextComponent() {

    const [valueData, setValueData] = useState({
        textValue: '',
    })
    const handleChange = (name: string, value: string) => {
        setValueData({ ...valueData, [name]: value })
    }

    const btnCreateQr = async () => {
        if (valueData.textValue == '') {
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
        router.push('/page-generate-qr/' + valueData.textValue)

        await validateANDSaveCreateQR(valueData.textValue)
    }

    return (
        <View>
            {/* <InputEntry
                title='Text'
                placeholder='example text'
                funcChange={value => handleChange('textValue', value)}
            /> */}
            <View >
                <Text className='text-text-dark px-2 font-semibold mb-2'>Text</Text>
                <View className='bg-bg-2 w-full h-20 my-1 rounded-[15px]'>
                    <TextInput
                        placeholder='example text'
                        placeholderTextColor={'#9B9B9B'}
                        style={{ width: '100%', padding: 12, color: '#fff' }}
                        maxLength={140}
                        onChange={value => handleChange('textValue', String(value))}
                    />
                </View>
            </View>
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
