import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { DimensionValue } from 'react-native'

type PropsIconCard = {
    source: string,
    title: string,
    func?: () => void,
    func2?: () => void,
    active?: boolean,
    width?: DimensionValue | undefined
}

export function IconCard({ source, title, func, func2, active, width }: PropsIconCard) {
    return (
        <View className=' flex  justify-center items-center' style={{ marginBottom: 14, width: width }}>
            <Pressable
                onPress={func}
                onLongPress={func2}
                style={({ pressed }) => [
                    styles.iconPressable, active && { backgroundColor: '#3F3F3F' }, pressed && { backgroundColor: '#3F3F3F' }
                ]}
            >

                <Image
                    source={source}
                    contentFit='contain'
                    className='w-full h-full'
                />
            </Pressable>

            <Text className='text-[#fafafa] text-sm font-semibold text-[13px] capitalize'>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    iconPressable: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: '#3F3F3F',
        borderRadius: 100,
        padding: 10,
        marginBottom: 3
    }
})