import React, { useState, useContext } from 'react';
import { View, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image, Linking } from 'react-native';
import { Avatar, Button, Card, Divider, List, Icon, Text, IconButton } from 'react-native-paper';
import SafeView from '../../components/SafeView/SafeView';
import { AuthContext } from '../../context/auth/AuthContext';


const HomeScreen = ({ navigation }) => {
    const { userDataProfile, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    const handleChangeCredential = () => {

    }

    const handleScanOrder = () => {
        navigation.navigate('OrderTransit');
    }

    const items = [
        { title: 'Sincronizar Datos', description: 'sincroniza la informacion para poder trabajar offline', leftIcon: 'refresh', method: handleScanOrder },
        /*{ title: 'Cambiar Credenciales', description: 'actualiza tu clave de acceso', leftIcon: 'key', method: handleChangeCredential },*/
        { title: 'Cerrar Sesion', description: '', leftIcon: 'door', method: handleLogout },
    ];


    return (
        <SafeView>
            <Card style={styles.card} >
                <Card.Content>
                    <View style={[styles.container, styles.rowContainer]}>

                        <View style={[styles.container]}>
                            <View style={styles.rowContainer}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={
                                        require('../../assets/images/logo_nortena.jpg')
                                    }
                                />
                                <View >
                                    <Text variant="titleLarge" style={[styles.text, { fontWeight: 'bold' }]}>Fidel Hernandez </Text>
                                    <Text variant="titleSmall" style={{ color: '#6B6A74' }}>admin@gmail.com</Text>
                                </View>
                            </View>

                            {items.map((item, index) => (
                                <List.Item
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    //   titleStyle={style.text} // Assuming 'style' is available with styling $ adb -s emulator-5554 reverse tcp:3000 tcp:3000
                                    //   descriptionStyle={style.text} // Assuming 'style' is available with styling
                                    left={(props) => <List.Icon {...props} color='black' icon={item.leftIcon} />}
                                    onPress={() => { item.method() }}
                                />
                            ))}
                        </View>
                    </View>
                </Card.Content>

            </Card>
        </SafeView>
    );
}


const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#223E67'
    },
    tinyLogo: {
        width: 100,
        height: '100%',
        resizeMode: 'contain'
    },
    box: {
        flex: 1,
        height: 50,
        width: 50,
    },
    boxLabel: {
        minWidth: 80,
        padding: 8,
        marginTop: 8,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 0,
        elevation: 0,
    },
    chip: {
        backgroundColor: 'rgba(176,0,32,.2)'
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        gap: 1
    },
    label: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '100',
    },
    previewContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'aliceblue',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        gap: 5
    },
    text: {
        color: '#25417B'
    },
    input: {
        borderBottomWidth: 1,
        paddingVertical: 3,
        width: 50,
        textAlign: 'center',
    },
});

export default HomeScreen;