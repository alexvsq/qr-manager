import { Stack } from 'expo-router/stack';
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
    return (
        <SafeAreaView className='flex-1'>
            <Stack
                screenOptions={{
                    headerShown: true,
                    animation: 'flip',

                }}
            />
        </SafeAreaView>
    )
}
