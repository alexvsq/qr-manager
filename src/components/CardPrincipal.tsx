import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import Animated, {
    useAnimatedStyle,
    measure,
    useSharedValue,
    useAnimatedRef,
    withSpring,
    withTiming,
    runOnUI
} from 'react-native-reanimated';
import { useCallback, } from 'react';
import { useContextData } from '@/contexts/context'
import { Image } from 'expo-image';

type Props = {
    children: React.ReactNode,
    title: string,
}

export default function CardPrincipal({ children, title }: Props) {

    const { showCards, setShowCards, screen } = useContextData()
    const listRef = useAnimatedRef<Animated.View>()
    const heightValue = useSharedValue(0)

    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value
    }))



    const handleLayout = useCallback(() => {
        runOnUI(() => {
            'worklet';
            const measuredHeight = measure(listRef)?.height;
            if (measuredHeight !== undefined) {
                heightValue.value = withTiming(measuredHeight, {},
                    (x) => {

                    })
            }
        })();
    }, [listRef]);

    const pressCross = () => {
        setShowCards((prev: boolean) => !prev)
    }

    return (//border-lines-dark border-[1px]
        <Animated.View className='bg-bg-2 w-full rounded-[20px] px-3 py-1 mb-4 overflow-hidden '>
            <TouchableOpacity
                onPress={pressCross}
                className='py-2 px-2 flex flex-row items-center justify-between'>

                <Text className='text-white text-lg font-semibold'>{title}</Text>
                {
                    screen !== 'scanner'
                    && <View style={[{ width: 22, height: 22 }, showCards ? { transform: [{ rotate: '180deg' }] } : {}]}>
                        <Image
                            source={require('@assets/icons/icons-png/drop-arrow.png')}
                            style={{ width: '100%', height: '100%' }}
                            contentFit='contain'
                        />
                    </View>
                }
            </TouchableOpacity>

            <Animated.View style={heightAnimationStyle} >
                <Animated.View
                    className='absolute top-0 w-full mt-1'
                    ref={listRef}
                    onLayout={handleLayout}
                >
                    {children}
                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}
