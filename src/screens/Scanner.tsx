import Camara from '@/module/Camara';
import { View } from 'react-native';
import { IconCard } from '@/components/cards';
import { useContextData } from '@/contexts/context'
import { imgCardsCamera } from '@/utils/icons'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export function PrincipalScanner() {
    const { torch, setTorch } = useContextData()

    const toggleTorch = () => {
        setTorch(!torch)
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
                                func={item.type == 'flash' ? toggleTorch : undefined}
                            />
                        );
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

