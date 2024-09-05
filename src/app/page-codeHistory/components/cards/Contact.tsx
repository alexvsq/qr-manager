import { View, Linking } from 'react-native'
import { getContactData, shortenText } from '@/functions/functions'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'
import BtnAction from '../BtnAction'

export default function Contact({ data }: { data: HistoryData }) {

    const contactdata = getContactData(data.value)
    const handleBtnClick = () => {
        Linking.openURL('content://contacts/people')
    }

    return (
        <View>
            <ItemTitleAndValue
                title='Full Name'
                value={contactdata.fullName}
            />
            <ItemTitleAndValue
                title='Name'
                value={contactdata.name}
            />
            <ItemTitleAndValue
                title='Organization'
                value={contactdata.organization}
            />
            <ItemTitleAndValue
                title='Phone'
                value={contactdata.phone}
            />
            <ItemTitleAndValue
                title='Work'
                value={contactdata.title}
            />
            <BtnAction
                func={handleBtnClick}
                title='Open Contacts'
            />
        </View>
    )
}