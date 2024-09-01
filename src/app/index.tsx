import { StyleSheet, Text, View } from 'react-native';
import NavBarFooter from '@/module/NavBarFooter'
import CardPrincipal from '@/components/CardPrincipal';
import CardScondary from '@/components/CardScondary';
import PrincipalPage from '@/module/Principal';
import SecondaryPage from '@/module/Secondary';
import { useContextData } from '@/contexts/context'
import { screensTextsTitles, ScreensTexts } from '@/utils/screensTextsTitles'

export default function App() {
    const { screen, setScreen } = useContextData();

    // Tipamos `screen` como una de las claves de `ScreensTexts`
    const { id, title, subtitle, secondBtn } = screensTextsTitles[screen as keyof ScreensTexts];

    return (
        <>
            <View className='bg-bg-1 flex-1 flex justify-between'>
                <View className='px-3'>
                    <CardPrincipal title={title}>
                        <PrincipalPage />
                    </CardPrincipal>
                </View>
                <CardScondary title={subtitle}>
                    <SecondaryPage />
                </CardScondary>
            </View>
            <NavBarFooter />
        </>
    );
}
