import { View, TouchableOpacity, Text, Linking, Platform } from 'react-native'

export default function BtnAction({ func, title }: { func: () => void, title: string }) {

    return (
        <View className='flex items-center justify-center my-2'>
            <TouchableOpacity
                onPress={func}
                className='bg-blue  py-1 px-5 rounded-full my-1'>
                <Text className='text-white font-semibold'>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}