import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ColorsType } from '@/contexts';
import { useThemedStyles } from '@/hooks';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top }} />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.primary,
    },
    header: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.textColor,
    },
  });
};
