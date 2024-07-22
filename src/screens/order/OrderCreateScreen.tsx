import React, { useState, useEffect } from 'react';
import { View, RefreshControl, Linking, StyleSheet } from 'react-native';
import { Icon, Text, TextInput } from 'react-native-paper';
import Divider from 'react-native-paper';
// Custom Components
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';

import { Button, Chip } from 'react-native-paper';
import ColumnContainer from '../../components/ColumnContainer/ColumnContainer';
import LoadingElement from '../../components/LoadingElement/LoadingElement';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import Stepper from '../../components/Stepper/Stepper';
import { Customer, NewOrderDTO, OrderDetailDTO } from '../../types/interfaces/api.interface';
import moment from 'moment';

import { IconButton } from 'react-native-paper';
import { List, MD3Colors, Modal, Portal, } from 'react-native-paper';


import { getCustomers } from '../../services/api/customer-service';
import { sendOrder } from "../../services/api/order-service";
import { getArticles } from '../../services/api/inventory-service';
import RowContainer from '../../components/RowContainer/RowContainer';

const OrderCreateScreen = ({ navigation }) => {
    const [active, setActive] = useState(0);
    const [isFocus, setIsFocus] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [date, setDate] = useState(new Date());
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalDescription, setModalDescription] = useState<string>('');
    const [modalIcon, setModalIcon] = useState();
    const [modalButtonAction, setModalButtonAction] = useState<any>();
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [location, setLocation] = useState('');

    const [articleList, setArticleList] = useState<Array<any>>([]);

    const [articleListSelected, setArticleListSelectedDropDown] = useState<any>([]);
    const [customerList, setCustomerList] = useState<Array<Customer>>([]);

 

    const [articleId, setArticleId] = useState<any>();
    const [articleDescription, setArticleDescription] = useState<any>();
    const [articleQuantity, setArticleQuantity] = useState<any>();
    const [articlePrice, setArticlePrice] = useState<any>(0);

    const [customerSelected, setCustomerSelected] = useState<any>();
    const [customerName, setCustomerName] = useState('');
    const [observation, setObservation] = useState('');

    const [subTotal, setSubTotal] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [totalItem, setTotalItem] = useState(0.0);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showSuccessModal = () => setSuccess(true);
    const hideSuccessModal = () => setSuccess(false);


    const containerStyle = { backgroundColor: 'white', padding: 20 };

    useEffect(() => {
        loadCustomers().then();
        loadArticles().then();
    }, []);


    const loadCustomers = async () => {
        try {
            const response = await getCustomers();

            if (response.success && response.data) {
                setCustomerList(response.data)
            }

        } catch (error) {
            console.log('Error fetching alerts:', error);
        }
    };


    const loadArticles = async () => {
        try {
            const response = await getArticles();

            if (response.success && response.data) {
                setArticleList(response.data)
            }

        } catch (error) {
            console.log('Error fetching alerts:', error);
        }
    };


    const handleCustomerSelect = (id: number, clientName: string) => {
        setCustomerSelected(id)
        setCustomerName(clientName)
    }

    const handleArticleSelect = (article: any) => {
        const {
            article_id,
            article_code,
            article_description,
            price
        } = article;

        setArticleDescription(article_description);
        setArticlePrice(price.toString());
        setArticleId(article_id);
        setArticleQuantity(0);

        hideModal();

    }

    const CustomerSection = () => {
        return (
            <ColumnContainer alignMode='flex-start' gap={2}>
                <Text style={styles.title}>Información del Cliente</Text>

                <Text style={styles.label}>Cliente Seleccionado:</Text>
                <TextInput
                    style={styles.input}
                    accessibilityLabel='Nombre Cliente'
                    label='Nombre Cliente'
                    placeholder='Nombre Completo...'
                    readOnly
                    mode='outlined'
                    value={customerName}
                />

                <List.Section>
                    <List.Subheader>Seleccionar Cliente:</List.Subheader>
                    {
                        customerList.map((item, index) => {
                            const {
                                id,
                                name,
                                address,
                            } = item;

                            return (

                                <List.Item key={id} title={() =>
                                    <ColumnContainer alignMode='flex-start' gap={2}>
                                        <Text style={styles.label}>{name}</Text>
                                        {id == customerSelected ? (<Chip icon="information"  >seleccionado</Chip>) : ""}
                                    </ColumnContainer>} description={address} left={() => <List.Icon icon="store" />} right={() => <IconButton icon="plus" mode="contained" onPress={() => handleCustomerSelect(id, name)}></IconButton>} />
                            )
                        })
                    }

                </List.Section>
            </ColumnContainer>
        )
    }

    const ArticleSection = () => {
        return (
            <ColumnContainer alignMode='flex-start' gap={3}>
                <Text style={styles.title}>Información del Producto</Text>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <List.Section>
                            <List.Subheader>Seleccione un Articulo:</List.Subheader>
                            {
                                articleList.length > 0 ? (
                                    articleList.map((item, index) => {
                                        const {
                                            article_id,
                                            article_code,
                                            article_description,
                                            price
                                        } = item;

                                        return (
                                            <List.Item title={() =>
                                                <ColumnContainer alignMode='flex-start' gap={2}>
                                                    <Text style={styles.label}>{article_code} - {article_description}</Text>
                                                </ColumnContainer>
                                            }
                                                description={price}
                                                left={() => <List.Icon icon="information" />}
                                                right={() =>
                                                    <IconButton
                                                        icon="plus"
                                                        iconColor='green'
                                                        mode="contained"
                                                        onPress={() => handleArticleSelect(item)}>
                                                    </IconButton>
                                                } />
                                        )
                                    })
                                ) : <EmptyDataLabel />

                            }

                        </List.Section>
                    </Modal>
                </Portal>
                <Button style={{ marginTop: 30 }} onPress={showModal}>
                    Seleccionar Articulo
                </Button>

                <Text style={styles.label}>Articulo Seleccionado:</Text>
                <TextInput
                    style={styles.input}
                    accessibilityLabel='Descripcion'
                    label='Descripcion'
                    placeholder='Nombre Completo...'
                    readOnly
                    mode='outlined'
                    value={articleDescription}
                />


                <Text style={styles.label}>Precio C$:</Text>
                <TextInput
                    style={styles.input}
                    accessibilityLabel='C$'
                    label='C$'
                    placeholder='C$...'
                    readOnly
                    mode='outlined'
                    value={articlePrice}
                />


                <Text style={styles.label}>Cantidad:</Text>
                <TextInput
                    style={styles.input}
                    accessibilityLabel='#'
                    label='#'
                    placeholder='Cantidad...'
                    onChangeText={setArticleQuantity}
                    inputMode='numeric'
                    mode='outlined'
                    value={articleQuantity}
                />

                <Button style={{ backgroundColor: "#42a5f5" }} textColor='white' onPress={handleAddArticle}>
                    Agregar
                </Button>

                <List.Section>
                    <List.Subheader>Detalle del Pedido:</List.Subheader>
                    {
                        articleListSelected.length > 0 ? (
                            articleListSelected.map((item, index) => {

                                const {
                                    article_id,
                                    articleQty,
                                    articleDescription,
                                    total
                                } = item;

                                return (
                                    <List.Item title={() =>
                                        <ColumnContainer alignMode='flex-start' gap={2}>
                                            <Text style={styles.label}>{articleDescription} - {articleQty}</Text>
                                        </ColumnContainer>
                                    }
                                        description={total}
                                        left={() => <List.Icon icon="information" />}
                                        right={() =>
                                            <IconButton
                                                icon="delete"
                                                iconColor='red'
                                                mode="contained"
                                                onPress={() => handleRemoveArticle(index)}>
                                            </IconButton>
                                        } />
                                )
                            })
                        ) : <EmptyDataLabel />

                    }

                </List.Section>
            </ColumnContainer>
        )
    }

    const OrderResumeSection = () => {
        return (
            <ColumnContainer alignMode='flex-start' gap={3}>
                <Text style={styles.title}>Información de la Orden</Text>


                <Text style={styles.labelTitle}>Cliente:</Text>
                <Text style={styles.label}>{customerName}</Text>

                <Text style={styles.labelTitle}>Total Items:</Text>
                <Text style={styles.label}>{articleListSelected.length}</Text>

                <RowContainer alignMode='flex-start' gap={3}>
                    <ColumnContainer alignMode='flex-start' gap={3}>
                        <Text style={styles.labelTitle}>SubTotal </Text>
                        <Text style={styles.label}>C$ {subTotal}</Text>
                    </ColumnContainer>

                    <ColumnContainer alignMode='flex-start' gap={3}>
                        <Text style={styles.labelTitle}>Total </Text>
                        <Text style={styles.label}>C$ {total}</Text>
                    </ColumnContainer>
                </RowContainer>

                <Text style={styles.label}>Observacion:</Text>
                <TextInput
                    style={styles.input}
                    accessibilityLabel='Observaciones'
                    label='Observaciones'
                    placeholder='Observaciones...'
                    mode='outlined'
                    numberOfLines={5}
                    value={observation}
                    onChangeText={setObservation}
                />

                <List.Section>
                    <List.Subheader>Detalle del Pedido:</List.Subheader>
                    {
                        articleListSelected.length > 0 ? (
                            articleListSelected.map((item, index) => {

                                const {
                                    article_id,
                                    articleQty,
                                    articleDescription,
                                    total
                                } = item;

                                return (
                                    <List.Item
                                        title={() =>
                                            <ColumnContainer alignMode='flex-start' gap={2}>
                                                <Text style={styles.label}>{articleDescription} - {articleQty}</Text>
                                            </ColumnContainer>
                                        }
                                        description={total}
                                        key={index}
                                        left={() => <List.Icon icon="information" />}
                                    />
                                )
                            })
                        ) : <EmptyDataLabel />

                    }

                </List.Section>
            </ColumnContainer>
        )
    }

    const content = [
        <CustomerSection
            active={active}
        />,
        <ArticleSection active={active} />,
        <OrderResumeSection active={active} />

    ];

    const handleSubmitForm = () => {
        try {
            setLoading(true);
            let orderDetail: Array<OrderDetailDTO> = [];

            articleListSelected.forEach(element => {
                orderDetail.push(
                    {
                        article_id: element.article_id,
                        article_description: element.articleDescription,
                        quantity: element.articleQty,
                        presentation: "Caja",
                        unit_price: element.price,
                        tax_percentage: 0.0,
                        total_tax: 0.0,
                        sub_total: element.total,
                        discount_percentage: 0.0,
                        discount_amount: 0.0,
                        total: element.total,
                    }
                )
            });

            let newOrder = {
                customer_id: customerSelected,
                "customer_address_id": null,
                "seller_id": null,
                "customer_name": customerName,
                "description": observation,
                "exchange_rate": 36.0,
                "total_item": articleListSelected.length,
                "total_tax": 0.0,
                "total_discount": 0.0,
                "sub_total": subTotal,
                "total_order": total,
                "estimated_delivery_date": "2024-07-10T00:00:00.000Z",
                items: orderDetail
            } as NewOrderDTO

            sendOrder(newOrder).then((result) => {
                if (result.data) {
                    showSuccessModal()

                    setActive(0);
                    setArticleListSelectedDropDown([]);
                    setTotal(0.0);
                    setSubTotal(0.0);
                    setCustomerName("");
                    setCustomerSelected(null);
                    

                    setLoading(false);
                }
            });

            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    const handleRemoveArticle = (index: number) => {
        let articleForRemove = articleListSelected[index]
        // Crea una copia del array de documentos
        const updatedArticle = [...articleListSelected];
        // Elimina el documento en la posición especificada
        updatedArticle.splice(index, 1);
        // Actualiza el estado con la nueva lista de documentos
        setArticleListSelectedDropDown(updatedArticle);

        setSubTotal(subTotal - articleForRemove.total)
        setTotal(total - articleForRemove.total)
    };

    const handleAddArticle = () => {
        try {

            let totalLine = articlePrice * articleQuantity;
            let item = {
                article_id: articleId,
                articleQty: articleQuantity,
                articleDescription: articleDescription,
                total: totalLine,
                price: articlePrice
            }

            setArticleId(0);
            setArticleDescription("");
            setArticlePrice("");
            setArticleQuantity(0);

            console.log(total)

            setSubTotal(subTotal + totalLine)
            setTotal(total + totalLine)

            setArticleListSelectedDropDown(prevArticle => [...prevArticle, item]);
        } catch (error) {
            console.log("error agregando")
            console.log(error)
        }

    }

    return (
        <SafeView>
            <ScreenHeader title={`Nuevo Pedido`} goBackEvent={() => navigation.goBack()} />
            {
                loading ? <LoadingElement /> :
                    <View style={styles.container}>
                        <Portal>
                            <Modal visible={success} onDismiss={hideSuccessModal} contentContainerStyle={containerStyle}>
                                <ColumnContainer alignMode='center' gap={3}>
                                    <Text style={styles.labelTitle}>NOTIFICACION</Text>
                                
                                    <Text style={styles.label}>Registro creado el pedido de forma satisfactoria</Text>
                                </ColumnContainer>
                            </Modal>
                        </Portal>

                        <Stepper
                            textNextButton='Siguiente'
                            textBackButton='Retroceder'
                            wrapperStyle={styles.stepperWrapper}
                            active={active}
                            showButton={true}
                            content={content}
                            onBack={() => setActive((p) => p - 1)}
                            onFinish={handleSubmitForm}
                            onNext={() => setActive((p) => p + 1)}
                        />
                    </View>
            }
        </SafeView>
    );


}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', margin: 10, width: '100%' },
    scrollView: { backgroundColor: '#FFFFFF', height: '100%' },
    stepperWrapper: { margin: 20 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#152846', marginTop: 20 },
    label: { fontSize: 16, color: '#152846' },
    labelTitle: { fontSize: 16, color: 'grey' },
    optionalText: { fontSize: 10 },
    input: { backgroundColor: 'white', color: '#152846', width: '80%' },
    container2: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label2: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});


export default OrderCreateScreen;