import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { IconCard } from '@/components/cards'
import HistoryCardCodes from '@/components/CardHistory';
import { FlashList } from "@shopify/flash-list";
import { HistoryData } from '@/types/types'
import { View } from 'react-native'
import { imgCards } from '@/utils/icons'
import { router } from 'expo-router'
import { useContextData } from '@/contexts/context';

export function PrincipalHistory() {

    const { showCards, filterHistory, setFilterHistory } = useContextData()
    const filterHistoryFunc = (type: string) => {
        if (filterHistory == type) {
            setFilterHistory('')
            return;
        };
        setFilterHistory(type)
    }

    return (
        <Animated.View entering={FadeInDown}>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {
                    imgCards.map((item, index) => {
                        if (showCards) {
                            return (
                                <IconCard
                                    key={index}
                                    source={item.source}
                                    title={item.type}
                                    width={'22%'}
                                    func={() => filterHistoryFunc(item.type)}
                                    active={filterHistory == item.type}
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

export function SecondaryHistory() {
    const { listHistory, filterHistory } = useContextData()

    const goToPageDetails = (id: number) => {
        router.push(`/page-codeHistory/${id}`)
    }
    return (
        <View
            //entering={FadeInUp}
            className='flex-1'
        >
            <FlashList
                data={[...listHistory]
                    .toReversed()
                    .filter((item) => filterHistory != '' ? item.type == filterHistory : true)
                }

                renderItem={({ item, index }: itemCardHistory) => (
                    <Animated.View
                        entering={FadeInUp.delay(index * 30)}
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