import { View, Text, ScrollView } from 'react-native';
import RoundBtn from '@/components/RoundBtn';
import { Dropdown } from '@/components/Dropdown';
import { useBalanceStore } from '@/store/balanceStore';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@ui-kitten/components';
import WidgetList from '@/components/SortableList/WidgetList';
const Home = () => {
    const { balance, runTransaction, transactions, clearTransactions } =
        useBalanceStore();
    const reversedTransactions = [...transactions].reverse();
    const onAddMoney = () => {
        const amount =
            Math.floor(Math.random() * 100) * (Math.random() > 0.5 ? 1 : -1);
        runTransaction({ 
            id: Math.random().toString(),
            amount,
            date: new Date(),
            title: amount > 0 ? 'Added Money' : 'Removed Money',
        });
    };
    return (
        <ScrollView className="bg-background flex-1">
            <View className="my-[50px] align-center">
                <View className="flex flex-row items-baseline justify-center">
                    <Text className="text-[60px] font-bold">{balance()}</Text>
                    <Text className="text-[30px] ml-2 font-semibold">€</Text>
                </View>
            </View>
            <View className="flex flex-row items-center justify-center">
                <RoundBtn icon="add" text="Add Money" onPress={onAddMoney} />
                <RoundBtn
                    icon="refresh"
                    text="Exchange"
                    onPress={clearTransactions}
                />
                <RoundBtn icon="list" text="Details" />
                <Dropdown />
            </View>
            <Text style={[defaultStyles.sectionHeader]} className="pb-5">
                Transaction History
            </Text>
            <View className=" bg-zinc-200 gap-5 flex justify-center">
                {transactions.length === 0 && (
                    <Text className="text-slate-500 pl-5 my-3">
                        No Transactions Yet
                    </Text>
                )}
                {reversedTransactions.map((transaction) => (
                    <View key={transaction.id}>
                        <View className="flex flex-row gap-x-3 items-center my-1 pl-5">
                            <View>
                                <Ionicons
                                    name={
                                        transaction.amount < 0
                                            ? 'remove'
                                            : 'add'
                                    }
                                    size={24}
                                    color={
                                        transaction.amount < 0 ? 'red' : 'green'
                                    }
                                />
                            </View>
                            <View className="text-center">
                                <Text className="font-semibold">
                                    {transaction.title}
                                </Text>
                                <Text className="text-slate-500 text-sm ">
                                    {transaction.date.toLocaleString()}
                                </Text>
                            </View>
                            <View className="right-3 absolute flex-row justify-center items-baseline">
                                <Text className="text-lg font-semibold">
                                    {transaction.amount}{' '}
                                </Text>
                                <Text>€</Text>
                            </View>
                        </View>
                        <Divider className="font-bold" />
                    </View>
                ))}
            </View>
			<Text style={[defaultStyles.sectionHeader]}>Widgets</Text>
			<WidgetList/>
        </ScrollView>
    );
};
export default Home;
