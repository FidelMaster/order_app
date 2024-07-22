import React, { useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, Linking, } from 'react-native';
import { Searchbar, Card, Text, IconButton } from 'react-native-paper';
import { getDetailDistributionOrder } from '../../services/api/distribution-order-service';
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import OrderDetailCard from '../../components/OrderDetaiilCard/OrderDetailCard';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import RowContainer from '../../components/RowContainer/RowContainer';
import ColumnContainer from '../../components/ColumnContainer/ColumnContainer';

const DetailDristributionOrderScreen = ({ route, navigation }) => {
    const [data, setData] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [refreshing, setRefreshing] = useState(false);
    const [originalData, setOriginalData] = useState<any>([]);
    const [order, setOrder] = useState();
    const [orderCode, setOrderCode] = useState('');

    useEffect(() => {
        const { params } = route;
        let id = params.data.Code;
        console.log(params.data);
        setData([])
        setOrder(params.data)
        setOrderCode(id);
        getCollectOrder(id).then();
    }, []);

    const getCollectOrder = async (id) => {
        try {
            setRefreshing(true);

            const response = await getDetailDistributionOrder(id);

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
            item.Customer.toLowerCase().includes(query.toLowerCase())
        );

        setData(filtered)
    }

    const handleClearSearch = () => {
        setData(originalData)
    }

    const handleShowDetail = async (item: any) => {
        navigation.navigate('DistributionOrderScan', {
            data: item
        });
    }

    const handleViewPackage = (item: any) => {
        navigation.navigate('CollectionOrderPackage', {
            data: item
        });
    }

    const handleCall = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`);
    }

    return (
        <SafeView
            backgroundColor='#F1F9FC'
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => { getCollectOrder(orderCode) }}
                />
            }
        >
            <ScreenHeader title={`Distribucion #${order?.Code}`} goBackEvent={() => navigation.goBack()}/>

            <Searchbar
                style={{ margin: 10 }}
                placeholder="Buscar Cliente.."
                onChangeText={handleSearch}
                value={searchQuery}
                icon="magnify"
                onClearIconPress={handleClearSearch}
            />

            {
                data.length > 0 ? (
                    data.map((item, index) => {
                        const order = item;

                        const {
                            Customer,
                            Address,
                            Municipality,
                            Phone,
                            TotalItem,
                            TotalWeigth,
                            IsComplete
                        } = order;

                        return (
                            <OrderDetailCard
                                buttonText='Entregar'
                                Address={Address}
                                Customer={Customer}
                                key={index}
                                Municipality={Municipality}
                                Phone={Phone}
                                TotalItem={TotalItem}
                                TotalWeigth={TotalWeigth}
                                IsComplete={IsComplete}
                                onViewDetail={() => handleShowDetail(order)}
                                onCall={() => handleCall(Phone)}
                                onViewPackages={() => handleViewPackage(order)}
                            />
                        )
                    })

                ) : (
                    <EmptyDataLabel />
                )
            }
        </SafeView>
    );
}



export default DetailDristributionOrderScreen;