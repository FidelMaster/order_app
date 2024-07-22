import React, { useState, useEffect } from 'react';
import { RefreshControl, Linking } from 'react-native';
import { Searchbar } from 'react-native-paper';
// Custom Components
import EmptyDataLabel from '../../components/EmptyDataLabel/EmptyDataLabel';
import SafeView from '../../components/SafeView/SafeView';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import CustomerItemList from '../../components/CustomerItemList/CustomerItemList';

import { getCustomers } from '../../services/api/customer-service';

const CustomerListScreen = ({ navigation }) => {
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

            const response = await getCustomers();

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
            item.name.toLowerCase().includes(query.toLowerCase())
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
            <ScreenHeader title={`Listado Clientes`} />

            <Searchbar
                style={{ margin: 10 }}
                placeholder="Buscar un cliente..."
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
                            customer_category_id,
                            identification,
                            name,
                            credit_limit,
                            credit_available,
                            current_balance,
                            contact_dni,
                            contact_name,
                            contact_phone,
                            contact_email,
                            address,
                            phone,
                            is_tax_exemption,
                            createdAt,
                            updatedAt
                        } = item;


                        return (
                            <CustomerItemList
                                key={index}
                                id={id}
                                customer_category_id={customer_category_id}
                                identification={identification}
                                name={name}
                                credit_limit={credit_limit}
                                credit_available={credit_available}
                                current_balance={current_balance}
                                contact_dni={contact_dni}
                                contact_name={contact_name}
                                contact_phone={contact_phone}
                                contact_email={contact_email}
                                address={address}
                                phone={phone}
                                is_tax_exemption={is_tax_exemption}
                                createdAt={createdAt}
                                updatedAt={updatedAt}
                                onViewDetail={() => handleShowDetail(item)}
                                onCall={() => handleCall(contact_phone)}
                            ></CustomerItemList>
                        )
                    })

                ) : (
                    <EmptyDataLabel />
                )
            }
        </SafeView>
    );
}

export default CustomerListScreen;

