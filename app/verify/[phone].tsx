import { defaultStyles } from '@/constants/Styles';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import {
	CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
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
        if (code.length === 0) {
            verifySignIn();
        }
        verifyCode();
    }, []);
    const verifyCode = async () => {};
    const verifySignIn = async () => {};
    return (
        <View style={[defaultStyles.container]}>
            <Text style={[defaultStyles.header]}>6-digit code</Text>
            <Text style={[defaultStyles.descriptionText]}>
                Code sent to {phone} unless you already have an account
            </Text>
			<CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />
            <Link href={'/login'} replace asChild></Link>
        </View>
    );
};
export default Page;
