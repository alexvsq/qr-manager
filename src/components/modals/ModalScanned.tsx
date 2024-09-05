import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { BarcodeScanningResult } from 'expo-camera';
import { returnType } from '@/functions/orderData'
import { Image } from 'expo-image';
import { returnSource, shortenText } from '@/functions/functions'
import { OpenLink } from '@/functions/Camera-Functions'
import ComponentBtns from '@/app/page-codeHistory/components/Component'
import { returnDataToSave } from '@/functions/orderData'

type Props = {
    hideModal: () => void,
    dataQR: BarcodeScanningResult,
    goToDetails: () => void
}

export default function ModalComponent({ hideModal, dataQR, goToDetails }: Props) {
    const type = returnType(dataQR.raw ? dataQR.raw : dataQR.data)
    const valueRecort = shortenText(dataQR.raw ? dataQR.raw : dataQR.data)
    const dataToSave = returnDataToSave(dataQR)


    const onPressDetails = () => {
        goToDetails()
        hideModal()
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View>
                    <View >
                        <View className='flex flex-row items-center justify-center gap-2'>
                            <Text className=' capitalize text-white text-xl font-semibold'>{type}</Text>
                            <View className=' bg-bg-2 aspect-square flex-row items-center justify-center rounded-full p-2  h-[35px]'>
                                <Image
                                    source={returnSource(type)}
                                    contentFit='contain'
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                        </View>
                    </View>
                    <View className='w-[150px] h-[1px] bg-lines-dark my-1'></View>
                </View>

                <View style={{ minWidth: 250, marginTop: 10 }}>

                    <ComponentBtns
                        type={type}
                        data={dataToSave}
                    />

                </View>

                <View >
                    <View className='flex-row gap-2 '>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={hideModal}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onPressDetails}>
                            <Text style={styles.textStyle}>Details</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#1b1b1b',
        maxWidth: '85%',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
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
        paddingHorizontal: 12,
        paddingVertical: 4,
        elevation: 2,
        backgroundColor: '#3A86FF',
    },
    buttonClose: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
        elevation: 2,
        backgroundColor: '#781515',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginVertical: 20,
        textAlign: 'center',
        color: 'white',

    },
})