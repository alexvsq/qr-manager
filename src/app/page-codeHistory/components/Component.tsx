import React from 'react'
import Wifi from './cards/Wifi'
import Url from './cards/Url'
import Number from './cards/Number'
import Contact from './cards/Contact'
import Web from './cards/Web'
import Sms from './cards/Sms'
import Email from './cards/Email'
import TextComponent from './cards/Text'
import { HistoryData } from '@/types/types'

export default function Component({ type, data }: { type: string, data: HistoryData }) {
    if (type == 'wifi') return <Wifi data={data} />
    else if (type == 'url') return <Url data={data} />
    else if (type == 'number') return <Number data={data} />
    else if (type == 'contact') return <Contact data={data} />
    else if (type == 'web') return <Web data={data} />
    else if (type == 'sms') return <Sms data={data} />
    else if (type == 'email') return <Email data={data} />
    else if (type == 'text') return <TextComponent data={data} />

    else {
        return <TextComponent data={data} />
    }
}