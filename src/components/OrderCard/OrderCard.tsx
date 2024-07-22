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
    customer_id: number;
    customer_address_id: number;
    seller_id: number;
    user_id: number;
    customer_name: string;
    description: string;
    exchange_rate: number;
    seller_commision_amount: number;
    total_item: number;
    total_tax: number;
    total_discount: number;
    sub_total: number;
    total_order: number;
    state: string;
    estimated_delivery_date: string; // Usar Date si se desea trabajar con objetos de fecha
    createdAt: string; // Usar Date si se desea trabajar con objetos de fecha
    updatedAt: string; // Usar Date si se desea trabajar con objetos de fecha
    onViewDetail: () => void;
}

const OrderCard: React.FC<ReportCardProps> = ({
    id,
    customer_id,
    customer_address_id,
    seller_id,
    user_id,
    customer_name,
    description,
    exchange_rate,
    seller_commision_amount,
    total_item,
    total_tax,
    total_discount,
    sub_total,
    total_order,
    state,
    estimated_delivery_date,
    createdAt,
    updatedAt, onViewDetail }) => {


    return (
        <Card style={styles.card} >
            <Card.Content>
                <ColumnContainer alignMode='flex-start' gap={5}>
                    <RowContainer alignMode='flex-start' gap={10} >
                        <ColumnContainer alignMode='flex-start' gap={2}>
                            <Text style={styles.text}>Codigo Orden:</Text>
                            <IconTextRow iconColor='#020D19' label={id} icon='information' textStyle={styles.valueText}></IconTextRow>
                        </ColumnContainer>

                    </RowContainer>
                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.text}>Cliente:</Text>
                        <Text style={styles.valueText}>{customer_name}</Text>
                    </ColumnContainer>
                    <ColumnContainer alignMode='flex-start' gap={2}>
                        <Text style={styles.text}>Fecha Estimada Entrega:</Text>

                        <IconTextRow iconColor='#020D19' label={formatDateDDMMYYYY(estimated_delivery_date)} icon='calendar' textStyle={styles.valueText}></IconTextRow>
                    </ColumnContainer>
                    <RowContainer alignMode='flex-start' gap={10} >
                        <ColumnContainer alignMode='flex-start' gap={2}>
                            <Text style={styles.text}>Total Items</Text>
                            <IconTextRow iconColor='#020D19' label={total_item} icon='inbox' textStyle={styles.valueText}></IconTextRow>
                        </ColumnContainer>

                        <ColumnContainer alignMode='flex-start' gap={2}>
                            <Text style={styles.text}>Total</Text>

                            <IconTextRow iconColor='#020D19' label={total_order} icon='information' textStyle={styles.valueText}></IconTextRow>
                        </ColumnContainer>

                    </RowContainer>

                    <Button onPress={onViewDetail} title='Ver Detalle' />
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

export default OrderCard;
