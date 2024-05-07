import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { View, Text, AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
    id: 'inactivity-storage',
});
export const UserInactivityProvider = ({ children }: any) => {
    const appState = useRef(AppState.currentState);
    const router = useRouter();
    const { isSignedIn } = useAuth();
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            handleAppStateChange,
        );
        return () => {
            subscription.remove();
        };
    }, []);
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        if (nextAppState === 'background') {
            recordStartTime();
        } else if (
            nextAppState === 'active' &&
            appState.current.match(/background/)
        ) {
            const timeElapsed =
                Date.now() - (storage.getNumber('startTime') ?? 0);
            console.log(timeElapsed);
            //TODO: timer set to 3s for testing
            if (timeElapsed > 3000 && isSignedIn) {
                router.replace('/(authenticated)/(modals)/lock');
            }
        }
        appState.current = nextAppState;
    };

    const recordStartTime = () => {
        storage.set('startTime', Date.now());
    };
    return children;
};
