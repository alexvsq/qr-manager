import { View, Linking } from 'react-native'
import { getContactData, getContactData2, shortenText } from '@/functions/functions'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'
import BtnAction from '../BtnAction'

export default function Contact({ data }: { data: HistoryData }) {

    const contactdata = getContactData2(data.value)
    const handleBtnClick = () => {

        console.log(contactdata)

        //   Linking.openURL('content://contacts/people')
    }

    return (
        <View>
            {
                contactdata.fullName.length > 0 &&
                <ItemTitleAndValue
                    title='Name'
                    value={contactdata.fullName}
                />
            }
            {
                contactdata.homePhone.length > 0 &&
                <ItemTitleAndValue
                    title='Phone'
                    value={contactdata.homePhone}
                />
            }
            {
                contactdata.workPhone.length > 0 &&
                <ItemTitleAndValue
                    title='Work'
                    value={contactdata.workPhone}
                />
            }
            {
                contactdata.title.length > 0 &&
                <ItemTitleAndValue
                    title='Name'
                    value={contactdata.title}
                />
            }
            {
                contactdata.organization.length > 0 &&
                <ItemTitleAndValue
                    title='Organization'
                    value={contactdata.organization}
                />
            }
            {
                contactdata.email.length > 0 &&
                <ItemTitleAndValue
                    title='Work'
                    value={contactdata.email}
                />
            }
            <BtnAction
                func={handleBtnClick}
                title='Open Contacts'
            />
        </View>
    )
}