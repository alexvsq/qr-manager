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
import { CrossBlue } from '@assets/icons/icons-svg'
import { useCallback, } from 'react';
import { useContextData } from '@/contexts/context'

type Props = {
    children: React.ReactNode,
    title: string,
}

export default function CardPrincipal({ children, title }: Props) {

    const { numsCardsPrimaryRows, setNumsCardsPrimaryRows, screen } = useContextData()
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

    const pressCross = () => {
        if (numsCardsPrimaryRows >= 8) {
            setNumsCardsPrimaryRows(0)
        } else {
            setNumsCardsPrimaryRows((prev: number) => prev + 4)
        }

    }

    return (
        <Animated.View className='bg-bg-2 w-full rounded-[20px] px-3 py-1 mb-5 overflow-hidden border-lines-dark border-[1px]'>
            <View className='py-2 px-2 flex flex-row items-center justify-between'>

                <Text className='text-white text-base font-semibold'>{title}</Text>

                <TouchableOpacity onPress={pressCross}>
                    <CrossBlue />
                </TouchableOpacity>

            </View>
            {
                numsCardsPrimaryRows > 0 || screen == 'scanner'
                    ? <View className='w-full h-[1px] bg-lines-dark mb-3'></View>
                    : null
            }
            <Animated.View style={heightAnimationStyle} >
                <Animated.View
                    className='absolute top-0 w-full '
                    ref={listRef}
                    onLayout={handleLayout}
                >
                    {children}
                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}
