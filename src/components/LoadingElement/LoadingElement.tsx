
import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { MD2Colors } from 'react-native-paper';

import ColumnContainer from '../ColumnContainer/ColumnContainer';

const LoadingElement = () => {
    return (
        <ColumnContainer alignMode='center' customStyle={{ height: Dimensions.get('window').height }}>
            <ActivityIndicator size={50} animating={true} color={MD2Colors.red800} />
        </ColumnContainer>
    )
}

export default LoadingElement;