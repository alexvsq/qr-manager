import { View } from 'react-native';
import NavBarFooter from '@/module/NavBarFooter'
import CardPrincipal from '@/components/CardPrincipal';
import CardScondary from '@/components/CardScondary';
import PrincipalPage from '@/module/Principal';
import SecondaryPage from '@/module/Secondary';
import { useContextData } from '@/contexts/context'

export default function App() {

    const { screen } = useContextData()

    return (
        <>
            <View className='bg-bg-1 flex-1'>
                <View className='px-3'>
                    <CardPrincipal title={screen.title}>
                        <PrincipalPage />
                    </CardPrincipal>
                </View>
                <CardScondary title={screen.subtitle}>
                    <SecondaryPage />
                </CardScondary>
            </View>
            <NavBarFooter />
        </>
    );
}
