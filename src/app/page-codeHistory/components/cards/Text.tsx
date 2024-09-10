import { View } from 'react-native'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'
import BtnAction from '../BtnAction'
import { copyToClipboard } from '@/functions/functions'

export default function Text({ data }: { data: HistoryData }) {

    const textData = data.value

    const handleBtnClick = async () => {
        try {
            await copyToClipboard(textData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <ItemTitleAndValue
                title='Text'
                value={textData}
            />
            <BtnAction
                func={handleBtnClick}
                title='Copy Text'
            />
        </View>
    )
}