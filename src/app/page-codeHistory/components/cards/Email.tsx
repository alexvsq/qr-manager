import { View, Linking } from 'react-native'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'
import { getEmailData } from '@/functions/functions'
import BtnAction from '../BtnAction'

export default function Email({ data }: { data: HistoryData }) {

    const emaildata = getEmailData(data.value)

    const handleBtnClick = () => {
        const email = emaildata.to;
        const subject = emaildata.subject;
        const body = emaildata.body;
        const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(emailUrl);
    }

    return (
        <View>
            <ItemTitleAndValue
                title='Name'
                value={data.titleName ? data.titleName : data.value}
            />
            <ItemTitleAndValue
                title='To'
                value={emaildata.to}
            />
            <ItemTitleAndValue
                title='Subject'
                value={emaildata.subject}
            />
            <ItemTitleAndValue
                title='Body'
                value={emaildata.body}
            />
            <BtnAction
                func={handleBtnClick}
                title='Open Email'
            />
        </View>
    )
}
