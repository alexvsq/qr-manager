import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { useContextData } from '@/contexts/context';
import { Image } from 'expo-image';

export default function CardScondary({ children, title }: { children: React.ReactNode, title: string }) {

    const { screen, elimanteOption, setEliminateOption } = useContextData()

    const scann = require('@assets/icons/icons-png/scanner.png')
    const history = require('@assets/icons/icons-png/history.png')
    const create = require('@assets/icons/icons-png/create.png')

    return (
        <View className="bg-white rounded-t-[20px] px-4 pt-4 flex-1">
            <View className='flex flex-row justify-between items-center mb-2'>
                <View className=' flex flex-row items-center justify-center'>
                    <View className=' p-1 bg-bg-2 rounded-full aspect-square flex items-center justify-center mr-[6px]'>
                        <Image
                            source={screen == 'scanner' ? scann : screen == 'history' ? history : create}
                            contentFit='contain'
                            style={{ width: 18, height: 18 }}
                        />
                    </View>
                    <Text className='text-black text-base font-semibold'>{title}</Text>
                </View>
                {
                    screen !== 'scanner' &&
                    <TouchableOpacity
                        onPress={() => setEliminateOption((prev: boolean) => !prev)}
                        className='flex flex-row items-center justify-center'
                    >
                        <Text className='text-text-dark font-semibold text-[12px] mr-2'>{elimanteOption ? 'Cancelar' : 'Eliminar'}</Text>
                        <View className='rounded-full bg-[#af2525] p-1 w-6 aspect-square flex items-center justify-center'>
                            <Image
                                source={require('@assets/icons/icons-png/delete.png')}
                                contentFit='contain'
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>

                    </TouchableOpacity>
                }
            </View>
            {children}
        </View>
    )
}