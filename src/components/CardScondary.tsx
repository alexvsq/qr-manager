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
                        onPress={() => setEliminateOption((prev: boolean) => !prev)}
                        className='rounded-full bg-[#af2525] py-1 px-3 flex items-center justify-center'
                    >
                        <Text className='text-white font-semibold text-[12px]'>{elimanteOption ? 'Cancelar' : 'Eliminar'}</Text>
                    </TouchableOpacity>
                }
            </View>
            {children}
        </View>
    )
}