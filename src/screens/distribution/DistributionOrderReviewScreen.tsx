import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Image, } from 'react-native';
import { ActivityIndicator, MD2Colors, List, Dialog, Text } from 'react-native-paper';
import { sendDistribution } from '../../services/api/distribution-order-service';
import MessageModal from '../../components/MessageModal/MessageModal';
import Button from '../../components/Button/Button';
import ColumnContainer from '../../components/ColumnContainer/ColumnContainer';
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import SignaturePad from '../../components/SignaturePad/SignaturePad';
import LoadingElement from '../../components/LoadingElement/LoadingElement';
import Stepper from '../../components/Stepper/Stepper';

import { ModalButton } from '../../types/interfaces/api.interface';

interface OrderProps {
    data: Array<string>;
    setVisibleSignature: Dispatch<SetStateAction<boolean>>;
}

interface ModalState {
    title: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    buttonAction?: ModalButton[];
}

const OrderResume = ({ data, setVisibleSignature }: OrderProps) => {
    return (
        <View>
            <Text>Favor verificar que los codigos descritos a continuacion coincidan con los codigo de tracking brindados:</Text>
            {data.length > 0 ? (
                data.map((item, index) => {
                    return (
                        <List.Item
                            key={index}
                            title="Codigo Tracking:"
                            description={item}

                        />
                    )
                })

            ) : (
                <EmptyDataLabel />
            )
            }

            <Button title='Confirmar Entrega' onPress={() => setVisibleSignature(true)} />
        </View>
    )
}

const DistributionOrderReviewScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[]>([]);
    const [signature, setSignature] = useState<string>('');
    const [visibleSignature, setVisibleSignature] = useState(false);
    const [IdDetail, setIdDetail] = useState<number>(0);
    const [detailOrder, setDetailOrder] = useState();
    const [modalState, setModalState] = useState<ModalState>({
        title: '',
        description: undefined,
        icon: undefined,
        buttonAction: undefined,
    });
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const hideAlert = () => setShowAlert(false);

    useEffect(() => {
        const { params } = route;
        let id = params.data.id;
        setDetailOrder(params.data.orderInfo)
        setIdDetail(id)
        setData(params.data.data)
    }, []);


    const handleShowAlert = (title: string, description: React.ReactNode, icon: any, buttonAction?: Array<any>) => {
        setModalState({
            title,
            description,
            icon,
            buttonAction
        })

        setShowAlert(true);
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
            setLoading(true);

            let collectionData = {
                IdOrderDetail: IdDetail,
                TrackingCodes: data,
                SignatureFileBase64: signature
            }

            let request = await sendDistribution(collectionData);

            if (request.success) {
                setData([])

                handleShowAlert(
                    'Entregado',
                    <Text>Los datos se han procesado de forma satisfactoria</Text>,
                    <Dialog.Icon icon='information-outline' color='green' />,
                    [
                        {
                            text: 'Entendido',
                            onPress: () => navigation.navigate('DistributionOrderList')
                        }
                    ]
                );

            } else {
                handleShowAlert(
                    'Atencion',
                    <Text>Ha ocurrido un error, si el problema persiste reporte con un administrador'</Text>,
                    <Dialog.Icon icon='information' color='red' />,
                    buttonList
                );
            }

            setLoading(false);
        } catch (error) {
            console.log(error)

            setLoading(false);

            handleShowAlert(
                'Atencion',
                <Text>'Ha ocurrido un error, si el problema persiste reporte con un administrador'</Text>,
                <Dialog.Icon icon='information-outline' color='red' />,
                buttonList
            );

        }
    }


    const handleONOK = (value: string) => {
        setSignature(value)
    }

    const handleClear = () => {
        setSignature("")
    }

    return (
        <SafeView>
            <ColumnContainer alignMode='flex-start' gap={3}>
                <ScreenHeader title={`${detailOrder?.Customer}`} goBackEvent={() => navigation.goBack()} />
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
                    loading ? <LoadingElement /> :
                        visibleSignature ?
                            (
                                <View>
                                    {
                                        signature ?
                                            (
                                                <ColumnContainer alignMode='flex-start' gap={2}>
                                                    <Button title='Marcar Entrega' onPress={handleSendData} />

                                                    <Button title='Cancelar' onPress={() => setSignature('')} />

                                                    <Image
                                                        resizeMode={"contain"}
                                                        style={{ width: 335, height: 114 }}
                                                        source={{ uri: signature }}
                                                    />
                                                </ColumnContainer>
                                            ) :
                                            <View>
                                                <Text>Firma Aqui:</Text>
                                                <SignaturePad
                                                    onOK={handleONOK}
                                                    onHandleClear={handleClear}
                                                    text={signature}
                                                    imgHeight={400}
                                                    imgWidth={300}
                                                ></SignaturePad>
                                            </View>
                                    }

                                </View>
                            ) : <OrderResume data={data} setVisibleSignature={setVisibleSignature} />

                }

            </ColumnContainer>
        </SafeView>
    );
}

export default DistributionOrderReviewScreen;