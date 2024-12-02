import { View } from 'react-native'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'

export default function Url({ data }: { data: HistoryData }) {

    /*     const handleBtnClick = () => {
            Linking.openURL(data.value);
        } */

    return (
        <View>
            <ItemTitleAndValue
                title='Name'
                value={data.titleName ? data.titleName : data.value}
            />
            <ItemTitleAndValue
                title='Url'
                value={data.value}
            />
            {/*  <BtnAction
                func={handleBtnClick}
                title='Open Link'
            /> */}
        </View>
    )
}
