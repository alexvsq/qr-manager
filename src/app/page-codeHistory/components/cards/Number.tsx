import { View, Text, Linking } from 'react-native'
import { getNumberData } from '@/functions/functions'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'
import BtnAction from '../BtnAction'

export default function Number({ data }: { data: HistoryData }) {

    const numberdata = getNumberData(data.value)
    const handleBtnClick = () => {
        const number = `tel:${numberdata}`
        Linking.openURL(number)
    }


    return (
        <View>
            <ItemTitleAndValue
                title='Number'
                value={numberdata}
            />
            <BtnAction
                func={handleBtnClick}
                title='Call Number'
            />
        </View>
    )
}
