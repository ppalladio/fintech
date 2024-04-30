import { useQuery } from '@tanstack/react-query';

import { View, Text, Image } from 'react-native';
const CryptoPage = () => {
    const currencies = useQuery({
        queryKey: ['currencies'],
        queryFn: () => fetch('/api/v1/listings').then((res) => res.json()),
    });
    console.log(currencies);
    const ids = currencies.data?.map((currency: any) => currency.id).join(',');
    const { data } = useQuery({
        queryKey: ['info', ids],
        queryFn: () =>
            fetch(`/api/v1/info?ids=${ids}`).then((res) => res.json()),
        enabled: !!ids, // only enable is id is truthy
    });
    console.log(ids);
    return (
        <View>
            {currencies.data?.map((currency: any) => (
                <View key={currency.id} className="flex-row">
                    <Image
                        source={{ uri: data?.[currency.id].logo }}
                        className="w-8 h-8"
                    />
                    <Text>{currency.name}</Text>
                </View>
            ))}
        </View>
    );
};
export default CryptoPage;
