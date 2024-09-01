import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

type Props = {
    hideModal: () => void,
    RunData: () => void,
    dataQR: dataQrType,
}
interface dataQrType {
    data: string;
    type: string;
}

export default function ModalComponent({ hideModal, RunData, dataQR }: Props) {


    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Scanned QR code is:</Text>
                <Text style={styles.modalText}>{dataQR.data}</Text>
                <View className='flex-row'>
                    <Pressable
                        style={styles.button}
                        onPress={hideModal}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={RunData}>
                        <Text style={styles.textStyle}>Go</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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