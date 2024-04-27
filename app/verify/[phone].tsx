import { defaultStyles } from '@/constants/Styles';
import {
    isClerkAPIResponseError,
    useAuth,
    useSignIn,
    useSignUp,
} from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const Page = () => {
    const { phone, signin } = useLocalSearchParams<{
        phone: string;
        signin: string;
    }>();
    const { signIn } = useSignIn();
    const { signUp, setActive } = useSignUp();
    const [code, setCode] = useState('');
    const CELL_COUNT = 6;
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });
    useEffect(() => {
        if (code.length === 6) {
            console.log(code);
            if (signin === 'true') {
                verifySignIn();
            } else {
                verifyCode();
            }
        }
    }, [code]);

   
    const verifyCode = async () => {
        try {
            await signUp!.attemptPhoneNumberVerification({
                code,
            });
            await setActive!({ session: signUp!.createdSessionId });
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };
    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy: 'phone_code',
                code,
            });
            await setActive!({ session: signIn!.createdSessionId });
        } catch (error) {
            if (isClerkAPIResponseError(error)) {
                Alert.alert('Error', error.errors[0].message);
            }
        }
    };
    return (
        <View style={[defaultStyles.container]}>
            <Text style={[defaultStyles.header]}>6-digit code</Text>
            <Text style={[defaultStyles.descriptionText]}>
                Code sent to {phone} unless you already have an account
            </Text>
            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Fragment key={index}>
                        <View
                            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                            onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            className={`w-[45px] h-[60px] justify-center items-center bg-lightGray !rounded-2xl, ${
                                isFocused ? 'pb-0' : ''
                            }`}
                        >
                            <Text className=" text-black text-[36px] text-center">
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                        {index === 2 ? (
                            <View
                                key={`separator-${index}`}
                                className="h-[2px] w-[10px] bg-gray self-center"
                            />
                        ) : null}
                    </Fragment>
                )}
            />
            <Link href={'/login'} replace asChild>
                <TouchableOpacity>
                    <Text style={[defaultStyles.textLink]}>
                        Already have an account? Log in
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};
const styles = StyleSheet.create({
    codeFieldRoot: {
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 12,
    },
});
export default Page;
