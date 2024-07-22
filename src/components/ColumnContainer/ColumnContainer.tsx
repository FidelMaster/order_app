import { View, StyleSheet, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
    /**
    *  Alineacion de los elementos internos del contenedor
    */
    alignMode: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | undefined;

    children: React.ReactNode;

    gap?: number;

    customStyle?: ViewStyle
}

const ColumnContainer = ({ alignMode, children, customStyle, gap }: Props) => (
    <View style={[styles.columnContainer, { alignContent: alignMode, gap: gap }, customStyle]}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    columnContainer: {
        flexDirection: 'column',
    }
});

export default ColumnContainer;