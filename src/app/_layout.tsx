import { Stack } from 'expo-router/stack';
import { View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContextProvider } from '@/contexts/context'
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { Image } from 'expo-image';

export default function Layout() {
    const os = Platform.OS;
    if (os === "android") NavigationBar.setBackgroundColorAsync("transparent"); // 
    const insets = useSafeAreaInsets();

    return (
        <>
            <StatusBar style='auto' />
            <ContextProvider >
                <View style={{ flex: 1, paddingBottom: insets.bottom }}>

                    <Stack
                        screenOptions={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#1b1b1b',
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerTitle: () => {
                                return (
                                    <View
                                    // className=' bg-bg-icon'
                                    >
                                        <Image
                                            source={require('@assets/icons/logos/logo1.png')}
                                            contentFit='contain'
                                            style={{ width: 120, height: 35 }}
                                        />
                                    </View>
                                )
                            }
                        }}
                    />

                </View>
            </ContextProvider>
        </>
    )
}
