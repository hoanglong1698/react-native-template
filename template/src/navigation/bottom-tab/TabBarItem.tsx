import { Text, useWindowDimensions, View } from 'react-native';

interface Props {
  icon: string;
  label: string;
  color: string;
  focused: boolean;
}

const TabBarItem = ({ icon, label, color, focused }: Props) => {
  const { width: widthDevice } = useWindowDimensions();

  return (
    <View className="flex-1 items-center justify-center  gap-0.5" style={{ width: widthDevice / 5 }}>
      <Text allowFontScaling={false} style={{ color }}>
        {icon}
      </Text>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={{ color }}
        className={`text-[10px] ${focused ? 'font-semibold' : 'font-normal'}`}>
        {label}
      </Text>
    </View>
  );
};

export default TabBarItem;
