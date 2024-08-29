import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router';
import { useContextData } from '@/contexts/context'

export default function CardScondary({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const { screen } = useContextData()

    let title
    if (screen === 'scanner') {
        title = 'Scann a QR code'
    } else if (screen === 'create') {
        title = 'Codes Created'
    } else if (screen === 'history') {
        title = 'History '
    } else if (screen === 'settings') {
        title = 'Settings'
    }

    return (
        <View className="bg-white rounded-t-[20px] p-4 flex-1">
            <View className='flex flex-row justify-between items-center my-2'>
                <Text className='text-black text-base font-semibold'>{title}</Text>
                <Pressable onPress={() => router.navigate('/about')}>
                    <Text className='text-text-dark'>Eliminar</Text>
                </Pressable>
            </View>
            {children}
        </View>
    )
}