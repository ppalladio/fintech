import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';
import { ChevronLeft, CircleHelp } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const InitialLayout = () => {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });
    const router = useRouter();
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="signup"
                options={{
                    title: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#F5F5F5' },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.back;
                            }}
                        >
                            <ChevronLeft className="text-black p-2" />
                        </TouchableOpacity>
                    ),
                }}
            />{' '}
            <Stack.Screen
                name="login"
                options={{
                    title: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#F5F5F5' },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.back;
                            }}
                        >
                            <ChevronLeft className="text-black p-2" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <Link href={'/help'} asChild>
                            <TouchableOpacity>
                                <CircleHelp className="text-red-400 p-2" />
                            </TouchableOpacity>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen
                name="help"
                options={{ title: 'Help', presentation: 'modal' }}
            />
        </Stack>
    );
};

function RootLayoutNav() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <InitialLayout />
        </GestureHandlerRootView>
    );
}

export default RootLayoutNav;
