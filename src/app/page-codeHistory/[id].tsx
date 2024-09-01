import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { getOneRow, deleteOneRow } from '@/functions/sql-functions'
import { useEffect, useState } from 'react'
import { HistoryData } from '@/types/types'
import { router } from 'expo-router'

export default function Detail() {

    const { id } = useLocalSearchParams();
    const [data, setData] = useState<HistoryData | null>()

    async function getDetailsFromId() {
        const idString = String(id)
        const res = await getOneRow(idString)
        setData(res)
    }
    async function deleteOneRowandBack() {
        const res = await deleteOneRow(data!.id)
        router.back()
        console.log(res)
    }
    useEffect(() => {
        getDetailsFromId()
    }, [])

    const showAlert = () => {
        Alert.alert(
            'Delete',
            'Do you want to delete this item?',
            [{
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: () => deleteOneRowandBack(),
                style: 'destructive'
            }]
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item Details</Text>
            {data ? (
                <>
                    <Text>Value: <Text className='text-[16px]'>{data.value}</Text></Text>
                    <Text>Type: <Text className='text-[16px]'>{data.type}</Text></Text>
                    <Text>TypeCode: {data.typeCode}</Text>
                    <Text>Date: {data.date}</Text>
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity
                            style={styles.btnDelete}
                            onPress={showAlert}
                        >
                            <Text className='text-white text-base font-semibold'>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnGo}
                            onPress={() => console.log('Go to page')}
                        >
                            <Text className='text-white text-base font-semibold'>Go To</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text>No valid data found</Text>
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    btnGo: {
        backgroundColor: '#3A86FF',
        borderRadius: 10,
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    btnDelete: {
        backgroundColor: '#781515',
        borderRadius: 10,
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10
    }
});