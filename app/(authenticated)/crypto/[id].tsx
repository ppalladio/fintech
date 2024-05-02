import { Stack, useLocalSearchParams } from 'expo-router';
import {
    View,
    Text,
    ScrollView,
    SectionList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
const categories = ['Overview', 'News', 'Orders', 'Transactions'];

const Page = () => {
    const { id } = useLocalSearchParams();
    const headerHeight = useHeaderHeight();
    const [activeIndex, setActiveIndex] = useState(0);
    console.log('id', id);
    const { data } = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/v1/info?ids=${id}`).then((res) =>
                res.json(),
            );
            return info[+id];
        },
    });
    // console.log(data);

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
                        <View className="h-[500px] bg-slate-400"></View>
                        <View className='m-4'>
                            <Text className="text-xl font-bold mt-5 text-black">
                                Overview
                            </Text>
                            <Text className="text-gray mt-1 leading-5">
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
