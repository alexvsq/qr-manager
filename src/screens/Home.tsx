import { useState } from 'react';
import { View, Text, Pressable } from 'react-native'
import { useEffect } from 'react'
import { Image } from 'expo-image';
import CardPrincipal from '@/components/CardPrincipal';
import { runOnUI, withSpring, measure, useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import { useRouter } from 'expo-router';

export default function Home() {

    const router = useRouter()
    const [cardsNum, setCardsNum] = useState(1)
    const addNum = () => {
        setCardsNum(cardsNum + 1)
    }
    const quit = () => {
        setCardsNum(1)
    }


    return (
        <>
            <View className='px-3'>
                <CardPrincipal
                    title='Create'
                    func={addNum}
                    func2={quit}
                >
                    {
                        Array(cardsNum).fill(1).map((_, index) => {
                            return <RowCards key={index} />
                        })
                    }
                </CardPrincipal>
            </View>
            <View className='bg-white w-full h-full rounded-t-[20px] p-4'>
                <View className='flex flex-row justify-between items-center my-2'>
                    <Text className='text-black text-lg font-semibold'>Codigos Creados</Text>
                    <Pressable onPress={() => router.navigate('/about')}>
                        <Text className='text-text-dark'>Eliminar</Text>
                    </Pressable>
                </View>

                <View>

                    <CardCodes />
                    <CardCodes />
                    <CardCodes />
                    <CardCodes />


                </View>
            </View>
        </>
    )
}

function RowCards() {
    return (
        <View className='flex flex-row justify-between px-2 my-3'>

            <IconCard
                source={require('@assets/icons/icons-create/contact.png')}
                title='Contact'
            />
            <IconCard
                source={require('@assets/icons/icons-create/text.png')}
                title='Text'
            />
            <IconCard
                source={require('@assets/icons/icons-create/web.png')}
                title='Web'
            />
            <IconCard
                source={require('@assets/icons/icons-create/contact.png')}
                title='Contact'
            />

        </View>
    )
}

function IconCard({ source, title }: { source: string, title: string }) {
    return (
        <View className=' flex gap-2 justify-center items-center'>
            <View className='w-[60px] h-[60px] p-4 border-[1px] rounded-full border-lines-dark'>

                <Image
                    source={source}
                    contentFit='contain'
                    className='w-full h-full'
                />
            </View>

            <Text className='text-text-dark font-semibold'>{title}</Text>
        </View>
    )
}
function CardCodes() {
    return (
        <View className=' my-2'>
            <View className='flex flex-row justify-between items-center px-2'>
                <View>
                    <Text className='text-black text-xl font-semibold'>Hola</Text>
                    <Text className='text-text-dark'>Text</Text>
                </View>

                <Image
                    className='w-[20px] h-[20px]'
                    contentFit='contain'
                    source={require('@assets/icons/arrow-blue.png')}
                />

            </View>
            <View className='w-full h-[1px] bg-lines-light mt-2'></View>
        </View>
    )
}