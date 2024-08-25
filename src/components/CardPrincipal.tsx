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
import { useEffect, useCallback } from 'react';

type Props = {
    children: React.ReactNode,
    title: string,
    func?: () => void,
    func2?: () => void,
}

export default function CardPrincipal({ children, title, func, func2 }: Props) {

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
                heightValue.value = withSpring(measuredHeight)
            }
        })();
    }, [listRef]);

    return (
        <Animated.View className='bg-bg-2 w-full rounded-[20px] p-3 my-5 overflow-hidden'>
            <View className='my-2 flex flex-row items-center justify-between'>
                <Text className='text-white text-lg font-semibold'>{title}</Text>
                <Pressable
                    onPress={func}
                    onLongPress={func2}
                    className='bg-bg-icon p-1 rounded-full'>
                    <CrossBlue />
                </Pressable>
            </View>
            <View className='w-full h-[1px] bg-lines-dark'></View>
            <Animated.View style={heightAnimationStyle} >
                <Animated.View
                    className='absolute top-0 w-full'
                    ref={listRef}
                    onLayout={handleLayout}  // Captura el evento de layout
                >
                    {children}
                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}
