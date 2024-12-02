import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useLocalSearchParams } from 'expo-router';
import ModalPickColor from '@/components/modals/ModalPickColor'
import { returnType } from '@/functions/orderData'
import { Image } from 'expo-image';
import { returnSource } from '@/functions/functions'
import * as ImagePicker from 'expo-image-picker';
import { saveImageQr, shareQRImage } from '@/functions/saveQrImg'

export default function Index() {
    const { value } = useLocalSearchParams();
    const decode = decodeURIComponent(value as string);

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const [BackGroundColor, setBackGroundColor] = useState('#fff');
    const [colorLines, setColorLines] = useState('#000000');

    const qrRef = useRef();

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
    const saveImage = async () => {
        await saveImageQr(qrRef)
    };
    const shareImage = async () => {
        await shareQRImage(qrRef)
    };

    //console.log(qrRef.current)
    return (
        <ScrollView style={styles.container}>

            <View className='flex  items-center justify-center mt-5 mb-3 '>
                <View className=' bg-bg-2 aspect-square flex-row items-center justify-center rounded-full p-4 h-[80px]'>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={returnSource(type)}
                        contentFit='contain'
                    />
                </View>
                <Text className='text-white font-semibold text-[22px] my-1 capitalize'>{type}</Text>
            </View>

            <View className=' flex justify-center items-center '>
                <View style={styles.qrCodeContainer}>

                    <View className=' bg-bg-2 p-5 rounded-[15px]'>
                        <QRCode
                            value={decode}
                            size={250}
                            quietZone={20}
                            backgroundColor={BackGroundColor}
                            color={colorLines}
                            logo={image ? { uri: image } : undefined}
                            logoBackgroundColor='transparent'
                            getRef={(c) => { qrRef.current = c }}
                        />
                    </View>

                    <View className='flex flex-row w-full items-center justify-around'>
                        <View className=' flex gap-2 items-center justify-center'>
                            <TouchableOpacity
                                onPress={saveImage}
                                className=' bg-blue p-2 rounded-full aspect-square flex-row justify-center items-center'>
                                <Image
                                    source={require('@assets/icons/icons-png/download.png')}
                                    style={{ width: 30, height: 30 }}
                                    contentFit='contain'
                                />
                            </TouchableOpacity>
                            <Text className=' text-white text-center font-semibold'>Download</Text>
                        </View>
                        <View className=' flex gap-2 items-center justify-center'>
                            <TouchableOpacity
                                onPress={shareImage}
                                className=' bg-blue p-2 rounded-full aspect-square flex-row justify-center items-center'>
                                <Image
                                    source={require('@assets/icons/icons-png/share.png')}
                                    style={{ width: 30, height: 30 }}
                                    contentFit='contain'
                                />
                            </TouchableOpacity>
                            <Text className=' text-white text-center font-semibold'>Share</Text>
                        </View>
                    </View>



                    {/*    <TouchableOpacity
                        onPress={saveImage}
                        className='bg-blue w-full py-1 px-5 rounded-full'
                    >
                        <Text className='text-white text-center font-semibold text-[16px]'>Save QR Code as Image</Text>
                    </TouchableOpacity> */}

                </View>
            </View>
            <View className='flex gap-2 items-center justify-center my-4'>

                <TouchableOpacity
                    onPress={pickImage}
                    className='bg-bg-2 py-1 px-4 rounded-full my-1'
                >
                    <Text className='text-blue font-semibold'>Logo Picker</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowModal2(true)}
                    className='bg-bg-2 py-1 px-4 rounded-full my-1'
                >
                    <Text className='text-blue font-semibold'>Color Background</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowModal(true)}
                    className='bg-bg-2 py-1 px-4 rounded-full my-1'
                >
                    <Text className='text-blue font-semibold'>Color Lines</Text>
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
        backgroundColor: '#1b1b1b',
        paddingHorizontal: 20,
    },
    qrCodeContainer: {
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    }
});
