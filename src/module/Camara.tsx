import { StyleSheet, Modal, View, ImageBackground, ScrollView, Text } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useEffect, useState } from 'react';
import { useContextData } from '@/contexts/context'
import ModalScanned from '@/components/modals/ModalScanned'
import { validateANDSave } from '@/functions/validates'
import { router } from 'expo-router'
import { HistoryData } from '@/types/types'
import Slider from '@react-native-community/slider';

export default function Camara() {
    const { torch, facingCamera } = useContextData()
    const [permission, requestPermission] = useCameraPermissions();
    const [modalVisible, setModalVisible] = useState(false);
    const [dataQr, setDataQr] = useState<BarcodeScanningResult>();
    const [newRowSaved, setnewRowSaved] = useState<HistoryData | null>()
    const [zoom, setZoom] = useState(0)
    const { listHistory, setListHistory } = useContextData()

    useEffect(() => {
        requestPermission()
    }, [])

    const hideModal = () => setModalVisible(prev => !prev)

    const saveCodeScanned = async (data: BarcodeScanningResult) => {
        if (modalVisible) return;
        //console.log(data);
        setDataQr(data);
        setModalVisible(true);
        try {
            const newRow = await validateANDSave(data);
            if (newRow) {
                setnewRowSaved(newRow);
                setListHistory([...listHistory, newRow]);
            }
        } catch (error) {
            console.log('saveCodeScanned', error);
        }
    };

    const goToPageDetails = () => {
        if (!newRowSaved) return;
        router.push(`/page-codeHistory/${newRowSaved.id}`);
        setnewRowSaved(null)
    };
    const bgImage = require("../../assets/scanner.png");

    return (
        <ScrollView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <ModalScanned
                    hideModal={hideModal}
                    goToDetails={goToPageDetails}
                    dataQR={dataQr!}
                />
            </Modal>
            {
                permission?.granted ?
                    <View style={styles.cameraContainer}>
                        <CameraView
                            style={styles.camera}
                            enableTorch={torch}
                            barcodeScannerSettings={{
                                barcodeTypes: ["qr"],
                            }}
                            onBarcodeScanned={(data) => saveCodeScanned(data)}
                            ratio='1:1'
                            facing={facingCamera}
                            mirror={true}
                            zoom={zoom}
                        >
                            <ImageBackground
                                style={styles.imgScanner}
                                source={bgImage}
                                resizeMode='cover'
                            ></ImageBackground>
                        </CameraView>
                    </View>
                    : <Text className='text-white text-xl'>Loading</Text>

            }
            <View className='flex flex-row justify-center items-center my-2'>
                <Text className=' text-blue text-xl font-semibold'>-</Text>
                <Slider
                    style={{ width: 200, height: 30, backgroundColor: '#272727', borderRadius: 40, marginHorizontal: 10 }}
                    minimumValue={0}
                    maximumValue={0.7}
                    minimumTrackTintColor="#3A86FF"
                    maximumTrackTintColor="#3A86FF"
                    onValueChange={(value) => setZoom(value)}
                    thumbTintColor="#fafafa"

                />
                <Text className=' text-blue text-xl font-semibold'>+</Text>
            </View>
        </ScrollView >
    )
}
//barcodeTypes: ["qr", 'aztec', 'codabar', 'code128', 'code39', 'datamatrix', 'ean13', 'ean8', 'itf14', 'pdf417', 'upc_a', 'upc_e'],

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        overflow: 'hidden',
        borderRadius: 25,
        width: '100%',
        aspectRatio: 1,
        marginVertical: 10,
    },
    camera: {
        flex: 1,
    },
    imgScanner: {
        flex: 1,
        resizeMode: "cover",
    }
})