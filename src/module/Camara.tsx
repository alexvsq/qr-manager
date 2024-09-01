import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, } from 'react-native';
import { useContextData } from '@/contexts/context'
import ModalComponent from '@/components/ModalComponent'
import { validateANDSaveAndRun } from '@/functions/validates'

export default function Camara() {
    const { torch } = useContextData()
    const [permission, requestPermission] = useCameraPermissions();
    const [modalVisible, setModalVisible] = useState(false);
    const [dataQr, setDataQr] = useState<BarcodeScanningResult>();

    useEffect(() => {
        requestPermission()
    }, [])

    const hideModal = () => setModalVisible(!modalVisible)
    const RunData = () => {
        setModalVisible(false)
        validateANDSaveAndRun(dataQr!)
    }

    const onBarcodeScanned = (data: BarcodeScanningResult) => {
        if (modalVisible) return
        setDataQr(data);
        setModalVisible(true);
    }
    return (
        <View style={styles.camera}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <ModalComponent
                    hideModal={hideModal}
                    RunData={RunData}
                    dataQR={dataQr!}
                />
            </Modal>
            <CameraView
                style={{ flex: 1 }}
                enableTorch={torch}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={(data) => onBarcodeScanned(data)}
                ratio='1:1'
            />

        </View>
    )
}

//barcodeTypes: ["qr", 'aztec', 'codabar', 'code128', 'code39', 'datamatrix', 'ean13', 'ean8', 'itf14', 'pdf417', 'upc_a', 'upc_e'],

const styles = StyleSheet.create({
    camera: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 10,
    },

})