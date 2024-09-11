import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { useContextData } from '@/contexts/context';

export default function CardScondary({ children, title }: { children: React.ReactNode, title: string }) {

    const { screen, elimanteOption, setEliminateOption } = useContextData()

    return (
        <View className="bg-white rounded-t-[20px] px-4 pt-4 flex-1">
            <View className='flex flex-row justify-between items-center mb-2'>
                <Text className='text-black text-base font-semibold'>{title}</Text>
                {
                    screen !== 'scanner' &&
                    <TouchableOpacity
                        onPress={() => setEliminateOption((prev: boolean) => !prev)}>
                        <Text className='text-[#af2525] font-semibold text-[12px]'>Eliminar</Text>
                    </TouchableOpacity>
                }
            </View>
            {children}
        </View>
    )
}