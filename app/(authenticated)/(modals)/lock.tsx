import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocalAuthentication from 'expo-local-authentication';
const LockScreen = () => {
    const { user } = useUser();
    const [code, setCode] = useState<number[]>([]);
    const [firstName, setFirstName] = useState(user?.firstName);
    const onBiometricPress = async () => {
        const { success } = await LocalAuthentication.authenticateAsync();
    };
    return (
        <SafeAreaView>
            <Text className="text-2xl font-bold mt-[20px] self-center">
                Welcome Back, {firstName}
            </Text>
        </SafeAreaView>
    );
};
export default LockScreen;
