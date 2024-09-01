import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Image } from 'expo-image';


type PropsIconCard = {
    source: string,
    title: string,
    func?: () => void,
    func2?: () => void,
    active?: boolean
}

export function RowCards() {
    return (
        <View className='flex flex-row justify-between px-2 my-3'>

            <IconCard
                source={require('@assets/icons/icons-png/contact.png')}
                title='Contact'
            />
            <IconCard
                source={require('@assets/icons/icons-png/text.png')}
                title='Text'
            />
            <IconCard
                source={require('@assets/icons/icons-png/web.png')}
                title='Web'
            />
            <IconCard
                source={require('@assets/icons/icons-png/contact.png')}
                title='Contact'
            />

        </View>
    )
}
export function CardCodes() {
    return (
        <View className=' my-2'>
            <View className='flex flex-row justify-between items-center px-2'>
                <View>
                    <Text className='text-black text-base font-semibold'>Hola</Text>
                    <Text className='text-text-dark text-[12px]'>Text</Text>
                </View>

                <Image
                    className='w-[20px] h-[20px]'
                    contentFit='contain'
                    source={require('@assets/icons/arrow-blue.png')}
                />

            </View>
            <View className='w-full h-[1px] bg-lines-light mt-2'></View>
        </View>
    )
}

export function IconCard({ source, title, func, func2, active }: PropsIconCard) {
    return (
        <View className=' flex  justify-center items-center'>
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

            <Text className='text-[#fafafa] text-sm font-semibold text-[13px]'>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    iconPressable: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#3F3F3F',
        borderRadius: 100,
        padding: 12,
        marginBottom: 5
    }
})