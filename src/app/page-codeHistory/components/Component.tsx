import { View, Text } from 'react-native'
import React from 'react'
import Wifi from './cards/Wifi'
import Url from './cards/Url'
import Number from './cards/Number'
import Contact from './cards/Contact'
import Web from './cards/Web'
import Sms from './cards/Sms'
import Email from './cards/Email'
import { HistoryData } from '@/types/types'

export default function Component({ type, data }: { type: string, data: HistoryData }) {
    if (type == 'wifi') return <Wifi data={data} />
    if (type == 'url') return <Url data={data} />
    if (type == 'number') return <Number data={data} />
    if (type == 'contact') return <Contact data={data} />
    if (type == 'web') return <Web data={data} />
    if (type == 'sms') return <Sms data={data} />
    if (type == 'email') return <Email data={data} />
}