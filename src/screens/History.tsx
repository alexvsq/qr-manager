import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { IconCard } from '@/components/cards'
import HistoryCardCodes from '@/components/CardHistory';
import { useState, useEffect } from 'react';
import { FlashList } from "@shopify/flash-list";
import { HistoryData } from '@/types/types'
import { View, StyleSheet } from 'react-native'
import { imgCards } from '@/utils/icons'
import { router } from 'expo-router'
import { useContextData } from '@/contexts/context';

export function PrincipalHistory() {

    const { numsCardsPrimaryRows } = useContextData()

    return (
        <View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {
                    imgCards.map((item, index) => {
                        if (index < numsCardsPrimaryRows) {
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
    const { listHistory, setListHistory } = useContextData()



    const goToPageDetails = (id: number) => {
        router.push(`/page-codeHistory/${id}`)
    }
    return (
        <View
            //entering={FadeInUp}
            className='flex-1'
        >
            <FlashList
                data={[...listHistory].toReversed()}
                renderItem={({ item, index }: itemCardHistory) => (
                    <Animated.View
                        entering={FadeInUp.delay(index * 80)}
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