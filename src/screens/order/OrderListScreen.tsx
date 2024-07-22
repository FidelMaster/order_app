import React, { useState, useEffect } from 'react';
import { RefreshControl, Linking } from 'react-native';
import { Searchbar } from 'react-native-paper';
// Custom Components
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import SafeView from '../../components/SafeView/SafeView';
import Button from '../../components/Button/Button';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import CustomerItemList from '../../components/CustomerItemList/CustomerItemList';
import OrderCard from '../../components/OrderCard/OrderCard';
import { getOrders } from '../../services/api/order-service';

const OrderListScreen = ({ navigation }) => {
    const [data, setData] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [refreshing, setRefreshing] = useState(false);
    const [originalData, setOriginalData] = useState<any>([]);

    useEffect(() => {
        setData([])
        getCollectOrder().then();
    }, []);

    const getCollectOrder = async () => {
        try {
            setRefreshing(true);

            const response = await getOrders();

            if (response.success) {
                setData(response.data)
                setOriginalData(response.data)
            }

            setRefreshing(false);
        } catch (error) {
            console.log('Error fetching alerts:', error);
            setRefreshing(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        const filtered = originalData.filter(item =>
            item.id.toString().toLowerCase().includes(query.toLowerCase())
        );

        setData(filtered)
    }

    const handleClearSearch = () => {
        setData(originalData)
    }

    const handleShowDetail = async (item: any) => {
        navigation.navigate('DetailCollectionOrder', {
            data: item
        });
    }

    const handleCall = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`);
    }

    return (
        <SafeView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => { getCollectOrder() }}
                />
            }
        >
            <ScreenHeader title={`Historial Ordenes`} />
            <Button style={{ backgroundColor: '#3FEA46' }} title='Crear Orden'   onPress={() => navigation.navigate('OrderCreate')}  ></Button>
            <Searchbar
                style={{ margin: 10 }}
                placeholder="Buscar una orden..."
                onChangeText={handleSearch}
                value={searchQuery}
                icon="magnify"
                onClearIconPress={handleClearSearch}
            />

            {
                data.length > 0 ? (
                    data.map((item, index) => {
                        const {
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
                            updatedAt
                        } = item;


                        return (
                            <OrderCard
                                key={index}
                                id={id}
                                user_id={user_id}
                                seller_id={seller_id}
                                customer_address_id={customer_address_id}
                                customer_id={customer_id}
                                description={description}
                                customer_name={customer_name}
                                exchange_rate={exchange_rate}
                                seller_commision_amount={seller_commision_amount}
                                total_tax={total_tax}
                                total_item={total_item}
                                total_discount={total_discount}
                                sub_total={sub_total}
                                total_order={total_order}
                                state={state}
                                estimated_delivery_date={estimated_delivery_date}
                                createdAt={createdAt}
                                updatedAt={updatedAt}
                                onViewDetail={() => handleShowDetail(item)}
                           
                            ></OrderCard>
                        )
                    })

                ) : (
                    <EmptyDataLabel />
                )
            }
        </SafeView>
    );
}

export default OrderListScreen;

