import { SecondaryCreate } from '@/screens/Create';
import { SecondaryHistory } from '@/screens/History';
import { SecondaryScanner } from '@/screens/Scanner';
import { useContextData } from '@/contexts/context'

export default function SecondaryPage() {
    const { screen } = useContextData()

    if (screen == 'scanner') {
        return <SecondaryScanner />
    }
    if (screen == 'create') {
        return <SecondaryCreate />
    }
    if (screen == 'history') {
        return <SecondaryHistory />
    }

}