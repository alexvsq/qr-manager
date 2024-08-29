import { View, Text, Pressable } from 'react-native'
import Animated, {
    useAnimatedStyle,
    measure,
    useSharedValue,
    useAnimatedRef,
    withSpring,
    withTiming,
    runOnUI
} from 'react-native-reanimated';
import { CrossBlue } from '@assets/icons/icons-svg'
import { useCallback, } from 'react';

type Props = {
    children: React.ReactNode,
    title: string,
}

export default function CardPrincipal({ children, title }: Props) {

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
                heightValue.value = withSpring(measuredHeight, {},
                    (x) => {

                    })
            }
        })();
    }, [listRef]);

    return (
        <Animated.View className='bg-bg-2 w-full rounded-[20px] px-3 py-2 mb-5 overflow-hidden '>
            <View className='my-2 px-2 flex flex-row items-center justify-between'>
                <Text className='text-white text-base font-semibold'>{title}</Text>
                <Pressable
                    className='bg-bg-icon p-1 rounded-full'>
                    <CrossBlue />
                </Pressable>
            </View>
            <View className='w-full h-[1px] bg-lines-dark'></View>
            <Animated.View style={heightAnimationStyle} >
                <Animated.View
                    className='absolute top-0 w-full'
                    ref={listRef}
                    onLayout={handleLayout}
                >
                    {children}
                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}
