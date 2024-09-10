import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'

export default function CardScondary({ children, title }: { children: React.ReactNode, title: string }) {

    return (
        <View className="bg-white rounded-t-[20px] px-4 pt-4 flex-1">
            <View className='flex flex-row justify-between items-center mb-2'>
                <Text className='text-black text-base font-semibold'>{title}</Text>
                <Pressable className=''>
                    <Text className='text-[#af2525] font-semibold text-[12px]'>Eliminar</Text>
                </Pressable>
            </View>
            {children}
        </View>
    )
}