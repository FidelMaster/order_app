import React from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Image, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../components/Button/Button';

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{
            backgroundColor: 'white',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
        }}>
            <View style={styles.columnContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={
                        require('../../assets/images/driver_image.png')
                    }
                />
                <Text variant='titleLarge' style={styles.text}>Bienvenido</Text>
                <Text variant='bodyMedium' style={styles.subText}> {"Gracias por tu dedicación. Estamos aquí para ayudarte a gestionar y completar las órdenes de manera eficiente y efectiva."}</Text>
                <Button style={styles.button} title='CONTINUAR'   onPress={() => navigation.navigate('Login')}  ></Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F44B03',
        color: 'white',
        height: 60,
        width: 160
    },
    columnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 'auto',
        gap: 10
    },
    tinyLogo: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    text: {
        color: '#25417B',
        fontSize: 30,
        marginTop: 10,
        fontWeight: 'bold'
    },
    subText: {
        color: '#25417B',
        fontSize: 20,
        margin: 20,
        textAlign: 'center'
    }
});

export default WelcomeScreen;