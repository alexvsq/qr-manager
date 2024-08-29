import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { RowCards, CardCodes } from '@/components/cards'

export function PrincipalHistory() {
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
export function SecondaryHistory() {
    return (
        <Animated.View
            entering={FadeInUp}
        >
            <CardCodes />
            <CardCodes />
        </Animated.View>
    )
}

