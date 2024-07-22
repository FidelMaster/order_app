import React from "react"
import { Text, View, StyleSheet } from 'react-native';

interface Props {
    customText?: string;
}

const EmptyDataLabel = ({
    customText
}: Props): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text variant='titleSmall' style={styles.text}>
                {customText || 'No hay información para mostrar.'}
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        margin: 10
    }
});

export default EmptyDataLabel;