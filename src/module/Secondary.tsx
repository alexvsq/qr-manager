import { StyleSheet, Text, View } from 'react-native';
import { PrincipalCreate, SecondaryCreate } from '@/screens/Create';
import { PrincipalHistory, SecondaryHistory } from '@/screens/History';
import { PrincipalScanner, SecondaryScanner } from '@/screens/Scanner';
import NavBarFooter from '@/components/NavBarFooter'
import CardPrincipal from '@/components/CardPrincipal';
import CardScondary from '@/components/CardScondary';
import { useContextData } from '@/contexts/context'
import BackGround from '@/components/BackGround';

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