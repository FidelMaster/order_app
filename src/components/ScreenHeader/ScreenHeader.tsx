import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Searchbar, Card, Divider, List, Icon, Text, IconButton } from 'react-native-paper';
import RowContainer from '../RowContainer/RowContainer';

interface Props {
    title: string;
    goBackEvent?: () => void;
}

const ScreenHeader = ({ title, goBackEvent }: Props) => {
    return (
        <Card style={styles.card} >
            <Card.Content>
                <RowContainer alignMode='flex-start'>
                    {goBackEvent ? <IconButton icon='keyboard-backspace' onPress={() => goBackEvent()} /> : true}
                    <Text variant="titleMedium" style={styles.textTitle}>{title}</Text>
                </RowContainer>
            </Card.Content>
        </Card>

    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 0,
        elevation: 0,
    },
    textTitle: { 
        color: '#020D19', 
        fontWeight: 'bold', 
        alignSelf: 'center' 
    }
});

export default ScreenHeader;