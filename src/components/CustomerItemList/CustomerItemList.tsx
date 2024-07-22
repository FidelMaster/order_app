import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, Card, Text } from 'react-native-paper';
import { formatDateDDMMYYYY } from '../../utils/date';
import Button from '../Button/Button';
import ColumnContainer from '../ColumnContainer/ColumnContainer';
import RowContainer from '../RowContainer/RowContainer';
import IconTextRow from '../IconTextRow/IconTextRow';

interface ReportCardProps {
    id: number;
    customer_category_id: number;
    identification: string;
    name: string;
    credit_limit: number;
    credit_available: number;
    current_balance: number;
    contact_dni: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    address: string;
    phone: string;
    is_tax_exemption: boolean;
    createdAt: string;
    updatedAt: string;
    onViewDetail: () => void;
    onCall: () => void;
}

const CustomerItemList: React.FC<ReportCardProps> = ({
    id,
    customer_category_id,
    identification,
    name,
    credit_limit,
    credit_available,
    current_balance,
    contact_dni,
    contact_name,
    contact_phone,
    contact_email,
    address,
    phone,
    is_tax_exemption,
    createdAt,
    updatedAt,
    onViewDetail,
    onCall
}) => {

    return (
        <Card style={styles.card} >
            <Card.Content>
                <ColumnContainer alignMode='flex-start' gap={5}>

                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.text}>Nombre:</Text>
                        <IconTextRow iconColor='#020D19' label={name} icon='information' textStyle={styles.valueText}></IconTextRow>
                    </ColumnContainer>

                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.text}>Direccion de Recoleccion:</Text>
                        <IconTextRow iconColor='#020D19' label={address} icon='map-marker' textStyle={styles.valueText}></IconTextRow>
                    </ColumnContainer>

                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.text}>Correo:</Text>
                        <IconTextRow iconColor='#020D19' label={contact_email} icon='email' textStyle={styles.valueText}></IconTextRow>
                    </ColumnContainer>

                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.text}>Telefono:</Text>
                        <IconTextRow iconColor='#020D19' label={contact_phone} icon='phone' textStyle={styles.valueText}></IconTextRow>
                    </ColumnContainer>

                    <Button onPress={() => (onCall && onCall())} title='Llamar' style={[ { backgroundColor: '#3FEA46' }]} />

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
    text: {
        color: '#A2A1A6',
        fontWeight: 'normal',
        fontSize: 15
    },
    valueText: {
        fontWeight: 'normal',
        fontSize: 15,
        color: 'black',
        width: '60%'
    },
    input: {
        borderBottomWidth: 1,
        paddingVertical: 3,
        width: 50,
        textAlign: 'center',
    },
});

export default CustomerItemList;
