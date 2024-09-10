import { Text, TouchableOpacity } from 'react-native'
import { shortenText } from '@/functions/functions'
import { copyToClipboard } from '@/functions/functions'

export default function ItemTitleAndValue({ title, value }: { title: string, value: string }) {

    const handleCopy = () => {
        copyToClipboard(value)
    }

    return (
        <TouchableOpacity
            onPress={handleCopy}
            className='flex flex-row my-1'
        >

            <Text className='text-text-dark text-[13px] font-semibold mt-[2px]'>{shortenText(title)} </Text>
            <Text className='text-white text-[15px] font-semibold ml-1'>{shortenText(value, 50)}</Text>

        </TouchableOpacity>


    )
}