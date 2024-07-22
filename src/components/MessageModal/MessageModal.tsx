import React from "react"
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface ButtonProps {
    text: string;
    onPress: () => void | Promise<void>;
}

interface Props {
    title: string;
    description: React.ReactNode;
    icon: any;
    showModal: boolean;
    actionButtons?: ButtonProps[];
    onDismiss: () => void;
}

const MessageModal = ({
    title,
    description,
    icon,
    showModal,
    actionButtons = [],
    onDismiss
}: Props): JSX.Element => {
    return (
        <Portal>
            <Dialog visible={showModal} onDismiss={onDismiss} style={{ backgroundColor: 'white' }}>
                {icon}
                <Dialog.Title style={styles.title}>{title}</Dialog.Title>
                <Dialog.Content>
                    {description}
                </Dialog.Content>
                <Dialog.Actions>
                    {actionButtons.map((button, index) => (
                        <Button key={index} textColor="#152846" onPress={button.onPress}>{button.text}</Button>
                    ))}
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        margin: 20,
        width: '100%'
    },
    column: {
        flexDirection: 'column',
        gap: 10,
        marginTop: 10
    },
    centerItem: {
        alignItems: 'center'
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, imageContainer: {
        margin: 5,
        overflow: 'hidden',
        borderRadius: 8,
    },
    datePicker: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    title: {
        textAlign: 'center',
        color: '#152846'
    },
    description: {
        color: '#152846',
        textAlign: 'justify'
    }
});

export default MessageModal;