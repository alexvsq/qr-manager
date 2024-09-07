import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useLocalSearchParams } from 'expo-router';
import ModalPickColor from '@/components/modals/ModalPickColor'
import { returnType } from '@/functions/orderData'
import { Image } from 'expo-image';
import { returnSource } from '@/functions/functions'
import * as ImagePicker from 'expo-image-picker';

export default function Index() {
    const { value } = useLocalSearchParams();
    const decode = decodeURIComponent(value as string);

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const [BackGroundColor, setBackGroundColor] = useState('#fff');
    const [colorLines, setColorLines] = useState('#000000');

    const qrRef = React.useRef();

    const onSelectColorBg = ({ hex }: { hex: string }) => {
        setBackGroundColor(hex);
    };
    const onSelectColorLines = ({ hex }: { hex: string }) => {
        setColorLines(hex);
    };
    const type = returnType(decode)

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    //console.log(qrRef.current)
    return (
        <ScrollView style={styles.container}>

            <View className='flex flex-row  items-center gap-4 justify-center my-2 '>
                <Text className='text-white font-semibold text-[30px] capitalize'>{type}</Text>
                <View className=' bg-bg-2 aspect-square flex-row items-center justify-center rounded-full p-2  h-[45px]'>
                    <Image
                        source={returnSource(type)}
                        contentFit='contain'
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>

            <View style={styles.qrCodeContainer}>

                <View className=' bg-bg-2 p-6 rounded-[15px] my-2'>
                    <QRCode
                        value={decode}
                        size={220}
                        quietZone={20}
                        backgroundColor={BackGroundColor}
                        color={colorLines}
                        logo={image ? { uri: image } : undefined}
                        getRef={(c) => { qrRef.current = c }}
                    />
                </View>

            </View>
            <View className='flex-row gap-2 justify-center my-2'>

                <TouchableOpacity
                    onPress={pickImage}
                    className='bg-blue py-1 px-4 rounded-full my-1'
                >
                    <Text className='text-white'>Logo Picker</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowModal2(true)}
                    className='bg-blue py-1 px-4 rounded-full my-1'
                >
                    <Text className='text-white'>Color Background</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowModal(true)}
                    className='bg-blue py-1 px-4 rounded-full my-1'
                >
                    <Text className='text-white'>Color Code</Text>
                </TouchableOpacity>

            </View>
            <ModalPickColor
                showModal={showModal || showModal2}
                setShowModal={showModal2 ? setShowModal2 : setShowModal}
                defaultColor={showModal ? colorLines : BackGroundColor}
                onSelectColor={showModal2 ? onSelectColorBg : onSelectColorLines}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1b1b1b',
    },
    qrCodeContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
