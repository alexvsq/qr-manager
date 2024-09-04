import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'

export default function CardScondary({ children, title }: { children: React.ReactNode, title: string }) {

    return (
        <View className="bg-white rounded-t-[20px] p-4 flex-1">
            <View className='flex flex-row justify-between items-center my-2'>
                <Text className='text-black text-base font-semibold'>{title}</Text>
                <Pressable onPress={() => router.push('/page-generate-qr/' + 'www.youtube.com')}>
                    <Text className='text-text-dark'>Eliminar</Text>
                </Pressable>
            </View>
            {children}
        </View>
    )
}