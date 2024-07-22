import React from 'react';
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import RowContainer from '../RowContainer/RowContainer';

interface Props {
    /**
    *  Texto
    */
    textValue: string;
    /**
    *  Icono
    */
    icon: string;

    iconColor?: string;

    iconSize?: number;

    textStyle?: StyleProp<TextStyle>;

    onHandleClickIconindex: () => void;
}

const IconButtonTextRow = ({ textValue, icon, iconColor, iconSize, textStyle, onHandleClickIconindex }: Props) => (
    <RowContainer alignMode='flex-start' gap={2}>
        <Text variant='titleMedium' style={textStyle} numberOfLines={6}>{textValue}</Text>
        <IconButton icon={icon} iconColor={iconColor} size={iconSize} onPress={() => onHandleClickIconindex}></IconButton>
    </RowContainer>
);


export default IconButtonTextRow;


