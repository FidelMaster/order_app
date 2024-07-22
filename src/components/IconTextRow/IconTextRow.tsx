import React from 'react';
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import RowContainer from '../RowContainer/RowContainer';

interface Props {
    /**
    *  Texto
    */
    label: string | Number;
    /**
    *  Icono
    */
    icon: string;

    iconColor?: string;

    textStyle?: StyleProp<TextStyle>;
}

const IconTextRow = ({ label, icon, iconColor, textStyle }: Props) => (
    <RowContainer alignMode='flex-start'>
        <Icon source={icon} color={iconColor} size={16}></Icon>
        <Text variant='bodySmall' style={textStyle} numberOfLines={6}>{label}</Text>
    </RowContainer>
);


 

export default IconTextRow;