import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native'
import { screens } from '@/utils/icons'
import { useContextData } from '@/contexts/context'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const AnimatedView = Animated.View;
const sizeCircle = 50;

export default function FooterNavbar() {
    const { screen, setScreen } = useContextData();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const tabWidth = width / screens.length;

    const springConfig = {
        damping: 5,            // Disminuye el rebote (valores más altos reducen el rebote)
        stiffness: 80,          // Aumenta la rigidez del resorte (valores más altos hacen que la animación sea más rápida)
        mass: 0.2,                 // Ajusta la masa del objeto (valores más bajos aceleran la animación)
    };

    const circlePosition = useSharedValue((0 * tabWidth + (tabWidth / 2)) - sizeCircle / 2)

    const animatedCircleStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: circlePosition.value },
            ],
        };
    });

    return (
        <View className=' bg-white'>
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <View style={[styles.containerButtons]}>
                    <AnimatedView style={[styles.circle, animatedCircleStyle]} />
                    {screens.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                setScreen(item);
                                circlePosition.value = withSpring(((index * tabWidth + (tabWidth / 2)) - sizeCircle / 2), springConfig);
                            }}
                            style={[styles.containerButton, { width: tabWidth }]}
                        >
                            <item.module active={item.name === screen.name} />
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#1b1b1b',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    containerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        zIndex: 2
    },
    circle: {
        width: sizeCircle,
        height: sizeCircle,
        borderRadius: 40,
        backgroundColor: '#3A86FF',
        position: 'absolute',
        zIndex: 1,
    },
});