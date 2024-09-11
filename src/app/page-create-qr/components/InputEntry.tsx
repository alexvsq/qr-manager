import { TextInput, View, Text, InputModeOptions } from 'react-native';

type InputEntryProps = {
    title: string,
    placeholder: string,
    inputMode?: InputModeOptions
    funcChange: (value: string) => void
    maxLength?: number
}

export default function InputEntry({ title, placeholder, funcChange, inputMode = 'text', maxLength = 30 }: InputEntryProps) {
    return (

        <View className='my-1'>
            <Text className='text-text-dark px-2 font-semibold mb-2'>{title}</Text>
            <View className='bg-bg-2 rounded-[10px]'>
                <TextInput
                    inputMode={inputMode}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    placeholderTextColor={'#9B9B9B'}
                    style={{ width: '100%', color: '#fff', fontSize: 15, paddingVertical: 8, paddingHorizontal: 12 }}
                    onChangeText={funcChange}
                    autoCapitalize='none'
                />
            </View>
        </View>
    )
}