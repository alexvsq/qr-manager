import { View, Linking, Platform } from 'react-native'
import { getWifiData } from '@/functions/functions'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'
import BtnAction from '../BtnAction'

export default function wifi({ data }: { data: HistoryData }) {

    const wifidata = getWifiData(data.value)

    const handleBtnClick = () => {

        if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:root=WIFI');
        } else if (Platform.OS === 'android') {
            Linking.openSettings();
        }
    }

    return (
        <View>
            <ItemTitleAndValue
                title='Name'
                value={wifidata.name}
            />
            <ItemTitleAndValue
                title='Password'
                value={wifidata.password}
            />
            <ItemTitleAndValue
                title='Security'
                value={wifidata.security}
            />
            <ItemTitleAndValue
                title='Hidden'
                value={wifidata.hidden}
            />

            <BtnAction
                func={handleBtnClick}
                title='Open Wifi Settings'
            />
        </View>
    )
}
