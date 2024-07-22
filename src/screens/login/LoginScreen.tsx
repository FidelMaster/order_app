import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import { AuthContext } from '../../context/auth/AuthContext';

import Button from '../../components/Button/Button';
import SafeView from '../../components/SafeView/SafeView';
import LoadingElement from '../../components/LoadingElement/LoadingElement';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, isSuccess, login } = useContext(AuthContext);

    return (
        <SafeView>
            {isLoading ? (<LoadingElement />) :
                <View style={[styles.columnContainer, { margin: 20, height: '100%' }]}>
                    <Text style={[styles.text]}>Inicio de Sesion</Text>
                    <Text style={[styles.subText]}>Accede a tu cuenta</Text>
                    <View style={[{ alignItems: 'center', height: 100 }]}>
                        <Image
                            style={styles.tinyLogo}
                            source={
                                require('../../assets/images/logo_nortena.jpg')
                            }
                        />
                    </View>

                    {
                        !isSuccess ?
                            <View>
                                <Text style={[{ fontSize: 20, color: 'red' }]}>Ha ocurrido un error, intente nuevamente</Text>
                            </View> : ''
                    }

                    <View style={[styles.columnContainer, { width: '100%' }]}>
                        <Text style={[{ fontSize: 20 }]}>Correo Electrónico:</Text>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry
                            right={<TextInput.Icon icon="email" color='#A2A1A6' />}
                            accessibilityLabel='Correo de contacto'
                            placeholder='tucorreo@prueba.com...'
                            inputMode='email'
                            textColor='black'
                            placeholderTextColor='#A2A1A6'
                            activeOutlineColor='#C3C2CB'
                            outlineColor='#A2A1A6'
                            mode='outlined'
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />

                        <Text style={[{ fontSize: 20 }]}>Contraseña:</Text>
                        <TextInput
                            style={styles.textInput}
                            textContentType='password'
                            right={<TextInput.Icon icon="account-lock" color='#A2A1A6' />}
                            accessibilityLabel='Introdusca su contraseña '
                            placeholder='Introduzca su contraseña '
                            inputMode='text'
                            textColor='black'
                            placeholderTextColor='#A2A1A6'
                            activeOutlineColor='#C3C2CB'
                            outlineColor='#A2A1A6'
                            mode='outlined'
                            secureTextEntry
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />

                        <Button
                            style={[styles.button, { alignSelf: 'center' }]}
                            title='ENTRAR'
                            textStyle={{ fontSize: 20 }}
                            onPress={() => { login(email, password) }}
                        />
                    </View>
                </View>
            }
        </SafeView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3FEA46',
        color: 'white',
        height: 60,
        width: 300
    },
    column: {
        flexDirection: 'column',
        gap: 10,
        marginTop: 10
    },
    columnContainer: {
        flexDirection: 'column',
        width: 'auto',
        gap: 15
    },
    center: {
        alignSelf: 'center'
    },
    centerContainer: {
        alignItems: 'center'
    },
    tinyLogo: {
        width: 300,
        height: 100,
        resizeMode: 'contain'
    },
    text: {
        color: '#25417B',
        fontSize: 30,
    },
    textInput: {
        backgroundColor: 'white',
        color: '#152846',
        width: '100%'
    },
    subText: {
        color: '#7E7E7E',
        fontSize: 20,
    }
});

export default LoginScreen;