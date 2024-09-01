import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { RowCards } from '@/components/cards';
import HistoryCardCodes from '@/components/CardHistory';
import { getAllDataSql } from '@/functions/sql-functions';
import { useState, useEffect } from 'react';
import { FlashList } from "@shopify/flash-list";
import { HistoryData } from '@/types/types'

export function PrincipalHistory() {
    return (
        <Animated.View
            entering={FadeInDown}
        >
            <RowCards />
        </Animated.View>
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
            const result = await getAllDataSql();
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

    return (
        <Animated.View
            entering={FadeInUp}
            className='flex-1'
        >
            <FlashList
                data={[...data].toReversed()}
                renderItem={({ item, index }: itemCardHistory) => (
                    <Animated.View entering={FadeInUp.delay(index * 90)}>
                        <HistoryCardCodes
                            itemInfo={item}
                        />
                    </Animated.View>
                )}
                estimatedItemSize={200}
                keyExtractor={(item) => item.id!.toString()}

            />
        </Animated.View>
    );
}