import { View, Linking } from 'react-native'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'
import BtnAction from '../BtnAction'

export default function Web({ data }: { data: HistoryData }) {

    const handleBtnClick = () => {
        Linking.openURL(data.value);
    }

    return (
        <View>
            <ItemTitleAndValue
                title='Name'
                value={data.titleName ? data.titleName : data.value}
            />
            <ItemTitleAndValue
                title='Web'
                value={data.value}
            />
            <BtnAction
                func={handleBtnClick}
                title='Open Link'
            />
        </View>
    )
}
