import React, { useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, Linking, } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { getPackagesInCollectionOrder } from '../../services/api/collection-order-service';
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import OrderDetailCard from '../../components/OrderDetaiilCard/OrderDetailCard';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import PackageCard from '../../components/PackageCard/PackageCard';

const CollectionOrderPackagesScreen = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [IdDetail, setIdDetail] = useState<number>();
    const [detailOrder, setDetailOrder] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [originalData, setOriginalData] = useState<any>([]);

    useEffect(() => {
        const { params } = route;
        let id = params.data.Id;
        console.log(params.data);
        setData([])
        setDetailOrder(params.data)
        setIdDetail(id);
        getCollectOrder(id).then();
    }, []);

    const getCollectOrder = async (id: number) => {
        try {
            setRefreshing(true);

            const response = await getPackagesInCollectionOrder(id);

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
            item.TrackingCode.toLowerCase().includes(query.toLowerCase())
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

    const handlePrint = async () => {

    }

    return (
        <SafeView
            backgroundColor='#F1F9FC'
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => { getCollectOrder(IdDetail) }}
                />
            }
        >
            <ScreenHeader title={`Total Paquetes ${data.length}`} goBackEvent={() => navigation.goBack()} />


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
                            Id,
                            TrackingCode,
                            OrderCode,
                            Observation,
                            CustomerTarget,
                            CustomerTargetPhone,
                            CustomerTargetAddress,
                            CustomerSender,
                            RouteCode,
                            RouteName,
                            MunicipalityTarget,
                            OrderDate,
                            TotalWeigth
                        } = order;

                        return (
                            <PackageCard
                                Id={Id}
                                key={index}
                                TrackingCode={TrackingCode}
                                OrderCode={OrderCode}
                                Observation={Observation}
                                CustomerTarget={CustomerTarget}
                                CustomerTargetPhone={CustomerTargetPhone}
                                CustomerTargetAddress={CustomerTargetAddress}
                                CustomerSender={CustomerSender}
                                RouteCode={RouteCode}
                                RouteName={RouteName}
                                MunicipalityTarget={MunicipalityTarget}
                                OrderDate={OrderDate}
                                TotalWeigth={TotalWeigth}
                                onPrintTicket={() => handlePrint()}
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

export default CollectionOrderPackagesScreen;