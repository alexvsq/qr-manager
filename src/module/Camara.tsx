import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Modal, View, } from 'react-native';
import { useContextData } from '@/contexts/context'
import { useRouter, } from "expo-router";
import { OpenLink, getWifiData } from '@/functions/Camera-Functions'
import { saveDataQr } from '@/functions/sql-functions'
import ModalComponent from '@/components/ModalComponent'

export default function Camara() {
    const router = useRouter();
    const { torch } = useContextData()
    const [permission, requestPermission] = useCameraPermissions();
    const [modalVisible, setModalVisible] = useState(false);
    const [dataQr, setDataQr] = useState<BarcodeScanningResult>();

    useEffect(() => {
        requestPermission()
    }, [])

    const hideModal = () => setModalVisible(!modalVisible)
    const RunData = () => validateANDRunDataQR(dataQr!)

    const validateANDRunDataQR = (data: BarcodeScanningResult) => {
        const value = data.raw ? data.raw : data.data;
        console.log(data);

        if (value.includes("://")) {
            OpenLink(value);
            saveDataQr(value, 'url', data.type)
        } else if (value.startsWith("WIFI")) {
            setModalVisible(false);
            const wifiData = getWifiData(value);
            router.push("/scanned-wifi/" + JSON.stringify(wifiData))
            saveDataQr(value, 'wifi', data.type)
        } else {
            setModalVisible(false);
            saveDataQr(value, 'text', data.type)
        }
    };
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
/* 
    barcodeTypes: ["qr", 'aztec', 'codabar', 'code128', 'code39', 'datamatrix', 'ean13', 'ean8', 'itf14', 'pdf417', 'upc_a', 'upc_e'],
*/
const styles = StyleSheet.create({
    camera: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 10,
    },

})