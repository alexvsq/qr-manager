import { PrincipalCreate, } from '@/screens/Create';
import { PrincipalHistory, } from '@/screens/History';
import { PrincipalScanner, } from '@/screens/Scanner';
import { useContextData } from '@/contexts/context'

export default function PrincipalPage() {
    const { screen } = useContextData()

    if (screen.name == 'scanner') {
        return <PrincipalScanner />
    }
    if (screen.name == 'create') {
        return <PrincipalCreate />
    }
    if (screen.name == 'history') {
        return <PrincipalHistory />
    }

}