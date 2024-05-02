import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from 'expo-secure-store';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryProvider = new QueryClient();
const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    },
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        if (!isLoaded) return;

        const inAuthGroup = segments[0] === '(authenticated)';

        if (isSignedIn && !inAuthGroup) {
            router.replace('/(authenticated)/(tabs)/home');
        } else if (!isSignedIn) {
            router.replace('/');
        }
    }, [isSignedIn]);

    if (!loaded || !isLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color={'#3D38ED'} />
            </View>
        );
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
                    headerStyle: { backgroundColor: '#f5f5f5' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={'#141518'}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="login"
                options={{
                    title: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#f5f5f5' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={'#141518'}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <Link href={'/help'} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color={'#141518'}
                                />
                            </TouchableOpacity>
                        </Link>
                    ),
                }}
            />

            <Stack.Screen
                name="help"
                options={{ title: 'Help', presentation: 'modal' }}
            />

            <Stack.Screen
                name="verify/[phone]"
                options={{
                    title: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#f5f5f5' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={'#141518'}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="(authenticated)/(tabs)"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(authenticated)/crypto/[id]"
                options={{
                    title: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={'#141518'}
                            />
                        </TouchableOpacity>
                    ),
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerRight: () => (
                        <View className="flex-row gap-3">
                            <TouchableOpacity>
                                <Ionicons
                                    name="notifications-outline"
                                    className="text-dark"
                                    size={30}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="star-outline"
                                    className="text-dark"
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack>
    );
};

const RootLayoutNav = () => {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <QueryClientProvider client={queryProvider}>
                <ClerkProvider
                    publishableKey={CLERK_PUBLISHABLE_KEY!}
                    tokenCache={tokenCache}
                >
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <StatusBar style="light" />
                        <InitialLayout />
                    </GestureHandlerRootView>
                </ClerkProvider>
            </QueryClientProvider>
        </ApplicationProvider>
    );
};

export default RootLayoutNav;
const data = {
    category: 'coin',
    contract_address: [],
    date_added: '2010-07-13T00:00:00.000Z',
    date_launched: '2010-07-13T00:00:00.000Z',
    description:
        'Bitcoin (BTC) is a cryptocurrency launched in 2010. Users are able to generate BTC through the process of mining. Bitcoin has a current supply of 19,693,128. The last known price of Bitcoin is 59,012.82223349 USD and is up 3.38 over the last 24 hours. It is currently trading on 11023 active market(s) with $41,147,852,850.34 traded over the last 24 hours. More information can be found at https://bitcoin.org/.',
    id: 1,
    infinite_supply: false,
    is_hidden: 0,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    name: 'Bitcoin',
    notice: '',
    platform: null,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    self_reported_tags: null,
    slug: 'bitcoin',
    subreddit: 'bitcoin',
    symbol: 'BTC',
    'tag-groups': [
        'OTHERS',
        'ALGORITHM',
        'ALGORITHM',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'CATEGORY',
        'PLATFORM',
        'CATEGORY',
    ],
    'tag-names': [
        'Mineable',
        'PoW',
        'SHA-256',
        'Store Of Value',
        'State Channel',
        'Coinbase Ventures Portfolio',
        'Three Arrows Capital Portfolio',
        'Polychain Capital Portfolio',
        'Binance Labs Portfolio',
        'Blockchain Capital Portfolio',
        'BoostVC Portfolio',
        'CMS Holdings Portfolio',
        'DCG Portfolio',
        'DragonFly Capital Portfolio',
        'Electric Capital Portfolio',
        'Fabric Ventures Portfolio',
        'Framework Ventures Portfolio',
        'Galaxy Digital Portfolio',
        'Huobi Capital Portfolio',
        'Alameda Research Portfolio',
        'a16z Portfolio',
        '1Confirmation Portfolio',
        'Winklevoss Capital Portfolio',
        'USV Portfolio',
        'Placeholder Ventures Portfolio',
        'Pantera Capital Portfolio',
        'Multicoin Capital Portfolio',
        'Paradigm Portfolio',
        'Bitcoin Ecosystem',
        'FTX Bankruptcy Estate ',
    ],
    tags: [
        'mineable',
        'pow',
        'sha-256',
        'store-of-value',
        'state-channel',
        'coinbase-ventures-portfolio',
        'three-arrows-capital-portfolio',
        'polychain-capital-portfolio',
        'binance-labs-portfolio',
        'blockchain-capital-portfolio',
        'boostvc-portfolio',
        'cms-holdings-portfolio',
        'dcg-portfolio',
        'dragonfly-capital-portfolio',
        'electric-capital-portfolio',
        'fabric-ventures-portfolio',
        'framework-ventures-portfolio',
        'galaxy-digital-portfolio',
        'huobi-capital-portfolio',
        'alameda-research-portfolio',
        'a16z-portfolio',
        '1confirmation-portfolio',
        'winklevoss-capital-portfolio',
        'usv-portfolio',
        'placeholder-ventures-portfolio',
        'pantera-capital-portfolio',
        'multicoin-capital-portfolio',
        'paradigm-portfolio',
        'bitcoin-ecosystem',
        'ftx-bankruptcy-estate',
    ],
    twitter_username: '',
    urls: {
        announcement: [],
        chat: [],
        explorer: [
            'https://blockchain.info/',
            'https://live.blockcypher.com/btc/',
            'https://blockchair.com/bitcoin',
            'https://explorer.viabtc.com/btc',
            'https://www.oklink.com/btc',
        ],
        facebook: [],
        message_board: ['https://bitcointalk.org'],
        reddit: ['https://reddit.com/r/bitcoin'],
        source_code: ['https://github.com/bitcoin/bitcoin'],
        technical_doc: ['https://bitcoin.org/bitcoin.pdf'],
        twitter: [],
        website: ['https://bitcoin.org/'],
    },
};
