import Camara from '@/module/Camara';
import { View } from 'react-native';
import { IconCard } from '@/components/cards';
import { useContextData } from '@/contexts/context'
import { imgCardsCamera } from '@/utils/icons'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router'

export function PrincipalScanner() {
    const { torch, setTorch, facingCamera, setFacingCamera } = useContextData()

    const toggleTorch = () => {
        setTorch(!torch)
    }
    const toggleFacingCamera = () => {
        setFacingCamera(facingCamera == 'back' ? 'front' : 'back')
    }
    const funcImage = () => {
        router.push('/scanImage')
    }
    return (
        <Animated.View entering={FadeInDown}>
            <View className='flex flex-row justify-around '>
                {
                    imgCardsCamera.map((item, index) => {


                        return (
                            <IconCard
                                key={index}
                                source={item.source}
                                title={item.type}
                                func={item.type == 'flash' ? toggleTorch : item.type == 'switch' ? toggleFacingCamera : funcImage}
                                active={item.type == 'flash' && torch}
                            />
                        )

                    })
                }
            </View>
        </Animated.View>
    )
}
export function SecondaryScanner() {

    return (
        <>
            <Camara />
        </>
    )
}

