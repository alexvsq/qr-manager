import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, HueSlider } from 'reanimated-color-picker';

type Props = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    defaultColor: any,
    onSelectColor: ({ hex }: { hex: string }) => void,
}

export default function ModalPickColor({ showModal, setShowModal, defaultColor, onSelectColor }: Props) {



    return (
        <Modal transparent={true} visible={showModal} animationType='slide'>
            <View className='flex-1 justify-center items-center'>

                <View style={styles.modalColor}>
                    <ColorPicker
                        style={{ width: '70%' }}
                        value={defaultColor}
                        onComplete={onSelectColor}
                    >

                        <Preview />
                        <Panel1 style={{ height: 120 }} />
                        <HueSlider style={{ marginVertical: 15 }} />
                        <Swatches />

                    </ColorPicker>

                    <TouchableOpacity
                        onPress={() => setShowModal(false)}
                        className='bg-blue py-2 px-4 rounded-full my-1'
                    >
                        <Text className='text-white text-center font-semibold'>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalColor: {
        backgroundColor: '#272727',
        padding: 20,
        borderRadius: 20,
    }
});
