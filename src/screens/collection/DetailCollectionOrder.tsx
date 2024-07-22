import React, { useState, useEffect } from 'react';
import { RefreshControl, Linking, } from 'react-native';
import { Searchbar } from 'react-native-paper';
// Custom Components
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import OrderDetailCard from '../../components/OrderDetaiilCard/OrderDetailCard';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
// Services
import { getDetailCollectionOrder } from '../../services/api/collection-order-service';

const DetailCollectionOrderScreen = ({ route, navigation }) => {
    const [data, setData] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [refreshing, setRefreshing] = useState(false);
    const [originalData, setOriginalData] = useState<any>([]);
    const [order, setOrder] = useState<any>();
    const [orderCode, setOrderCode] = useState('');

    useEffect(() => {
        const { params } = route;
        let id = params.data.Code;

        setData([])
        setOrder(params.data)
        setOrderCode(id);
        getCollectOrder(id).then();
    }, []);

    const getCollectOrder = async (id: string) => {
        try {
            setRefreshing(true);

            const response = await getDetailCollectionOrder(id);

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
        navigation.navigate('CollectionOrderScann', {
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
            <ScreenHeader title={`Recoleccion #${order?.Code}`} goBackEvent={() => navigation.goBack()} />

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
                            IsCompleted
                        } = order;

                        return (
                            <OrderDetailCard
                                buttonText='Recolectar'
                                Address={Address}
                                Customer={Customer}
                                key={index}
                                Municipality={Municipality}
                                Phone={Phone}
                                TotalItem={TotalItem}
                                TotalWeigth={TotalWeigth}
                                IsComplete={IsCompleted}
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

export default DetailCollectionOrderScreen;