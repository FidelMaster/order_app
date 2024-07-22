import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
// Custom Components
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import OrderCard from '../../components/OrderCard/OrderCard';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

import { getAssignedCollectionOrders } from '../../services/api/collection-order-service';

const CollectionOrderScreen = ({ navigation }) => {
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

            const response = await getAssignedCollectionOrders();

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
            item.Code.toLowerCase().includes(query.toLowerCase())
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

    return (
        <SafeView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => { getCollectOrder() }}
                />
            }
        >
            <ScreenHeader title={`Ordenes Recoleccion`} />

            <Searchbar
                style={{ margin: 10 }}
                placeholder="Buscar Orden de Recoleccion..."
                onChangeText={handleSearch}
                value={searchQuery}
                icon="magnify"
                onClearIconPress={handleClearSearch}
            />

            {
                data.length > 0 ? (
                    data.map((item, index) => {
                        const {
                            Code,
                            IdAssistant,
                            Assistant,
                            IdDriver,
                            Driver,
                            IdVehicle,
                            Vehicle,
                            Observation,
                            ExecutionDate,
                            TotalItem,
                            TotalCollected,
                            IsComplete,
                            CreatedBy,
                            CreatedDate
                        } = item;
 

                        return (
                            <OrderCard
                                Assistant={Assistant}
                                key={index}
                                Driver={Driver}
                                Vehicle={Vehicle}
                                Code={Code}
                                ExecutionDate={ExecutionDate}
                                IsComplete={IsComplete}
                                CreatedDate={CreatedDate}
                                TotalComplete={TotalCollected}
                                TotalItem={TotalItem}
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

export default CollectionOrderScreen;