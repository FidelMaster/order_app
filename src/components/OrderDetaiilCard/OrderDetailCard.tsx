import React, { useEffect, useState } from 'react';
import { View, StyleSheet, AnimatableStringValue } from 'react-native';
import { Avatar, Chip, Icon, Card, Text, Divider } from 'react-native-paper';
import { formatDateDDMMYYYY } from '../../utils/date';
import Button from '../Button/Button';
import ColumnContainer from '../ColumnContainer/ColumnContainer';
import RowContainer from '../RowContainer/RowContainer';
import IconTextRow from '../IconTextRow/IconTextRow';

interface ReportCardProps {
    buttonText: string;
    Customer: string;
    Address: string;
    Municipality: string;
    Phone: string;
    TotalItem: Number;
    TotalWeigth: Number;
    IsComplete: boolean;
    onViewDetail: () => void;
    onCall?: () => void;
    onViewPackages: ()=> void;
}

const OrderDetailCard: React.FC<ReportCardProps> = ({ Customer, Address,buttonText, Municipality, Phone, TotalItem, TotalWeigth, IsComplete, onViewDetail, onCall , onViewPackages}) => {

    const stateLabel = () => {
        let label = IsComplete ? 'Completado' : 'Pendiente';
        let backgroudColor = IsComplete ? '#EDF9E8' : '#FEF3E7';
        let labelColor = IsComplete ? '#A3D6BA' : ''
        return 
    }
    return (
        <Card style={styles.card} >
            <Card.Content>
                <ColumnContainer alignMode='flex-start' gap={5}>

                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.title}>{Customer}</Text>
                    </ColumnContainer>

                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.text}>Municipio:</Text>
                        <IconTextRow iconColor='#020D19' label={Municipality} icon='map-marker' textStyle={styles.valueText}></IconTextRow>
                    </ColumnContainer>

                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.text}>Direccion de Recoleccion:</Text>
                        <IconTextRow iconColor='#020D19' label={Address} icon='map-marker' textStyle={styles.valueText}></IconTextRow>
                    </ColumnContainer>

                    <RowContainer alignMode='flex-start' gap={10} >
                        <ColumnContainer alignMode='flex-start' gap={2}>
                            <Text style={styles.text}># Bultos</Text>
                            <IconTextRow iconColor='#020D19' label={TotalItem} icon='inbox' textStyle={styles.valueText}></IconTextRow>
                        </ColumnContainer>

                        <ColumnContainer alignMode='flex-start' gap={2}>
                        <Chip style={{ backgroundColor: IsComplete ? '#EDF9E8' : '#FEF3E7' }}  >{IsComplete ? 'Completado' : 'Pendiente'}</Chip>
                        </ColumnContainer>

                    </RowContainer>
                    
                    <Button onPress={() => (onCall && onCall())} title='Llamar' style={[styles.button, { backgroundColor: '#3FEA46' }]} />
                    <Divider style={styles.divider} />
                    <RowContainer alignMode='flex-end' gap={3}>
                        <Button onPress={onViewPackages} title='Ver Paquetes' style={[styles.button]} />
                        <Button onPress={onViewDetail} title={buttonText} style={[styles.button, { backgroundColor: '#F44B03' }]} />
                    </RowContainer>
                </ColumnContainer>
            </Card.Content>

        </Card >
    );
};


const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#223E67'
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
    button: {
        width: 150
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
    divider: {
        margin: 10,
        height: 2
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
    title: {
        color: '#020D19',
        fontWeight: 'bold'
    },
    text: {
        color: '#A2A1A6',
        fontWeight: 'normal',
        fontSize: 15
    },
    valueText: {
        fontWeight: 'normal',
        fontSize: 15,
        color: 'black'
    },
    input: {
        borderBottomWidth: 1,
        paddingVertical: 3,
        width: 50,
        textAlign: 'center',
    },
});

export default OrderDetailCard;
