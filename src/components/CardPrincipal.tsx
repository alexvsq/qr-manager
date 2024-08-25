import { View, Text, Pressable } from 'react-native'
import Animated, {
    useAnimatedStyle,
    measure,
    useSharedValue,
    useAnimatedRef,
    withSpring,
    runOnUI
} from 'react-native-reanimated';
import { CrossBlue } from '@assets/icons/icons-svg'
import { useEffect } from 'react';

type Props = {
    children: React.ReactNode,
    title: string,
}


export default function CardPrincipal({ children, title }: Props) {

    const listRef = useAnimatedRef()
    const heightValue = useSharedValue(0)
    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value
    }))

    useEffect(() => {
        runOnUI(() => {
            'worklet';
            heightValue.value = withSpring(measure(listRef)!.height)
        })();
    }, [])


    return (
        <Animated.View className='bg-bg-2 w-full  rounded-[20px] p-3 my-5 overflow-hidden'>
            <View className='my-2 flex flex-row items-center justify-between'>
                <Text className='text-white text-lg font-semibold'>{title}</Text>
                <Pressable
                    className='bg-bg-icon p-1 rounded-full'>
                    <CrossBlue />
                </Pressable>
            </View>
            <Animated.View style={heightAnimationStyle} >
                <Animated.View className='absolute top-0 w-full ' ref={listRef}>
                    {children}
                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}