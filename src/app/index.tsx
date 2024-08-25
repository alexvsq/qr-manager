import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from '@/screens/Home'

export default function App() {
    return (
        <>
            <StatusBar style='dark' backgroundColor='#000000' />
            <View className='flex-1 bg-bg-1 '>
                <Home />
            </View>
        </>
    );
}
