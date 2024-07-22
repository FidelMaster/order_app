import React, { useState, useEffect, version, useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { MD3Colors, Card, Divider, List, Dialog, Text, Modal, Portal, IconButton } from 'react-native-paper';
import { sendCollection } from '../../services/api/collection-order-service';
import MessageModal from '../../components/MessageModal/MessageModal';
import Button from '../../components/Button/Button';
import ColumnContainer from '../../components/ColumnContainer/ColumnContainer';
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import RowContainer from '../../components/RowContainer/RowContainer';

interface ModalButton {
    text: string;
    onPress: () => void;
}

interface ModalState {
    title: string;
    description: React.ReactNode;
    icon?: React.ReactNode;
    buttonAction?: ModalButton[];
}

const DistributionOrderScannScreen = ({ route, navigation }) => {
    const [data, setData] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);
    const [IdDetail, setIdDetail] = useState<number>(0);
    const [detailOrder, setDetailOrder] = useState();
    const [modalState, setModalState] = useState<ModalState>({
        title: '',
        description: '',
        icon: undefined,
        buttonAction: undefined,
    });
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [trackingCode, setTrackingCode] = React.useState("");
    const barCodeInputRef = useRef<TextInput>(null);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const hideAlert = () => setShowAlert(false);

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    useEffect(() => {
        const { params } = route;
        let id = params.data.Id;
        console.log(params.data);
        setDetailOrder(params.data)
        setIdDetail(id)
        setData([])

        barCodeInputRef.current?.focus();
    }, []);


    const handleChangeCodeBar = (value: string) => {
        setTrackingCode(value)
        const isExist = data.includes(value);

        if (!isExist && value.trim().length >= 7) {
            const newData = [...data, value];
            setData(newData)

            setTrackingCode('');

            if (barCodeInputRef.current) {
                barCodeInputRef.current.focus();
            }
        }
    }

    const handleRemoveCode = (index: number) => {
        // Crea una copia del array de documentos
        const updatedDocuments = [...data];
        // Elimina el documento en la posición especificada
        updatedDocuments.splice(index, 1);
        // Actualiza el estado con la nueva lista de datos
        setData(updatedDocuments);
    };

    const handleSubmit = async () => {
        // showModal();
        if (data.length == 0) {
            return;
        }
        navigation.navigate('DistributionOrderReview', {
            data: {
                id: IdDetail,
                orderInfo: detailOrder,
                data: data
            }
        });
    }

    const handleSendData = async () => {
        let buttonList = [];
        buttonList.push(
            {
                text: 'Entiendo',
                onPress: hideAlert
            }
        );

        try {
            let collectionData = {
                IdOrderDetail: IdDetail,
                TrackingCodes: data
            }

            let request = await sendCollection(collectionData);

            if (request.success) {
                hideModal()
                setData([])

                handleShowAlert(
                    'Aviso',
                    'Los datos se han procesado de forma satisfactoria',
                    <Dialog.Icon icon='information-outline' color='green' />,
                    buttonList
                );
            }
        } catch (error) {
            console.log(error)
            handleShowAlert(
                'Notificacion',
                'Ha ocurrido un error, si el problema persiste reporte con un administrador',
                <Dialog.Icon icon='information-outline' color='green' />,
                buttonList
            );
        }
    }

    const handleShowAlert = (title: string, description: string, icon: any, buttonAction?: Array<any>) => {
        setModalState({
            title,
            description,
            icon,
            buttonAction
        })

        setShowAlert(true)
    }

    return (
        <SafeView>
            <ScreenHeader title={`Escaneo Entrega`} goBackEvent={() => navigation.goBack()} />

            <MessageModal
                description={modalState.description}
                title={modalState.title}
                showModal={showAlert}
                onDismiss={hideAlert}
                icon={modalState.icon}
                actionButtons={modalState.buttonAction}
            >
            </MessageModal>

            <ColumnContainer alignMode='flex-start' gap={3}>
                <TextInput
                    ref={barCodeInputRef}
                    value={trackingCode}
                    focusable={true}
                    onChangeText={text => handleChangeCodeBar(text)}
                    selectTextOnFocus={true}
                    placeholder='Escriba un codigo de trakcing'
                />

                <Card style={styles.card} >
                    <Card.Content>
                        <ColumnContainer alignMode='flex-start' gap={3}>
                            <Text variant="titleLarge" style={[{ color: '#6B6A74' }]}>{detailOrder?.Customer} -  Total Entregado {data.length} de {detailOrder?.TotalItem}</Text>
                            <Button title='Enviar Entrega' onPress={() => handleSubmit()} />
                        </ColumnContainer>
                    </Card.Content>
                </Card>

                {
                    data.length > 0 ? (
                        data.map((item, index) => {
                            return (
                                <List.Item
                                    key={index}
                                    title="Codigo Tracking:"
                                    description={item}
                                    right={props => <IconButton
                                        icon='delete'
                                        iconColor={MD3Colors.error50}
                                        size={30}
                                        onPress={() => handleRemoveCode(index)}
                                    />}
                                />
                            )
                        })

                    ) : (
                        <EmptyDataLabel />
                    )
                }
            </ColumnContainer>
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
    button: {
        width: 150
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 0,
        elevation: 0

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

export default DistributionOrderScannScreen;