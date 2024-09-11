import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import { router } from 'expo-router'
import { HistoryData } from '@/types/types'
import { returnSource, shortenText } from '@/functions/functions'
import { useContextData } from '@/contexts/context'

type PropsIconCard = {
    itemInfo: HistoryData;
    pressFunc?: () => void,
    eliminateFunction?: () => void,
}

export default function HistoryCardCodes({ itemInfo, pressFunc, eliminateFunction }: PropsIconCard) {

    const { elimanteOption } = useContextData()

    const time = itemInfo.date?.split(',')[0]
    let title = shortenText(itemInfo.titleName ? itemInfo.titleName : itemInfo.value, 20)
    const valueRecort = shortenText(itemInfo.value)

    return (
        <>
            <Pressable
                style={({ pressed }) => [[{ marginVertical: 6 }], [pressed && { backgroundColor: '#EFEFEF', borderRadius: 10 }]]}
                onPress={pressFunc}
            >
                <View className='flex flex-row justify-between items-center px-1 pt-2 pb-1 '>
                    <View className='flex flex-row  items-center flex-1'>
                        <Image
                            source={returnSource(itemInfo.type)}
                            contentFit='contain'
                            style={{ width: 25, height: 25, marginRight: 10 }}
                        />

                        <View className='pl-1 pr-2 flex-1 '>
                            <View className='flex flex-row items-center'>
                                <Text className='text-black text-base font-semibold'>{title}</Text>
                                <View className='bg-blue pt-[1px] pb-[2px] px-[10px] rounded-full  ml-2'>
                                    <Text className='text-white text-[11px]'>{itemInfo.type}</Text>
                                </View>

                            </View>
                            <View className='flex flex-row justify-between  items-center mt-1 '>

                                <Text className=' text-text-dark text-[12px]'>{valueRecort}</Text>

                                <Text className='text-text-dark text-[12px]'>{time}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        elimanteOption
                            ? <TouchableOpacity onPress={eliminateFunction}>
                                <Image
                                    style={{ width: 22, height: 22, }}
                                    contentFit='contain'
                                    source={require('@assets/icons/cross-delete.png')}
                                />
                            </TouchableOpacity>
                            : <Image
                                style={{ width: 22, height: 22 }}
                                contentFit='contain'
                                source={require('@assets/icons/arrow-blue.png')}
                            />
                    }

                </View>
            </Pressable>
            <View className='w-full h-[1px] bg-lines-light'></View>
        </>
    )
}