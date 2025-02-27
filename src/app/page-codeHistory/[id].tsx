import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { getOneRow, deleteOneRow, saveNoteToSql } from '@/functions/sql/history-qr'
import { useEffect, useState } from 'react'
import { HistoryData } from '@/types/types'
import { Image } from 'expo-image';
import { returnSource } from '@/functions/functions'
import Component from './components/Component'
import { useContextData } from '@/contexts/context'

export default function Detail() {

    const { id } = useLocalSearchParams();
    const [data, setData] = useState<HistoryData | null>()
    const { listHistory, setListHistory } = useContextData()
    const [notes, setNotes] = useState<string>('')

    const goToCreateQr = () => router.push('/page-generate-qr/' + encodeURIComponent(data!.value))

    const showAlertDelete = () => {
        Alert.alert(
            'Delete',
            'Do you want to delete this item?',
            [{
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: async () => await deleteWithId(),
                style: 'destructive'
            }]
        )
    }
    const dateDay = data?.date?.split(',')[0]
    const dateTime = data?.date?.split(',')[1]

    async function deleteWithId() {
        try {
            if (!data) return;
            const newListHistory = listHistory.filter((x: HistoryData) => x.id !== data.id)
            setListHistory(newListHistory)
            console.log(newListHistory);
            await deleteOneRow(data.id!)
        } catch (error) {
            console.log('error', error)
        }
        router.back()
    }

    const saveNote = async () => {
        if (!data || notes == '') return;
        try {
            await saveNoteToSql(data.id!, notes)
        } catch (error) {
            console.log('saveNote', error)
        }
    }

    useEffect(() => {
        getOneRow(String(id))
            .then(res => {
                setData(res)
                if (res?.notes) {
                    setNotes(res.notes)
                }
            })
    }, [])

    return (
        <ScrollView style={styles.container}>
            {data ? (
                <>
                    <View className='flex items-center my-4'>
                        <View className=' bg-bg-2 aspect-square flex-row items-center justify-center rounded-full p-4 mb-2 h-[90px]'>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={returnSource(data.type)}
                                contentFit='contain'
                            />
                        </View>

                        <Text style={styles.title}>{data.titleName}</Text>

                        <View className=' bg-blue ' style={{ paddingHorizontal: 16, paddingBottom: 2, borderRadius: 40, marginVertical: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>{data.type}</Text>
                        </View>

                    </View>
                    <View className='flex flex-row w-full items-center justify-between '>
                        <Text className=' text-white'>{dateTime}</Text>
                        <Text className=' text-white'>{dateDay}</Text>
                    </View>
                    <View style={{ marginVertical: 10, gap: 5 }}>

                        <Text className=' text-center  text-text-dark my-1' >Tap One to Copy</Text>

                        {
                            data &&
                            <Component
                                type={data.type}
                                data={data}
                            />
                        }

                    </View>

                    <View >
                        <Text className='text-white text-lg px-1'>Notes</Text>
                        <View className='bg-bg-2 w-full h-20 my-2 rounded-[15px]'>
                            <TextInput
                                placeholder='Write your notes here'
                                placeholderTextColor={'#9B9B9B'}
                                style={{ width: '100%', padding: 12, color: '#fff' }}
                                multiline={true}
                                onChangeText={(text) => setNotes(text)}
                                value={notes}
                            />
                        </View>
                        <View className='flex flex-row justify-end'>
                            <TouchableOpacity
                                onPress={saveNote}
                                className='bg-bg-2 py-1 px-4 rounded-full my-1'
                            >
                                <Text className='text-blue font-semibold'>Save Note</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className='flex  w-full items-center justify-center my-2'>
                        <TouchableOpacity
                            onPress={goToCreateQr}
                            className='bg-blue py-1 px-4 rounded-full my-1'>
                            <Text className='text-white'>View Qr Code Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={showAlertDelete}
                            className='bg-[#781515] py-1 px-4 rounded-full my-1'>
                            <Text className='text-white' >Delete</Text>
                        </TouchableOpacity>
                    </View>

                </>
            ) : (
                <Text className='text-white text-xl'>No valid data found</Text>
            )
            }


        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#1b1b1b'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fafafa'
    }
});