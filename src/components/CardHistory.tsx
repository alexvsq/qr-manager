import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { router } from 'expo-router'
import { HistoryData } from '@/types/types'
import { returnSource } from '@/functions/functions'


const goToPage = (type: string) => {
    if (type === 'wifi') {
        router.push('/page-wifi')
    } else if (type === 'url') {
        router.push('/page-url')
    } else if (type === 'text') {

    }

}

export default function HistoryCardCodes({ itemInfo }: { itemInfo: HistoryData }) {
    const time = itemInfo.date?.split(',')[0]
    let title
    if (itemInfo.titleName) {
        title = itemInfo.titleName.length > 20 ? itemInfo.titleName.slice(0, 20) + '...' : itemInfo.titleName
    } else {
        title = itemInfo.value
    }
    const valueRecort = itemInfo.value && itemInfo.value.length > 30 ? itemInfo.value.slice(0, 28) + '...' : itemInfo.value

    return (
        <>
            <Pressable
                style={({ pressed }) => [[{ marginVertical: 6 }], [pressed && { backgroundColor: '#EFEFEF', borderRadius: 10 }]]}
                onPress={() => { router.push('/page-codeHistory/' + itemInfo.id) }}
            >
                <View className='flex flex-row justify-between items-center px-1 pt-2 pb-1 '>
                    <View className='flex flex-row  items-center flex-1'>
                        <Image
                            source={returnSource(itemInfo.type)}
                            contentFit='contain'
                            style={{ width: 25, height: 25, marginRight: 10 }}
                        />

                        <View className='pl-1 pr-4 flex-1'>
                            <View className='flex flex-row items-center'>
                                <Text className='text-black text-base font-semibold'>{title}</Text>
                                <View className='bg-blue py-[2px] px-[10px] rounded-full  ml-2'>
                                    <Text className='text-white text-[11px]'>{itemInfo.type}</Text>
                                </View>

                            </View>
                            <View className='flex flex-row justify-between  items-center mt-1 '>

                                <Text className=' text-text-dark text-[12px]'>{valueRecort}</Text>

                                <Text className='text-text-dark text-[12px]'>{time}</Text>
                            </View>
                        </View>
                    </View>

                    <Image
                        style={{ width: 20, height: 20 }}
                        contentFit='contain'
                        source={require('@assets/icons/arrow-blue.png')}
                    />

                </View>
            </Pressable>
            <View className='w-full h-[1px] bg-lines-light'></View>
        </>
    )
}