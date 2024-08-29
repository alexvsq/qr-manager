import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContextData } from '@/contexts/context'

export default function BackGround({ children }: { children: React.ReactNode }) {

    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    const { screen } = useContextData()

    useEffect(() => {
        requestPermission()
    }, [])


    return (
        <View className='bg-bg-1 flex-1'>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({

    camera: {
        flex: 1,
    },

});