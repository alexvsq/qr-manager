import { ScrollView, Text, View, TouchableOpacity, Switch } from 'react-native'
import { Languages } from '@/utils/lenguages'
import { saveVibrate, saveSound } from '@/functions/sql/settings'
import { useContextData } from '@/contexts/context'

export default function Settings() {

    const { settings, setSettings } = useContextData()

    const handleChangeSound = async () => {
        const value = !settings.sound;
        setSettings({ ...settings, sound: value })
        try {
            saveSound(value)
        } catch (error) {
            console.error('handleChangeSound', error);
        }
    }
    const handleChangeVibrate = () => {
        const value = !settings.vibrate;
        setSettings({ ...settings, vibrate: value })
        try {
            saveVibrate(value)
        } catch (error) {
            console.error("handleChangeSound", error);
        }
    }

    return (
        <ScrollView className='flex-1 bg-bg-1 px-3 pt-5'>

            <View>
                {/*  <Text className='text-blue text-lg my-3 font-semibold'>Lenguajes</Text>
                <View className='flex flex-row flex-wrap my-1'>
                    {
                        Languages.map((language, index) => {
                            return (
                                <TouchableOpacity key={index} className='flex flex-row items-end  bg-bg-2 py-2 px-5 rounded-[15px] mr-3 mb-3'>
                                    <Text className=' text-white font-semibold text-[15px] mr-1'>{language.name}</Text>
                                    <Text className=' text-text-dark text-[11px] font-semibold'>{language.code}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View> */}

                <View className='my-2'>
                    <Text className='text-blue text-lg my-2 font-semibold'>Scann</Text>

                    <View className='flex flex-row  items-center justify-between my-2'>
                        <Text className=' text-white font-semibold text-[15px] mr-1'>Sound</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={'#3A86FF'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={handleChangeSound}
                            value={settings.sound}
                        />
                    </View>
                    <View className=' bg-lines-dark h-[1px] w-full'>
                    </View>
                    <View className='flex flex-row  items-center justify-between my-2'>
                        <Text className=' text-white font-semibold text-[15px] mr-1'>Vibrate</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={'#3A86FF'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={handleChangeVibrate}
                            value={settings.vibrate}
                        />
                    </View>
                </View>


                <View className='my-2'>
                    <Text className='text-blue text-lg my-2 font-semibold'>FeedBack</Text>

                    <TouchableOpacity className=' my-4'>
                        <Text className=' text-white font-semibold text-[15px] mr-1'>Talk whith us</Text>
                    </TouchableOpacity>
                    <View className=' bg-lines-dark h-[1px] w-full'>
                    </View>
                    <TouchableOpacity className=' my-4'>
                        <Text className=' text-white font-semibold text-[15px] mr-1'>Contact us</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </ScrollView>
    )
}