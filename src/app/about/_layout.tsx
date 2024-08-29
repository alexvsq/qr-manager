import { Stack } from 'expo-router';
import { Text } from 'react-native'
export default function HomeLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        //backgroundColor: '#000000',

                    }
                }} />
        </>
    );
}
