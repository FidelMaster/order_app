import React from "react";
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, ActivityIndicator } from "react-native";

interface ButtonProps {
    onPress: () => void;
    onLongPress?: () => void;
    title: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    activeOpacity?: number;
    loading?: boolean;
}

const Button = ({
    onPress,
    onLongPress,
    title,
    iconLeft,
    iconRight,
    style,
    textStyle,
    disabled,
    activeOpacity,
    loading,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
            activeOpacity={activeOpacity}
            style={[disabled ? styles.disabledButton : styles.button, style]}
        >
            {iconLeft ? iconLeft : null}
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            {iconRight ? iconRight : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#42a5f5",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        // Add any additional styles or override default styles here
    },
    disabledButton: {
        backgroundColor: "grey",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold'
        // Add any additional styles or override default styles here
    },
});

export default Button;