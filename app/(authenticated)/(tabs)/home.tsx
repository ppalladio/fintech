import { View, Text, ScrollView } from 'react-native';
const Home = () => {
    const staticBalance = 1321;
    return (
        <ScrollView className="bg-background">
            <View className="m-[80px] align-center">
                <View className="flex flex-row items-baseline justify-center">
                    <Text className="text-[60px] font-bold">{staticBalance}</Text>
                    <Text className='text-[30px] ml-2 font-semibold'>€</Text>
                </View>
            </View>
			<View>
				
			</View>
        </ScrollView>
    );
};
export default Home;
