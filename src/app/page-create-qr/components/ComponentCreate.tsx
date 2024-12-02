import { Text } from 'react-native'
import Wifi from './cards/Wifi'
import Web from './cards/Web'
import Url from './cards/Url'
import Contact from './cards/Contact'
import Number from './cards/Number'
import Sms from './cards/Sms'
import Email from './cards/Email'
import TextComponent from './cards/Text'

export default function ComponentCreate({ type }: { type: string }) {

    if (type === 'wifi') {
        return <Wifi />
    } else if (type === 'web') {
        return <Web />
    } else if (type === 'url') {
        return <Url />
    } else if (type === 'contact') {
        return <Contact />
    } else if (type === 'number') {
        return <Number />
    } else if (type === 'sms') {
        return <Sms />
    } else if (type === 'email') {
        return <Email />
    } else if (type === 'text') {
        return <TextComponent />
    }

    else {
        return <Text className='text-white'>No valid type</Text>
    }


}