import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, PermissionsAndroid } from 'react-native';
import { MD3Colors, Card, Divider, Dialog, Text, Modal, Portal, IconButton } from 'react-native-paper';
// Custom Components
import Button from '../../components/Button/Button';
import ColumnContainer from '../../components/ColumnContainer/ColumnContainer';
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import ImageButton from '../../components/ImageButton/ImageButton';
import IconButtonTextRow from '../../components/IconButtonTextRow/IconButtonTextRow';
import MessageModal from '../../components/MessageModal/MessageModal';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import RowContainer from '../../components/RowContainer/RowContainer';
import LoadingElement from '../../components/LoadingElement/LoadingElement';
// interfaces
import { imageProps, ModalButton } from '../../types/interfaces/api.interface';
// services
import { sendCollection } from '../../services/api/collection-order-service';
// external library
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getFormatFromFileName } from '../../utils/file';

interface packageInformationProps {
    trackingCode: string,
    image?: imageProps
}

interface ModalState {
    title: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    buttonAction?: ModalButton[];
}

const CollectionOrderScannScreen = ({ route, navigation }) => {
    const [data, setData] = useState<Array<packageInformationProps>>([]);
    const [loading, setLoading] = useState(false); 
    const [IdDetail, setIdDetail] = useState<number>(0);
    const [detailOrder, setDetailOrder] = useState();
    const [modalState, setModalState] = useState<ModalState>({
        title: '',
        description: undefined,
        icon: undefined,
        buttonAction: undefined,
    });
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [text, setText] = React.useState("");
    
    const barCodeInputRef = useRef<TextInput>(null);

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
        try {
            setText(value);
            if (value.trim().length == 7) {
                const newDataItem = { trackingCode: value, image: null }; // Crear el nuevo objeto con el valor proporcionado y una imagen nula
                const newData = [...data, newDataItem]; // Agregar el nuevo objeto al arreglo existente
                setData(newData); // Actualizar el estado con el nuevo arreglo

                setText(''); // Limpiar el valor del texto

                if (barCodeInputRef.current) {
                    barCodeInputRef.current.focus(); // Enfocar en el siguiente input
                }
            }
        } catch (error) {
            console.log('error:')
            console.log(error)
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

    const SendDataElement = () => {
        return (
            <ColumnContainer alignMode='center' gap={2}>
                <Text variant="titleMedium">Favor verificar el resumen de la recoleccion</Text>
                <Divider style={{ height: 1 }} />
                <Text>Codigo de Orden: {detailOrder?.IdOrder}</Text>
                <Text>Cliente: {detailOrder?.Customer}</Text>
                <Text style={{ fontWeight: 'bold' }}>Total Por Recolectar: {detailOrder?.TotalItem}</Text>
                <Text style={{ fontWeight: 'bold' }}>Total Recolectado: {data.length}</Text>
                <Text variant="titleMedium">¿La informacion es correcta?</Text>
                <RowContainer alignMode='flex-start' gap={2} >
                    <Button title='Cancelar' style={[styles.button, { backgroundColor: '#FEE8EA' }]} textStyle={{ color: '#FBA5AA' }} onPress={() => hideAlert()} />
                    <Button title='Enviar' style={[styles.button]} onPress={() => handleSendData()} />
                </RowContainer>
            </ColumnContainer>
        )
    }


    const handleSubmit = async () => {
        handleShowAlert(
            'Envio',
            SendDataElement(),
            <Dialog.Icon icon='information' color='yellow' />,
            []
        );
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
            hideAlert();
            setLoading(true);

            let collectionData = {
                IdOrderDetail: IdDetail,
                LstPackages: data
            }

            let request = await sendCollection(collectionData);

            if (request.success) {
                setData([])
                handleShowAlert(
                    'Aviso',
                    <Text>Los datos se han procesado de forma satisfactoria</Text>,
                    <Dialog.Icon icon='information' color='green' />,
                    buttonList
                );
            } else {
                handleShowAlert(
                    'Aviso',
                    <Text>Ha ocurrido un error al procesar la informacion.</Text>,
                    <Dialog.Icon icon='information-outline' color='green' />,
                    buttonList
                );
            }

            setLoading(false);
            setShowAlert(true);
        } catch (error) {
            console.log(error)
            setLoading(false);
            handleShowAlert(
                'Aviso',
                <Text>Ha ocurrido un error al procesar la informacion.</Text>,
                <Dialog.Icon icon='information-outline' color='green' />,
                buttonList
            );
            setShowAlert(true)
        }
    }



    const handleShowAlert = (title: string, description: React.ReactNode, icon: any, buttonAction?: Array<any>) => {
        setModalState({
            title,
            description,
            icon,
            buttonAction
        })

        setShowAlert(true);
    }

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleChoosePhoto = (index: any) => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {

                let imageData = response.assets?.[0]
                if (imageData) {
                    let uri = imageData?.uri;
                    let fileName = imageData?.fileName;
                    let base64String = imageData?.base64;
                    let type = imageData?.type
                    let format = getFormatFromFileName(fileName);
                    let source = `data:${type};base64,${base64String}`
                    console.log(base64String)
                    updateImageInCurrent(index, `${uri}`, base64String, format)
                }
            }

        })
    }

    const handleCameraLaunch = (index: any) => {
        requestCameraPermission().then();
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            console.log(response)
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageData = response.assets?.[0]
                console.log(imageData)

                if (imageData) {
                    let uri = imageData?.uri;
                    let fileName = imageData?.fileName;
                    let base64String = imageData?.base64;
                    let type = imageData?.type
                    let format = getFormatFromFileName(fileName);
                    let source = `data:${type};base64,${base64String}`

                    console.log(base64String)
                    updateImageInCurrent(index, `${uri}`, base64String, format)
                }

            }
        });
    }

    const handleRemoveFile = (index: any) => {
        updateRemoveImageInCurrent(index)
    }

    const updateRemoveImageInCurrent = (index: number) => {
        // Actualizar el objeto en el arreglo 'data' en el índice dado
        setData(prevData => {
            return prevData.map((item, idx) => {
                if (idx === index) {
                    // Si el índice coincide, actualizar el objeto con la nueva imagen
                    return {
                        ...item,
                        image: null
                    };
                }
                return item; // Mantener los demás objetos sin cambios
            });
        });
    }

    const updateImageInCurrent = (index: number, source: string, base64: any, format: string) => {
        // Actualizar el objeto en el arreglo 'data' en el índice dado
        setData(prevData => {
            return prevData.map((item, idx) => {
                if (idx === index) {
                    // Si el índice coincide, actualizar el objeto con la nueva imagen
                    return {
                        ...item,
                        image: {
                            base64: base64,
                            source: source,
                            format: format
                        }
                    };
                }
                return item; // Mantener los demás objetos sin cambios
            });
        });
    }

    return (
        <SafeView>
            <ScreenHeader title={`Recoleccion - ${detailOrder?.Customer}`} goBackEvent={() => navigation.goBack()} />
            <MessageModal
                description={modalState.description}
                title={modalState.title}
                showModal={showAlert}
                onDismiss={hideAlert}
                icon={modalState.icon}
                actionButtons={modalState.buttonAction}
            >
            </MessageModal>

            {
                loading ? <LoadingElement /> : (

                    <ColumnContainer alignMode='flex-start' gap={3}>
                        <Text>Codigo Tracking:</Text>
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
                                    <Text variant="titleLarge" style={[{ color: '#6B6A74' }]}>  Total Recolectado {data.length} de {detailOrder?.TotalItem}</Text>
                                    <Button title='Enviar Recoleccion' onPress={() => handleSubmit()} />
                                </ColumnContainer>
                            </Card.Content>
                        </Card>

                        {
                            data.length > 0 ? (
                                data.map((item, index) => {
                                    const { trackingCode, image } = item;

                                    return (
                                        <ColumnContainer key={index} alignMode='flex-start' gap={2} customStyle={{ margin: 10 }}>
                                            <IconButtonTextRow textValue={trackingCode} icon='delete' iconSize={30} iconColor={MD3Colors.error50} onHandleClickIconindex={() => handleRemoveCode(index)} />

                                            <ColumnContainer alignMode='flex-start' gap={2}>
                                                <Button style={{ backgroundColor: '#223E67' }} title='Elegir Imagen' onPress={() => { handleChoosePhoto(index) }} />
                                                <Button style={{ backgroundColor: '#223E67' }} title='Hacer Foto' onPress={() => { handleCameraLaunch(index) }} />
                                            </ColumnContainer>
                                            <RowContainer alignMode='flex-start' gap={2}>
                                                {
                                                    item.image ? (
                                                        <ImageButton
                                                            customStyle={styles.imageContainer}
                                                            imageSource={item.image?.source}
                                                            iconName='delete'
                                                            iconColor={MD3Colors.error50}
                                                            index={index}
                                                            handleClick={() => { handleRemoveFile(index) }}
                                                        />

                                                    ) : <View />
                                                }
                                            </RowContainer>
                                        </ColumnContainer>
                                    )
                                })
                            ) : (
                                <EmptyDataLabel />
                            )
                        }

                    </ColumnContainer>
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
    }, imageContainer: {
        margin: 5,
        overflow: 'hidden',
        borderRadius: 8,
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

export default CollectionOrderScannScreen;