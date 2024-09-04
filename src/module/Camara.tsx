import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, } from 'react-native';
import { useContextData } from '@/contexts/context'
import ModalScanned from '@/components/modals/ModalScanned'
import { validateANDSave } from '@/functions/validates'
import { router } from 'expo-router'

export default function Camara() {
    const { torch } = useContextData()
    const [permission, requestPermission] = useCameraPermissions();
    const [modalVisible, setModalVisible] = useState(false);
    const [dataQr, setDataQr] = useState<BarcodeScanningResult>();
    const [idDetails, setIdDetails] = useState<string>('')

    useEffect(() => {
        requestPermission()
    }, [])

    const hideModal = () => setModalVisible(prev => !prev)

    const onBarcodeScanned = async (data: BarcodeScanningResult) => {
        if (modalVisible) return;

        setDataQr(data);
        setModalVisible(true);

        const id = await validateAndSaveData(data);
        if (id) {
            setIdDetails(String(id));
        }
    };

    const validateAndSaveData = async (data: BarcodeScanningResult) => {
        if (!data) return null;
        try {
            const id = await validateANDSave(data);
            console.log('Data saved with ID:', id);
            return id;
        } catch (error) {
            console.error('Error saving data:', error);
            return null;
        }
    };

    const goToPageDetails = () => {
        if (!idDetails) return;
        router.push(`/page-codeHistory/${idDetails}`);
        setIdDetails('')
    };

    return (
        <View style={styles.camera}>
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