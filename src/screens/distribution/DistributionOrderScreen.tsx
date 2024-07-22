import React, { useState, useEffect, version } from 'react';
import { View, RefreshControl, StyleSheet } from 'react-native';
import {  Searchbar, Card, Text } from 'react-native-paper';
import { getAssignedDistributionOrders } from '../../services/api/distribution-order-service';
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import OrderCard from '../../components/OrderCard/OrderCard';
import SafeView from '../../components/SafeView/SafeView';


const DistributionOrderScreen = ({ navigation }) => {
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

            const response = await getAssignedDistributionOrders();

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
        navigation.navigate('DetailDistributionOrder', {
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

            <Card style={styles.card} >
                <Card.Content>
                    <View style={[styles.container, styles.rowContainer]}>
                        <View style={[styles.container]}>
                            <View style={styles.rowContainer}>
                                <Text variant="titleLarge" style={[{ color: '#6B6A74' }]}>Ordenes Distribucion</Text>
                                <View >
                                </View>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Searchbar
                style={{ margin: 10 }}
                placeholder="Buscar Orden de Distribucion..."
                onChangeText={handleSearch}
                value={searchQuery}
                icon="magnify"
                onClearIconPress={handleClearSearch}
            />
            {
                data.length > 0 ? (
                    data.map((item, index) => {
                        const order = item;
                        const key = `ord_${index}`

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
                            IsComplete,
                            CreatedBy,
                            CreatedDate
                        } = order;

                        return (
                            <OrderCard
                                Assistant={Assistant}
                                key={key}
                                Driver={Driver}
                                Vehicle={Vehicle}
                                Code={Code}
                                ExecutionDate={ExecutionDate}
                                IsComplete={IsComplete}
                                CreatedDate={CreatedDate}
                                TotalComplete={0}
                                TotalItem={TotalItem}
                                onViewDetail={() => handleShowDetail(order)}
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

export default DistributionOrderScreen;