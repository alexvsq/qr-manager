import { Stack } from 'expo-router/stack';
import { View, Text, Platform } from 'react-native';
import { ContextProvider } from '@/contexts/context'
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { Image } from 'expo-image';


export default function Layout() {
    const os = Platform.OS;
    if (os === "android") NavigationBar.setBackgroundColorAsync("transparent"); // 

    return (
        <>
            <StatusBar style='light' />
            <ContextProvider >
                <View style={{ flex: 1, backgroundColor: '' }}>

                    <Stack>
                        <Stack.Screen
                            name="index" // Nombre de la ruta (puede variar según tu configuración)
                            options={{
                                headerShown: true,
                                headerStyle: {
                                    backgroundColor: '#1b1b1b',
                                },
                                headerTitleAlign: 'center',
                                headerTitle: () => (
                                    <View>
                                        <Image
                                            source={require('@assets/icons/logos/logo1.png')}
                                            contentFit='contain'
                                            style={{ width: 120, height: 35 }}
                                        />
                                    </View>
                                ),
                                headerBackTitleVisible: false,
                                headerTintColor: '#3A86FF',
                            }}
                        />


                        <Stack.Screen
                            name="page-codeHistory/[id]" // Nombre de la ruta para la segunda pantalla
                            options={{
                                headerShown: true,
                                headerStyle: {
                                    backgroundColor: '#272727',
                                },
                                headerTitleAlign: 'center',
                                headerTitle: "Details", // Título específico para esta pantalla
                                headerBackTitleVisible: false,
                                headerTintColor: '#fff',
                                //headerTintColor: '#3A86FF',
                            }}
                        />

                        <Stack.Screen
                            name="page-generate-qr/[value]" // Nombre de la ruta para la segunda pantalla
                            options={{
                                headerShown: true,
                                headerStyle: {
                                    backgroundColor: '#272727',
                                },
                                headerTitleAlign: 'center',
                                headerTitle: "Qr", // Título específico para esta pantalla
                                headerBackTitleVisible: false,
                                headerTintColor: '#fff',
                                //headerTintColor: '#3A86FF',
                            }}
                        />
                    </Stack>

                </View>
            </ContextProvider>
        </>
    )
}
