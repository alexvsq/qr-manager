import { StyleSheet, Text, View } from 'react-native';
import NavBarFooter from '@/components/NavBarFooter'
import CardPrincipal from '@/components/CardPrincipal';
import CardScondary from '@/components/CardScondary';
import BackGround from '@/components/BackGround';
import PrincipalPage from '@/module/Principal';
import SecondaryPage from '@/module/Secondary';

export default function App() {

    return (
        <BackGround>
            <View className=' flex-1 flex justify-between'>
                <View className='px-3'>
                    <CardPrincipal title='Create'>
                        <PrincipalPage />

                    </CardPrincipal>
                </View>
                <CardScondary>

                    <SecondaryPage />


                </CardScondary>
            </View>
            <NavBarFooter />
        </BackGround>
    );
}
