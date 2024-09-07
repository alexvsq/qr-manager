import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { IconCard } from '@/components/cards'
import HistoryCardCodes from '@/components/CardHistory';
import { getAllDataSqlHistory } from '@/functions/sql/history-qr';
import { useState, useEffect } from 'react';
import { FlashList } from "@shopify/flash-list";
import { HistoryData } from '@/types/types'
import { View, StyleSheet } from 'react-native'
import { imgCards } from '@/utils/icons'
import { router } from 'expo-router'

export function PrincipalHistory() {

    const [cardRowsHistory, setCardRowsHistory] = useState<number>(4);



    return (
        <View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {
                    imgCards.map((item, index) => {
                        if (index < cardRowsHistory) {
                            return (
                                <IconCard
                                    key={index}
                                    source={item.source}
                                    title={item.type}
                                    width={'22%'}
                                />
                            );
                        }
                        return null;
                    })
                }
            </View>
        </View>
    );
}

type itemCardHistory = {
    item: HistoryData;
    index: number;
}

export function SecondaryHistory() {
    const [data, setData] = useState<HistoryData[]>([]);

    async function getDataSql2() {
        try {
            const result = await getAllDataSqlHistory();
            if (result) {
                setData(result)
            }

        } catch (error) {
            console.log("getDataSql2", error);
        }
    }

    useEffect(() => {
        getDataSql2();
    }, []);

    const goToPageDetails = (id: number) => {
        router.push(`/page-codeHistory/${id}`)
    }
    return (
        <View
            //entering={FadeInUp}
            className='flex-1'
        >
            <FlashList
                data={[...data].toReversed()}
                renderItem={({ item, index }: itemCardHistory) => (
                    <Animated.View
                        entering={FadeInUp.delay(index * 90)}
                    >
                        <HistoryCardCodes
                            itemInfo={item}
                            pressFunc={() => goToPageDetails(item.id!)}
                        />
                    </Animated.View>
                )}
                estimatedItemSize={200}
                keyExtractor={(item) => item.id!.toString()}
            />
        </View>
    );
}