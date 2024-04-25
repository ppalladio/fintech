import { defaultStyles } from '@/constants/Styles';
import { Link, useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

const enum LoginType {
    PHONE,
    APPLE,
    GOOGLE,
    EMAIL,
}
const LoginIn = () => {
    const [countryCode, setCountryCode] = useState('+34');
    const [phoneNumber, setPhoneNumber] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
    const router = useRouter();
    const { signIn } = useSignIn();
    const onLoginIn = async (type: LoginType) => {
        if (type === LoginType.PHONE) {
            try {
                const fullPhoneNumber = `${countryCode}${phoneNumber}`;
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: fullPhoneNumber,
                });
                const firstPhoneFactor: any = supportedFirstFactors.find(
                    (factor: any) => {
                        return factor.type === 'phone_code';
                    },
                );
                const { phoneNumberId } = firstPhoneFactor;
                await signIn!.prepareFirstFactor({
                    strategy: 'phone_code',
                    phoneNumberId,
                });
                router.push({
                    pathname: '/verify/[phone]',
                    params: { phone: fullPhoneNumber, signin: 'true' },
                });
            } catch (error) {
                if (isClerkAPIResponseError(error)) {
                    if (error.errors[0].code === 'form_identifier_not_found') {
                        Alert.alert('Error', error.errors[0].message);
                    }
                }
            }
        }
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <View style={defaultStyles.container}>
                <Text style={defaultStyles.header}>Welcome back</Text>
                <Text style={defaultStyles.descriptionText}>
                    Sign back in with your phone number
                </Text>
                <View className="my-[40px]  flex-row w-auto">
                    <View className="w-[25%]">
                        <TextInput
                            className="text-gray bg-lightGray p-5 rounded-2xl text-[20px] mr-3 "
                            placeholder="Country code"
                            value={countryCode}
                        />
                    </View>
                    <TextInput
                        className="text-gray bg-lightGray p-5 rounded-2xl text-[20px] mr-3 flex-1"
                        placeholder="Mobile number"
                        keyboardType="numeric"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                <View style={{ flex: 1 }} />

                <TouchableOpacity
                    style={[defaultStyles.pillButton]}
                    // TODO change to dynamic according to the country of phone number
                    className={`${
                        phoneNumber !== '' ? 'bg-primary' : 'bg-primaryMuted'
                    } mb-5 `}
                    onPress={() => onLoginIn(LoginType.PHONE)}
                >
                    <Text style={defaultStyles.buttonText}>Continue</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 16,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            height: StyleSheet.hairlineWidth,
                            backgroundColor: '#141518',
                        }}
                    />
                    <Text style={{ color: '#141518', fontSize: 20 }}>or</Text>
                    <View
                        style={{
                            flex: 1,
                            height: StyleSheet.hairlineWidth,
                            backgroundColor: '#141518',
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={[defaultStyles.pillButton]}
                    className={`flex flex-row gap-x-3 mt-5 bg-white w-[100%] mx-auto `}
                    onPress={() => onLoginIn(LoginType.EMAIL)}
                >
                    <Mail className="text-black " size={20} />
                    <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
                        Sign in with Email
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[defaultStyles.pillButton]}
                    className={`flex flex-row  gap-x-3 mt-5 bg-white w-[100%] mx-auto `}
                    onPress={() => onLoginIn(LoginType.GOOGLE)}
                >
                    <Ionicons name="logo-google" size={20} />
                    <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
                        Sign in with Google account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[defaultStyles.pillButton]}
                    className={`flex flex-row gap-x-3 mt-5 bg-white w-[100%] mx-auto `}
                    onPress={() => onLoginIn(LoginType.APPLE)}
                >
                    <Ionicons name="logo-apple" size={20} />
                    <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
                        Sign in with Apple account
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
export default LoginIn;
