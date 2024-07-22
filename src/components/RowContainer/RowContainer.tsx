import { View, ViewStyle, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
    /**
    *  Alineacion de los elementos internos del contenedor
    */
    alignMode: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | undefined;

    children: React.ReactNode;

    gap?: number;

    customStyle?: ViewStyle;
}

const RowContainer = ({ alignMode, children, gap, customStyle }: Props) => (
    <View style={[styles.rowContainer, { alignContent: alignMode, gap: gap }, customStyle]}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        gap: 5
    }
});

export default RowContainer;