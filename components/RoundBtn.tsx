import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
interface RoundBtnProps {
    text?: string;
    icon?: typeof Ionicons.defaultProps;
    onPress?: () => void;
}
const RoundBtn: React.FC<RoundBtnProps> = ({ text, icon, onPress }) => {
    return (
        <TouchableOpacity
            style={[defaultStyles.container]}
            className="items-center gap-[10px] "
            onPress={onPress}
        >
			<View className='w-16 h-16 rounded-full bg-slate-300 justify-center items-center'>

            <Ionicons name={icon} size={24} color="black" />
			</View>
            <Text className="text-sm">{text}</Text>
        </TouchableOpacity>
    );
};
export default RoundBtn;
