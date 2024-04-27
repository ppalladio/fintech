import { View, Text, ScrollView } from 'react-native';
import RoundBtn from '@/components/RoundBtn';
import { Dropdown } from '@/components/Dropdown';
const Home = () => {
    const onAddMoney = () => {};
    const staticBalance = 1321;
    return (
        <ScrollView className="bg-background">
            <View className="m-[80px] align-center">
                <View className="flex flex-row items-baseline justify-center">
                    <Text className="text-[60px] font-bold">
                        {staticBalance}
                    </Text>
                    <Text className="text-[30px] ml-2 font-semibold">€</Text>
                </View>
            </View>
            <View className="flex flex-row mx-auto items-center justify-center">
                <RoundBtn icon="add" text="Add Money" onPress={onAddMoney} />
                <RoundBtn icon="refresh" text="Exchange"  />
                <RoundBtn icon="list" text="Details"  />
                <Dropdown/>
            </View>
        </ScrollView>
    );
};
export default Home;
