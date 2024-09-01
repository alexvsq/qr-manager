import { PrincipalCreate, } from '@/screens/Create';
import { PrincipalHistory, } from '@/screens/History';
import { PrincipalScanner, } from '@/screens/Scanner';
import { useContextData } from '@/contexts/context'

export default function PrincipalPage() {
    const { screen } = useContextData()

    if (screen == 'scanner') {
        return <PrincipalScanner />
    }
    if (screen == 'create') {
        return <PrincipalCreate />
    }
    if (screen == 'history') {
        return <PrincipalHistory />
    }

}