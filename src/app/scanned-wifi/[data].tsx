import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface WifiData {
    name: string;
    password: string;
    security: string;
    hidden: string;
}

export default function ScannedWifiPage() {
    const params = useLocalSearchParams();
    let wifiData: WifiData | null = null;

    // Verificar si 'data' es una cadena y luego analizarla
    if (typeof params.data === 'string') {
        try {
            wifiData = JSON.parse(params.data) as WifiData;
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scanned WIFI</Text>
            {wifiData ? (
                <>
                    <Text>Name: <Text className='text-[16px]'>{wifiData.name}</Text></Text>
                    <Text>Password: <Text className='text-[16px]'>{wifiData.password}</Text></Text>
                    <Text>Security: {wifiData.security}</Text>
                    <Text>Hidden: {wifiData.hidden}</Text>
                </>
            ) : (
                <Text>No valid data found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});