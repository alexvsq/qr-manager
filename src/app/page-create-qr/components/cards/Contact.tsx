import { View, Text, Alert, Pressable } from 'react-native'
import InputEntry from '../InputEntry'
import { useState } from 'react';
import { router } from 'expo-router'
import { validateANDSaveCreateQR } from '@/functions/validates'
import { useContextData } from '@/contexts/context'

export default function Web() {

    const { listCreates, setListCreates } = useContextData()
    const [valueData, setValueData] = useState({
        name: '',
        lastName: '',
        organization: '',
        phoneHome: '',
        phoneWork: '',
        work: '',
        email: '',
    })
    const handleChange = (name: string, value: string) => {
        setValueData({ ...valueData, [name]: value })
    }

    const btnCreateQr = async () => {
        if (valueData.name == '' || valueData.phoneHome == '') {
            Alert.alert(
                'Error',
                'Fill all the fields',
                [{
                    text: 'Cancel',
                    style: 'cancel'
                }]
            )
            return
        }/* "BEGIN:VCARD
VERSION:3.0
N:Vasq;Ale
FN:Ale Vasq
ORG:Taluda
TITLE:Limpiador De Baños
TEL;type=WORK:624165577
TEL;type=HOME:924165577
EMAIL:alejandro@gmail.com
END:VCARD
"   */
        const dataContact =
            `BEGIN:VCARD
VERSION:3.0
N:${valueData.lastName};${valueData.name}
FN:${valueData.name}
ORG:${valueData.organization}
TITLE:${valueData.work}
TEL;type=WORK:${valueData.phoneWork}
TEL;type=HOME:${valueData.phoneHome}
EMAIL:${valueData.email}
END:VCARD
`
        router.push('/page-generate-qr/' + encodeURIComponent(dataContact))
        const newRow = await validateANDSaveCreateQR(dataContact)
        if (newRow) {
            setListCreates([...listCreates, newRow])
        }
    }

    return (
        <View>
            <InputEntry
                title='Name'
                placeholder='Name'
                funcChange={value => handleChange('name', value)}
            />
            <InputEntry
                title='LastName'
                placeholder='LastName'
                funcChange={value => handleChange('LastName', value)}
            />
            <InputEntry
                title='Phone Home'
                placeholder='+1 23456789'
                funcChange={value => handleChange('phoneHome', value)}
                inputMode='tel'
            />
            <InputEntry
                title='Phone Work'
                placeholder='+1 23456789'
                funcChange={value => handleChange('phoneWork', value)}
                inputMode='tel'
            />
            <InputEntry
                title='Organization'
                placeholder='Work'
                funcChange={value => handleChange('organization', value)}
            />
            <InputEntry
                title='Work'
                placeholder='Position'
                funcChange={value => handleChange('work', value)}
            />
            <InputEntry
                title='Email'
                placeholder='exameple@gmail.com'
                funcChange={value => handleChange('email', value)}
                inputMode='email'
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
