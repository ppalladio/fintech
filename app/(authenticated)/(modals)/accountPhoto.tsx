import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'expo-image-picker';
import { setAppIcon, getAppIcon } from 'expo-dynamic-app-icon';
const ICONS = [
    {
        name: 'default',
        icon: require('@/assets/images/icon.png'),
    },
    {
        name: 'dark',
        icon: require('@/assets/images/icon-dark.png'),
    },
    {
        name: 'colored',
        icon: require('@/assets/images/icon-vivid.png'),
    },
];
const AccountPhotoPage = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [edit, setEdit] = useState(false);
    const [activeIcon, setActiveIcon] = useState('default');
    useEffect(() => {
        const loadIconPref = async () => {
            const icon = await getAppIcon();
            setActiveIcon(icon);
        };
        loadIconPref();
    }, []);

    const onSaveUser = async () => {
        try {
            await user?.update({ firstName: firstName!, lastName: lastName! });
            setEdit(false);
        } catch (error) {
        } finally {
            setEdit(false);
        }
    };
    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
            base64: true,
        });
        if (!result.canceled) {
            const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
            user?.setProfileImage({
                file: base64,
            });
        }
    };
    const onChangeAppIcon = async (icon: string) => {
        await setAppIcon(icon.toLowerCase());
        setActiveIcon(icon);
    };
    return (
        <BlurView
            experimentalBlurMethod="none"
            intensity={80}
            className="flex-1 bg-neutral-600 pt-[100px]"
            tint="dark"
        >
            <View className="items-center">
                <TouchableOpacity
                    onPress={onCaptureImage}
                    className="w-[100px] h-[100px] rounded-full bg-gray items-center justify-center"
                >
                    {user?.imageUrl && (
                        <Image
                            source={{ uri: user?.imageUrl }}
                            className="w-20 h-20 rounded-full bg-gray"
                        />
                    )}
                </TouchableOpacity>
                <View className="items-center">
                    {edit ? (
                        <View className="flex-row gap-3 items-center justify-center mt-5">
                            <TextInput
                                placeholder="First Name"
                                value={firstName ?? ''}
                                onChangeText={setFirstName}
                                className="w-[100px] h-10 border-[1px] border-gray rounded-lg p-2 bg-white "
                            />{' '}
                            <TextInput
                                placeholder="First Name"
                                value={lastName || ''}
                                onChangeText={setLastName}
                                className="w-[100px] h-10 border-[1px] border-gray rounded-lg p-2 bg-white "
                            />
                            <TouchableOpacity onPress={() => onSaveUser}>
                                <Ionicons
                                    name="checkmark-outline"
                                    color={'#fff'}
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="flex-row gap-3 items-center justify-center mt-5">
                            <Text>
                                {firstName} {lastName}
                            </Text>
                            <TouchableOpacity onPress={() => setEdit(true)}>
                                <Ionicons
                                    name="ellipsis-horizontal"
                                    color={'#fff'}
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            <View>
                {ICONS.map((icon) => (
                    <TouchableOpacity
                        key={icon.name}
                        onPress={() => onChangeAppIcon(icon.name)}
                    >
                        <Image source={icon.icon} className="w-5 h-6" />
                        <Text className="text-white text-5">{icon.name}</Text>

                        {activeIcon.toLowerCase() ===
                            icon.name.toLowerCase() && (
                            <Ionicons name="checkmark-outline" color={'#fff'} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </BlurView>
    );
};
export default AccountPhotoPage;
