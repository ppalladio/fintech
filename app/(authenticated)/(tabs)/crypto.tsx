import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
const CryptoPage = () => {
    const headerHeight = useHeaderHeight();
    const currencies = useQuery({
        queryKey: ['currencies'],
        queryFn: () => fetch('/api/v1/listings').then((res) => res.json()),
    });
    // console.log({...currencies.data[0].quote});
    const ids = currencies.data?.map((currency: any) => currency.id).join(',');
    const { data } = useQuery({
        queryKey: ['info', ids],
        queryFn: () =>
            fetch(`/api/v1/info?ids=${ids}`).then((res) => res.json()),
        enabled: !!ids, // only enable is id is truthy
    });
    console.log(ids);
    return (
        <ScrollView
            className="bg-background"
            contentContainerStyle={{ paddingTop: headerHeight }}
        >
            <Text style={[defaultStyles.sectionHeader]}>Latest Crypto</Text>
            <View style={[defaultStyles.block]}>
                {currencies.data?.map((currency: any, index: string) => (
                    <Link
                        href={`/crypto/${currency.id}`}
                        key={currency.id}
                        asChild
                    >
                        <TouchableOpacity className="flex-row gap-4 items-center justify-center">
                            <Text className="font-semibold text-xl text-gray">
                                {index + 1}
                            </Text>
                            <Image
                                source={{
                                    uri: data?.[currency.id]?.logo as string,
                                }}
                                className="w-8 h-8 rounded-full"
                            />
                            <View className="flex-1 gap-2">
                                <Text className="font-semibold text-dark">
                                    {currency.name}
                                </Text>
                                <Text className="text-gray">
                                    {currency.name}
                                </Text>
                            </View>
                            <View className="items-end justify-center">
                                <Text>
                                    {currency.quote.EUR.price.toFixed(2)}€
                                </Text>

                                <View className="flex-row gap-x-1">
                                    {currency.quote.EUR.percent_change_24h.toFixed(
                                        2,
                                    ) > 0 ? (
                                        <Ionicons
                                            name="caret-up"
                                            size={16}
                                            color={'green'}
                                        />
                                    ) : (
                                        <Ionicons
                                            name="caret-down"
                                            size={16}
                                            color={'red'}
                                        />
                                    )}
                                    <Text
                                        className={`${
                                            currency.quote.EUR
                                                .percent_change_24h > 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }`}
                                    >
                                        {currency.quote.EUR.percent_change_24h.toFixed(
                                            2,
                                        )}
                                        % (1h)
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
};
export default CryptoPage;
