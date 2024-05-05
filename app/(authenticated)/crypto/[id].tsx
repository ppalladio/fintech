import { Stack, useLocalSearchParams } from 'expo-router';
import {
    View,
    Text,
    ScrollView,
    SectionList,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle, useFont } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import Animated, {
    SharedValue,
    useAnimatedProps,
} from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });
const categories = ['Overview', 'News', 'Orders', 'Transactions'];
function Tooltip({
    x,
    y,
}: Readonly<{ x: SharedValue<number>; y: SharedValue<number> }>) {
    return <Circle cx={x} cy={y} r={10} color="#3D38ED" />;
}
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const Page = () => {
    const { id } = useLocalSearchParams();
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'));
    const headerHeight = useHeaderHeight();
    const [activeIndex, setActiveIndex] = useState(0);
    const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
	console.log(state,isActive)
    useEffect(() => {
        if (isActive) {
            Haptics.selectionAsync();
        }
    }, [isActive]);

    // console.log('id', id);
    const { data } = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/v1/info?ids=${id}`).then((res) =>
                res.json(),
            );
            return info[+id];
        },
    });
    //! query is send to api only the first time not the  subsequent times
    const coinPaprikaQuery: string =
        `${data?.symbol}-${data?.name}`.toLowerCase();
    // console.log(coinPaprikaQuery);

    const { data: ticker, refetch } = useQuery({
        queryKey: ['coin_id', id],
        queryFn: async (): Promise<any[]> => {
            if (coinPaprikaQuery) {
                // Check if query is valid
                return fetch(`/api/v1/ticker?id=${coinPaprikaQuery}`).then(
                    (res) => res.json(),
                );
            } else {
                return []; // Return an empty result if query isn't valid
            }
        },
    });

    const animatedText = useAnimatedProps(() => {
        return {
            text: `${state.y?.price.value.value.toFixed(2)}€`,
            defaultValue: ``,
        };
    });
    const animatedDate = useAnimatedProps(() => {
        const date = new Date(state.x.value.value);
        return {
            text: `${date.toLocaleDateString('es-ES')}`,
            defaultValue: ``,
        };
    });

    console.log(ticker);

    return (
        <>
            <Stack.Screen options={{ title: `${data?.name}` }} />
            <SectionList
                ListHeaderComponent={() => (
                    <>
                        <View className="flex-row justify-between items-center my-4">
                            <Text className="text-2xl font-bold mt-5 text-gray mx-3">
                                {data?.symbol}
                            </Text>
                            <Image
                                source={{ uri: data?.logo }}
                                style={{ width: 60, height: 60 }}
                            />
                        </View>
                        <View className="flex-row gap-x-2 m-3">
                            <TouchableOpacity
                                style={[
                                    defaultStyles.pillButtonSmall,
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    },
                                ]}
                                className="bg-primary gap-x-4 flex-row "
                            >
                                <View>
                                    <Ionicons
                                        name="add"
                                        size={24}
                                        color={'#fff'}
                                        style={{ alignSelf: 'center' }}
                                    />
                                </View>
                                <View>
                                    <Text
                                        className="text-white text-center"
                                        style={[defaultStyles.buttonText]}
                                    >
                                        Buy
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    defaultStyles.pillButtonSmall,
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    },
                                ]}
                                className="bg-primaryMuted flex-row gap-x-4"
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color={'#fff'}
                                    style={{ alignSelf: 'center' }}
                                />

                                <Text
                                    className="text-white text-center"
                                    style={[defaultStyles.buttonText]}
                                >
                                    Receive
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                contentInsetAdjustmentBehavior="automatic"
                keyExtractor={(i) => i.title}
                sections={[{ data: [{ title: 'Chart' }] }]}
                style={{ marginTop: headerHeight }}
                renderSectionHeader={() => (
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            paddingHorizontal: 16,
                            paddingBottom: 8,
                            backgroundColor: '#F5F5F5',
                            borderBottomColor: '#626D77',
                            borderBottomWidth: 1,
                        }}
                    >
                        {categories.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveIndex(index)}
                                className={`${
                                    activeIndex === index ? 'bg-[#fff]' : ''
                                } p-2 items-center justify-center rounded-[20px] px-3`}
                            >
                                <Text
                                    className={`${
                                        activeIndex === index
                                            ? 'text-black'
                                            : 'text-gray'
                                    } text-sm`}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                renderItem={(item) => (
                    <>
                        <View className="h-[500px] bg-slate-100">
                            {ticker ? (
                                <>
                                    {!isActive ? (
                                        <View>
                                            <Text className="text-3xl font-bold text-dark">
                                                {ticker[
                                                    ticker.length - 1
                                                ]?.price.toFixed(2)}
                                                €
                                            </Text>
                                            <Text className="text-base text-gray">
                                                Today
                                            </Text>
                                        </View>
                                    ) : (
                                        <View>
                                            <AnimatedTextInput
                                                editable={false}
                                                underlineColorAndroid={
                                                    'transparent'
                                                }
                                                className="text-3xl font-bold text-dark"
                                                animatedProps={animatedText}
                                            ></AnimatedTextInput>
                                            <AnimatedTextInput
                                                underlineColorAndroid={
                                                    'transparent'
                                                }
                                                className="text-base text-gray"
                                                animatedProps={animatedDate}
                                            ></AnimatedTextInput>
                                        </View>
                                    )}
                                    <CartesianChart
                                        chartPressState={state}
                                        axisOptions={{
                                            font,
                                            tickCount: 5,
                                            labelOffset: { x: -2, y: 0 },
                                            labelColor: '#3D38ED',
                                            formatYLabel: (v) => `${v} €`,
                                            formatXLabel: (ms) =>
                                                format(new Date(ms), 'MM/yy'),
                                        }}
                                        data={ticker}
                                        xKey="timestamp"
                                        yKeys={['price']}
                                    >
                                        {({ points }) => (
                                            <>
                                                {isActive && (
                                                    <Tooltip
                                                        x={state.x.position}
                                                        y={
                                                            state.y?.price
                                                                .position
                                                        }
                                                    />
                                                )}

                                                <Line
                                                    color="#3D38ED"
                                                    points={points?.price}
                                                    strokeWidth={3}
                                                />
                                            </>
                                        )}
                                    </CartesianChart>
                                </>
                            ) : null}
                        </View>
                        <View className="m-4">
                            <Text className="text-xl font-bold mt-5 text-black">
                                Overview
                            </Text>
                            <Text className="text-gray mt-1 leading-5git">
                                {data?.description}
                            </Text>
                        </View>
                    </>
                )}
            ></SectionList>
        </>
    );
};
export default Page;
