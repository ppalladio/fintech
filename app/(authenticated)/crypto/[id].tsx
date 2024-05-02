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
            return info;
        },
    });
    const categories = ['Overview', 'News', 'Orders', 'Transactions'];
    return (
        <>
            <Stack.Screen options={{ title: `${data?.name}` }} />
            <SectionList
                ListHeaderComponent={() => (
                    <>
                        <View className="flex-row justify-between items-center my-4">
                            <Text className="text-base font-bold mt-5 text-gray">
                                {data?.name}
                            </Text>
                            <Image
                                source={{ uri: data?.symbol }}
                                style={{ width: 60, height: 60 }}
                            />
                        </View>
                        <View className="flex-row gap-x-2 m-3">
                            <TouchableOpacity
                                style={[defaultStyles.pillButtonSmall]}
                                className="bg-primary flex-row gap-4"
                            >
                                <Ionicons name="add" size={24} color={'#fff'} />
                                <Text
                                    className="text-white"
                                    style={[defaultStyles.buttonText]}
                                >
                                    Buy
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[defaultStyles.pillButtonSmall]}
                                className="bg-primaryMuted flex-row gap-4"
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color={'#fff'}
                                />
                                <Text
                                    className="text-white"
                                    style={[defaultStyles.buttonText]}
                                >
                                    Receive
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                contentInsetAdjustmentBehavior="automatic"
                keyExtractor={(item) => item.title}
                sections={[]}
                style={{ marginTop: headerHeight }}
                renderSectionHeader={() => (
                    <ScrollView
                        horizontal={true}
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
                                    activeIndex === index ? 'bg-white' : ''
                                } p-2 items-center justify-center rounded-2xl px-3`}
                            >
                                <Text className={`${activeIndex===index?"text-black":"text-gray"} text-sm`}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                renderItem={(item) => (
					<>
                    <View className='h-[500px]'>

					</View>
					<View>
                        <Text className="text-base font-bold mt-5 text-gray">
                            subtitle
                        </Text>
                        <Text className="text-gray">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nihil quibusdam, quis sit doloremque animi
                            nisi, voluptates perferendis vero inventore
                            veritatis recusandae beatae non aliquam quae et nemo
                            sequi commodi harum!
                        </Text>
                    </View>
					</>
                )}
            ></SectionList>
        </>
    );
};
export default Page;
