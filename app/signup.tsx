import { defaultStyles } from '@/constants/Styles';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    TextInput,
} from 'react-native';
const SignUp = () => {
    const [countryCode, setCountryCode] = useState('+34');
    const [phoneNumber, setPhoneNumber] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
    const router = useRouter();
    const { signUp } = useSignUp();
    const onSignUp = async () => {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        router.push({
            pathname: '/verify/[phone]',
            params: { phone: fullPhoneNumber },
        });
        // try {
        //     await signUp!.create({
        //         phoneNumber: fullPhoneNumber,
        //     });
        //     router.push({
        //         pathname: '/verify/[phone]',
        //         params: { phone: fullPhoneNumber },
        //     });
        // } catch (error) {
        //     console.log('error sign up:' + error);
        // }
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <View style={defaultStyles.container}>
                <Text style={defaultStyles.header}>Let's get started!</Text>
                <Text style={defaultStyles.descriptionText}>
                    Enter your phone number. We will send you a confirmation
                    code there
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

                <Link href={'/login'} replace asChild>
                    <TouchableOpacity>
                        <Text style={defaultStyles.textLink}>
                            Already have an account? Log in
                        </Text>
                    </TouchableOpacity>
                </Link>

                <View style={{ flex: 1 }} />

                <TouchableOpacity
                    style={[defaultStyles.pillButton]}
                    // TODO change to dynamic according to the country of phone number
                    className={`${
                        phoneNumber !== '' ? 'bg-primary' : 'bg-primaryMuted'
                    } mb-5 `}
                    onPress={onSignUp}
                >
                    <Text style={defaultStyles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
export default SignUp;
