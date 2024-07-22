import React from 'react';
import { SafeAreaView, ScrollView, Dimensions, RefreshControl } from 'react-native';

interface SafeViewProps {
    children: React.ReactNode;
    refreshControl?: React.ReactElement;
    backgroundColor?: string;
}

const SafeView: React.FC<SafeViewProps> = ({ children, refreshControl, backgroundColor }) => {
    return (
        <SafeAreaView>
            <ScrollView
                style={{
                    backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF',
                    width: Dimensions.get('window').width
                }}
                refreshControl={refreshControl}
            >

                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SafeView;
