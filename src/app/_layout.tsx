import { Stack } from 'expo-router/stack';
import { View, Platform } from 'react-native';
import { ContextProvider } from '@/contexts/context'
import * as NavigationBar from 'expo-navigation-bar';
import { Image } from 'expo-image';
import SettingsGo from '@/components/SettingsGo';

export default function Layout() {
    const os = Platform.OS;
    if (os === "android") NavigationBar.setBackgroundColorAsync("#1b1b1b"); // background color navigation bar

    return (
        <ContextProvider >
            <View style={{ flex: 1, backgroundColor: '#1b1b1b' }}>

                <Stack
                    screenOptions={{
                        statusBarStyle: 'light',
                    }}
                >
                    <Stack.Screen
                        name="index" // Nombre de la ruta (puede variar según tu configuración)
                        options={{
                            headerShown: true,
                            headerShadowVisible: false,
                            headerRight: () => {
                                return <SettingsGo />
                            },
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
                            //headerTintColor: '#fff',
                            headerTintColor: '#3A86FF',
                            headerTitleStyle: {
                                color: '#fff'
                            }
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
                            // headerTintColor: '#fff',
                            headerTintColor: '#3A86FF',
                            headerTitleStyle: {
                                color: '#fff'
                            }
                        }}
                    />

                    <Stack.Screen
                        name="page-create-qr/[type]" // Nombre de la ruta para la segunda pantalla
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#272727',
                            },
                            headerTitleAlign: 'center',
                            headerTitle: "Create Qr", // Título específico para esta pantalla
                            //headerTintColor: '#fff',
                            headerTintColor: '#3A86FF',
                            headerTitleStyle: {
                                color: '#fff'
                            }
                        }}
                    />
                    <Stack.Screen
                        name="page-settings" // Nombre de la ruta para la segunda pantalla
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#272727',
                            },
                            headerTitleAlign: 'center',
                            headerTitle: "Settings", // Título específico para esta pantalla
                            // headerTintColor: '#fff',
                            headerTintColor: '#3A86FF',
                            headerTitleStyle: {
                                color: '#fff'
                            }
                        }}
                    />
                </Stack>

            </View>
        </ContextProvider>
    )
}
