import { useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
const LockScreen = () => {
    const { user } = useUser();
    const [code, setCode] = useState<number[]>([]);
    const [firstName, setFirstName] = useState(user?.firstName);
    const router = useRouter();
    const codeLength = Array(6).fill(0);
    const offset = useSharedValue(0);
    const style = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: offset.value,
                },
            ],
        };
    });
    const OFFSET = 20;
    const TIME = 80;
    const onBiometricPress = async () => {
        const { success } = await LocalAuthentication.authenticateAsync();
        if (success) {
            router.replace('/(authenticated)/(tabs)/home');
        } else {
            offset.value = withSequence(
                withTiming(-OFFSET, { duration: TIME / 2 }),
                withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
                withTiming(0, { duration: TIME / 2 }),
            );
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };
    const onNumberPress = (number: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCode([...code, number]);
    };
    const numberBackSpace = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCode(code.slice(0, -1));
    };
    useEffect(() => {
        if (code.length === 6) {
            // ! hardcoded pwd
            if (code.join('') === '123456') {
                router.replace('/(authenticated)/(tabs)/home');
                setCode([]);
            } else {
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error,
                );
                setCode([]);
            }
        }
    }, [code]);

    return (
        <SafeAreaView>
            <Text className="text-2xl font-bold mt-[20px] self-center">
                Welcome Back, {firstName}
            </Text>
            <Animated.View className="flex-row justify-around items-center gap-x-[20px] my-[100px]">
                {codeLength.map((_, index) => (
                    <View
                        key={index}
                        className={`w-12 h-12 rounded-lg${
                            code[index] ? 'bg-primary' : 'bg-lightGray'
                        }`}
                        style={style}
                    />
                ))}
            </Animated.View>
            <View className="my-20 gap-y-[60px]">
                <View className="flex-row justify-between">
                    {[1, 2, 3].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => onNumberPress(num)}
                        >
                            <Text className="text-[32px] ">{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <View className="flex-row justify-between">
                        {[4, 5, 6].map((num) => (
                            <TouchableOpacity
                                key={num}
                                onPress={() => onNumberPress(num)}
                            >
                                <Text className="text-[32px] ">{num}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-between">
                        {[7, 8, 9].map((num) => (
                            <TouchableOpacity
                                key={num}
                                onPress={() => onNumberPress(num)}
                            >
                                <Text className="text-[32px] ">{num}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-between items-center">
                        {/* //TODO: can check for type to biometric available here */}
                        <TouchableOpacity onPress={onBiometricPress}>
                            <MaterialCommunityIcons
                                name="face-recognition"
                                size={26}
                                color={'black'}
                            />
                            <Image
                                src={require('@/assets/images/Face_ID-logo.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onNumberPress(0)}>
                            <Text className="text-[32px] ">0</Text>
                        </TouchableOpacity>

                        <View className="min-w-[33%]">
                            <TouchableOpacity
                                onPress={
                                    code.length > 0
                                        ? numberBackSpace
                                        : undefined
                                }
                            >
                                <MaterialCommunityIcons
                                    name="backspace-outline"
                                    size={26}
                                    color={`${
                                        code.length > 0 ? 'black' : '#A6A6A6'
                                    }`}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default LockScreen;
