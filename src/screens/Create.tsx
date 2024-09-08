import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { IconCard } from '@/components/cards'
import HistoryCardCodes from '@/components/CardHistory';
import { useState, useEffect } from 'react';
import { FlashList } from "@shopify/flash-list";
import { HistoryData } from '@/types/types'
import { View, StyleSheet } from 'react-native'
import { imgCards } from '@/utils/icons'
import { router } from 'expo-router'
import { useContextData } from '@/contexts/context'

export function PrincipalCreate() {

    const { numsCardsPrimaryRows } = useContextData()

    const goToCreate = (type: string) => {
        router.push('/page-create-qr/' + type)
    }

    return (
        <Animated.View entering={FadeInDown}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {imgCards.map((item, index) => {
                    if (index < numsCardsPrimaryRows) {
                        return (
                            <IconCard
                                key={index}
                                source={item.source}
                                title={item.type}
                                width={'22%'}
                                func={() => goToCreate(item.type)}
                            />
                        );
                    }
                    return null;
                })
                }
            </View>
        </Animated.View>
    );
}

type itemCardHistory = {
    item: HistoryData;
    index: number;
}

export function SecondaryCreate() {
    const { listCreates, setListCreates } = useContextData()

    const goToPageEditCreateQr = (value: string) => {
        router.push('/page-generate-qr/' + value)
    }

    useEffect(() => {

    }, []);

    return (
        <View className='flex-1'>
            <FlashList
                data={[...listCreates].toReversed()}
                renderItem={({ item, index }: itemCardHistory) => (
                    <Animated.View
                        entering={FadeInUp.delay(index * 80)}
                    >
                        <HistoryCardCodes
                            itemInfo={item}
                            pressFunc={() => goToPageEditCreateQr(item.value)}
                        />
                    </Animated.View>
                )}
                estimatedItemSize={200}
                keyExtractor={(item) => item.id!.toString()}
            />

        </View>
    )
}

