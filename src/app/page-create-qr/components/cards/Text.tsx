import { View, Text, Alert, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react';
import { router } from 'expo-router'
import { validateANDSaveCreateQR } from '@/functions/validates'
import { useContextData } from '@/contexts/context'

export default function TextComponent() {

    const { listCreates, setListCreates } = useContextData()
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

        const newRow = await validateANDSaveCreateQR(valueData.textValue)
        if (newRow) {
            setListCreates([...listCreates, newRow])
        }
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
                        onChange={e => handleChange('textValue', e.nativeEvent.text)}
                    />
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
