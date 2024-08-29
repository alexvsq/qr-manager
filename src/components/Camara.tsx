import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, Modal, View, Pressable, Linking } from 'react-native';
import { useContextData } from '@/contexts/context'


export default function Camara() {
    const { torch } = useContextData()
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [modalVisible, setModalVisible] = useState(false);
    const [dataQr, setDataQr] = useState<string>('');

    useEffect(() => {
        requestPermission()
    }, [])
    /* 
        barcodeTypes: ["qr", 'aztec', 'codabar', 'code128', 'code39', 'datamatrix', 'ean13', 'ean8', 'itf14', 'pdf417', 'upc_a', 'upc_e'],
    */
    const openLink = async (link: string) => {
        const url = link;
        const suported = await Linking.canOpenURL(url);
        if (suported) {
            await Linking.openURL(url);
        } else {
            alert('Error');
        }
    }
    return (
        <View style={styles.camera}>
            <CameraView
                style={{ flex: 1 }}
                enableTorch={torch} facing={facing}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}

                onBarcodeScanned={({ type, data }: { type: string, data: string }) => {
                    console.log(type);
                    console.log(data);

                    setDataQr(data);
                    setModalVisible(true);

                }}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Scanned QR code is:</Text>
                            <Text style={styles.modalText}>{dataQr}</Text>
                            <View className='flex-row'>

                                <Pressable
                                    style={styles.button}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.button}
                                    onPress={() => openLink(dataQr)}>
                                    <Text style={styles.textStyle}>Open URL</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </CameraView>
        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#272727',

        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#3A86FF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 20,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',

    },
})