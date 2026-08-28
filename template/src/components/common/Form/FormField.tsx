import React, { useEffect } from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import { useFormScrollContext } from '@/contexts';

interface FormFieldProps {
  name: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const FormField: React.FC<FormFieldProps> = ({ name, children, style }) => {
  const { registerField, unregisterField } = useFormScrollContext();

  useEffect(() => {
    return () => {
      unregisterField(name);
    };
  }, [name, unregisterField]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { y } = event.nativeEvent.layout;
    registerField(name, y);
  };

  return (
    <View onLayout={handleLayout} style={style}>
      {children}
    </View>
  );
};

export default FormField;
