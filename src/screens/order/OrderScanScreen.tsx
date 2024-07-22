import React, { useState, useEffect, useRef } from 'react';
import { View, RefreshControl, Dimensions, SafeAreaView, ScrollView, StyleSheet, TextInput, } from 'react-native';
import { ActivityIndicator, MD3Colors, MD2Colors, Card, Divider, List, Dialog, Text, Modal, Portal, IconButton } from 'react-native-paper';
import { sendOrderToTransit } from '../../services/api/order-service';
import LoadingElement from '../../components/LoadingElement/LoadingElement';
import MessageModal from '../../components/MessageModal/MessageModal';
import Button from '../../components/Button/Button';
import ColumnContainer from '../../components/ColumnContainer/ColumnContainer';
//import BarCodeScann from '../../components/BarCodeScanner/BarCodeScanner';
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import OrderCard from '../../components/OrderCard/OrderCard';
import SafeView from '../../components/SafeView/SafeView';
import RowContainer from '../../components/RowContainer/RowContainer';
import { CollectionDataRequest } from '../../types/interfaces/api.interface';

interface PackageCollect {
    TrackingCode: string,
    ReceiveDate: string
}

const OrderScannScreen = ({ route, navigation }) => {
    const [data, setData] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalDescription, setModalDescription] = useState<string>('');
    const [modalIcon, setModalIcon] = useState();
    const [modalButtonAction, setModalButtonAction] = useState<any>();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [text, setText] = React.useState("");
    const barCodeInputRef = useRef<TextInput>(null);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const hideAlert = () => setShowAlert(false);

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    useEffect(() => {
        const { params } = route;
        setData([])

        barCodeInputRef.current?.focus();
    }, []);

    const handleChangeCodeBar = (value: string) => {
        setText(value)
        const isExist = data.includes(value);
        if (!isExist && value.length == 6) {
            const newData = [...data, value];
            setData(newData)
            setText('')
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
        showModal();
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
            if (data.length == 0) {
                return;
            }

            setIsLoading(true)

            let collectionData: Array<PackageCollect> = [];

            data.forEach(element => {
                collectionData.push(
                    {
                        TrackingCode: element,
                        ReceiveDate: new Date().toISOString()
                    }
                )
            });

            let requestData = {
                Data: collectionData
            }

            let request = await sendOrderToTransit(requestData);

            if (request.success) {
                hideModal()
                setData([])
                handleShowAlert(
                    'Aviso',
                    'Los datos se han procesado de forma satisfactoria',
                    <Dialog.Icon icon='information-outline' color='green' />,
                    buttonList
                );
            }else{
                handleShowAlert(
                    'Aviso',
                    'Ha ocurrido un error, si el problema persiste reporte con un administrador',
                    <Dialog.Icon icon='information-outline' color='green' />,
                    buttonList
                );
            }

            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            handleShowAlert(
                'Aviso',
                'Ha ocurrido un error, si el problema persiste reporte con un administrador',
                <Dialog.Icon icon='information-outline' color='green' />,
                buttonList
            );

        }
    }

    const SendDataElement = () => {
        return (
            <ColumnContainer alignMode='center' gap={2}>
                <Text variant="titleMedium">Favor verificar el resumen de la recoleccion</Text>
                <Divider style={{ height: 1 }} />
                <Text style={{ fontWeight: 'bold' }}>Total Recolectado: {data.length}</Text>
                <Text variant="titleMedium">¿La informacion es correcta?</Text>
                <RowContainer alignMode='flex-start' gap={2} >
                    <Button title='Cancelar' style={[styles.button, { backgroundColor: '#FEE8EA' }]} textStyle={{ color: '#FBA5AA' }} onPress={() => hideModal()} />
                    <Button title='Enviar' style={[styles.button]} onPress={() => handleSendData()} />
                </RowContainer>
            </ColumnContainer>
        )
    }

    const handleShowAlert = (title: string, description: string, icon: any, buttonAction?: Array<any>) => {
        setModalTitle(title)
        setModalDescription(description)
        setModalIcon(icon)
        setModalButtonAction(buttonAction)
        setShowAlert(true)
    }

    return (
        <SafeView>
            {isLoading ? <LoadingElement /> : (
                <View>
                    <MessageModal
                        description={modalDescription}
                        title={modalTitle}
                        showModal={showAlert}
                        onDismiss={hideAlert}
                        icon={modalIcon}
                        actionButtons={modalButtonAction}
                    >
                    </MessageModal>

                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            {SendDataElement()}
                        </Modal>
                    </Portal>

                    <ColumnContainer alignMode='flex-start' gap={3}>
                        <TextInput
                            ref={barCodeInputRef}
                            value={text}
                            focusable={true}
                            onChangeText={text => handleChangeCodeBar(text)}
                            selectTextOnFocus={true}
                            placeholder='Escriba un codigo de trakcing'
                        />

                        <Card style={styles.card} >
                            <Card.Content>
                                <ColumnContainer alignMode='flex-start' gap={3}>
                                    <Text variant="titleLarge" style={[{ color: '#6B6A74' }]}>Recolectando desde CEDI</Text>
                                    <Text variant="titleLarge" style={[{ color: '#6B6A74' }]}>Total Recolectado {data.length}</Text>
                                    <Button title='Marcar En Transito' onPress={() => handleSubmit()} />
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
                </View>
            )

            }

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

export default OrderScannScreen;