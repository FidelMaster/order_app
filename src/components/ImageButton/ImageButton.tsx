import React from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import RowContainer from '../RowContainer/RowContainer';

interface Props {
    /**
    * Posicion o llave unica
    */
    index: string | number;

    /**
    * Nombre de la clase para el icono
    */
    iconName: string;

    /**
    * Color del icono
    */
    iconColor: string;

    /**
     *   Direccion de la imagen
     */
    imageSource: string

    /**
    * Funcion Callback para manejo del evento click
    */
    handleClick: (index:any) => void;

    /**
    * Estilos personalizados del contenedor
    */ 
    customStyle?: ViewStyle;
}

const ImageButton = ({
    index,
    imageSource,
    iconName,
    iconColor,
    handleClick,
    customStyle

}: Props): JSX.Element => {

    return (
        <RowContainer alignMode='flex-start' customStyle={customStyle}>
            <Image
                key={index}
                source={{ uri: imageSource }}
                style={styles.imageElement}
            />

            <IconButton
                icon={iconName}
                iconColor={iconColor}
                size={50}
                onPress={() => handleClick(index)}
            />
        </RowContainer>
    );
};

const styles = StyleSheet.create({
    imageElement: {
        width: 100,
        height: 100
    }
});


export default ImageButton;