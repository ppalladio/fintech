import { View, Text, TouchableOpacity } from 'react-native';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';
const Page = () => {
    const [vod] = useAssets([require('@/assets/videos/intro.mp4')]);
	// console.log(vod)
    return (
        <View className="flex-1 justify-between mx-2">
            {vod && (
                <Video
                    shouldPlay
                    isMuted
                    isLooping
                    resizeMode={ResizeMode.COVER}
                    source={{ uri: vod[0].uri }}
                    className="w-[100%] h-[100%] absolute"
                />
            )}
            <View className="mt-[60px] p-2">
                <Text className="text-[36px] font-bold uppercase text-white">
                    Welcome to the app
                </Text>
            </View>
            <View className="flex mb-[60px] flex-row justify-center gap-[20px]">
                <Link
                    href="/login"
                    className="flex items-center justify-center px-4 h-16 rounded-full flex-1 bg-dark"
                    asChild
                >
                    <TouchableOpacity>
                        <Text className="text-white text-[22px] font-semibold">
                            Log in
                        </Text>
                    </TouchableOpacity>
                </Link>
                <Link
                    href={'/signup'}
                    className="flex items-center justify-center px-4 h-16 rounded-full flex-1 bg-white"
                    asChild
                >
                    <TouchableOpacity>
                        <Text className="text-black text-[22px] font-semibold ">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};
export default Page;
