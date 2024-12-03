import { SecondaryCreate } from '@/screens/Create';
import { SecondaryHistory } from '@/screens/History';
import { SecondaryScanner } from '@/screens/Scanner';
import { useContextData } from '@/contexts/context'

export default function SecondaryPage() {
    const { screen } = useContextData()

    if (screen.name == 'scanner') {
        return <SecondaryScanner />
    }
    if (screen.name == 'create') {
        return <SecondaryCreate />
    }
    if (screen.name == 'history') {
        return <SecondaryHistory />
    }

}