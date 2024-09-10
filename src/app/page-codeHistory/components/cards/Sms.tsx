import { View, Linking } from 'react-native'
import { getSMSData } from '@/functions/functions'
import { HistoryData } from '@/types/types'
import ItemTitleAndValue from '../titleValue'
import BtnAction from '../BtnAction'

export default function Sms({ data }: { data: HistoryData }) {

    const smsdata = getSMSData(data.value)

    const handleBtnClick = () => {
        try {
            const smsToSend = transformSmsFormat(data.value);

            Linking.openURL(smsToSend)
        } catch (error) {
            console.log(error)
        }
    }
    function transformSmsFormat(smsString: string) {
        if (!smsString.startsWith('SMSTO:')) {
            throw new Error('Formato incorrecto');
        }
        const smsData = smsString.slice(6); // Remover "SMSTO:"
        const [phoneNumber, message] = smsData.split(':');
        const encodedMessage = encodeURIComponent(message);

        const formattedSms = `sms:+${phoneNumber}?body=${encodedMessage}`;

        return formattedSms;
    }
    return (
        <View>
            <ItemTitleAndValue
                title='Phone'
                value={smsdata.phoneNumber}
            />
            <ItemTitleAndValue
                title='Message'
                value={smsdata.message}
            />
            <BtnAction
                func={handleBtnClick}
                title='Send Message'
            />
        </View>
    )
}