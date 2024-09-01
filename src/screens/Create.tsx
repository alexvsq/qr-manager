import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { RowCards, CardCodes } from '@/components/cards'


export function PrincipalCreate() {

    return (
        <Animated.View
            entering={FadeInDown}
        >
            <RowCards />
            <RowCards />
            <RowCards />
        </Animated.View>
    )
}
export function SecondaryCreate() {
    return (
        <Animated.View
            entering={FadeInUp}
        >
            <CardCodes />
            <CardCodes />
            <CardCodes />
            <CardCodes />
        </Animated.View>
    )
}

