import { BlurView } from 'expo-blur';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const CustomHeader = () => {
    const { top } = useSafeAreaInsets();
    return (
        <BlurView
            intensity={80}
            tint="extraLight"
            style={{
                paddingTop: top,
            }}
        >
            <View
                style={[]}
                className="flex-row justify-center items-center h-[60px] gap-x-[10px] bg-transparent py-5 mx-[1px]"
            >
                <Link href={'/(authenticated)/(modals)/accountPhoto'} asChild>
                    <TouchableOpacity className="w-10 h-10 rounded-3xl bg-gray justify-center items-center">
                        <Text
                            className="text-white font-medium text-base"
                            style={[]}
                        >
                            US
                        </Text>
                    </TouchableOpacity>
                </Link>

                <View className="flex-1 flex-row bg-lightGray rounded-3xl justify-center items-center pl-3">
                    <Ionicons
                        name="search"
                        size={20}
                        className="text-dark m-4"
                    />
                    <TextInput
                        className="h-10 border-gray flex-1 p-[10px,10px,10px,0] text-dark"
                        placeholderTextColor={'#626D77'}
                        placeholder="Search"
                    />
                </View>
                <View className="w-10 h-10 rounded-full bg-lightGray justify-center items-center">
                    <Ionicons
                        name="stats-chart"
                        size={20}
                        className="text-dark"
                    />
                </View>
                <View className="w-10 h-10 rounded-full bg-lightGray justify-center items-center">
                    <Ionicons name="card" size={20} className="text-dark" />
                </View>
            </View>
        </BlurView>
    );
};
export default CustomHeader;
