import { View, Text, ScrollView } from 'react-native';
import RoundBtn from '@/components/RoundBtn';
import { Dropdown } from '@/components/Dropdown';
import { useBalanceStore } from '@/store/balanceStore';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@ui-kitten/components';
const Home = () => {
    const { balance, runTransaction, transactions, clearTransactions } =
        useBalanceStore();
    const reversedTransactions = [...transactions].reverse();
    const onAddMoney = () => {
        runTransaction({
            id: Math.random().toString(),
            amount:
                Math.floor(Math.random() * 1000) *
                (Math.random() > 0.5 ? 1 : -1),
            date: new Date(),
            title: 'Added Money',
        });
    };
    return (
        <ScrollView className="bg-background">
            <View className="m-[80px] align-center">
                <View className="flex flex-row items-baseline justify-center">
                    <Text className="text-[60px] font-bold">{balance()}</Text>
                    <Text className="text-[30px] ml-2 font-semibold">€</Text>
                </View>
            </View>
            <View className="flex flex-row mx-auto items-center justify-center">
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
            <View className=" p-[10px] bg-zinc-300 rounded-2xl gap-5">
                {transactions.length === 0 && (
                    <Text className="text-slate-300 p-3">
                        No Transactions Yet
                    </Text>
                )}
                {reversedTransactions.map((transaction) => (
                    <View key={transaction.id}>
                        <View className="flex flex-row gap-x-3 items-center mb-1">
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
                            <View>
                                <Text className="font-semibold">
                                    {transaction.title}
                                </Text>
                                <Text className="text-slate-500 text-sm">
                                    {transaction.date.toLocaleString()}
                                </Text>
                            </View>
                            <View>
                                <Text>{transaction.amount}</Text>
                            </View>
                        </View>
                        <Divider />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};
export default Home;
