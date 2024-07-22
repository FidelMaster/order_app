import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Divider, Drawer, Text } from 'react-native-paper';

const themePaper = {
    colors: {
        onSurfaceVariant: '#152846',
    }
}

function CustomDrawer({ ...props }) {

    const drawerItems = [
        { label: 'Alertas Activas', onPress: () => props.navigation.navigate('Alert', { type: 'current' }) },
        { label: 'Otros casos abiertos', onPress: () => props.navigation.navigate('AlertHistory', { type: 'history' }) },
        { label: 'Preguntas Frecuentes', onPress: () => props.navigation.navigate('FAQ') },
        { label: 'Contactos', onPress: () => props.navigation.navigate('Contact') },
    ];

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={styles.tinyLogo}
                    source={
                        require('../../assets/images/Isotipo-Cargo-Veloz.png')
                    }
                />
            </View>
            <Divider></Divider>
            {drawerItems.map((item) => (
                <Drawer.Section key={item.label} title="">
                    <Drawer.Item
                        icon=""
                        label={item.label}
                        theme={themePaper}
                        onPress={item.onPress}
                    />
                </Drawer.Section>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 110,
        height: 60,
        resizeMode: 'stretch'
    },
    logo: {
        width: 66,
        height: 58,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    caption: {
        fontSize: 14,
        marginTop: 0,
    },
    drawerContent: {
        flex: 1,
    },
    drawerSection: {
        marginTop: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    title: {
        fontSize: 16,
        // marginTop: 3,
        fontWeight: 'bold',
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingTop: 20,
    }
});


export default CustomDrawer;