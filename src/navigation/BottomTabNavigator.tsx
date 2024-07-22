import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import OrderScannScreen from '../screens/order/OrderScanScreen';

import CustomerListScreen from '../screens/customer/CustomerListScreen';

import OrderListScreen from '../screens/order/OrderListScreen';
import OrderCreateScreen from '../screens/order/OrderCreateScreen';

import DistributionOrderScreen from '../screens/distribution/DistributionOrderScreen';
import DistributionOrderScannScreen from '../screens/distribution/DistributionOrderScann';
import DetailDristributionOrderScreen from '../screens/distribution/DetailDristributionOrderScreen';
import DistributionOrderReviewScreen from '../screens/distribution/DistributionOrderReviewScreen';

import CollectionOrderScreen from '../screens/collection/CollectionOrderScreen';
import DetailCollectionOrderScreen from '../screens/collection/DetailCollectionOrder';
import CollectionOrderScannScreen from '../screens/collection/CollectionOrderScannScreen';
import CollectionOrderReviewScreen from '../screens/collection/CollectionOrderReview';

import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/auth/AuthContext';
import CollectionOrderPackagesScreen from '../screens/collection/CollectionOrderPackagesScreen';

const ProfileStack = createNativeStackNavigator();
const DistributionOrderStack = createNativeStackNavigator();
const CollectionOrderScreenStack = createNativeStackNavigator();
const CustomerScreenStack = createNativeStackNavigator();
const OrderScreenStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DrawerHeader = ({ navigation }: any) => (
  <Icon
    color='#fff'
    name="bars"
    size={25}
    onPress={() => navigation.openDrawer()}
    style={{ marginLeft: 10 }}
  />
);

const DrawerScreenOptions = ({ navigation, title }: any) => ({
  headerShown: false,
  title,
  headerTitleStyle: { color: '#fff' },
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: '#B02B2C' },
});


const ProfileStackScreens = ({ route }) => {

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name='Home' component={HomeScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
      <ProfileStack.Screen name='OrderTransit' component={OrderScannScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
      <ProfileStack.Screen name='UpdateCredential' component={OrderScannScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />

    </ProfileStack.Navigator>
  )
}

const OrderScreenStacks = ({ route }) => {
  // We can access navigation object via context OrderCreateScreen
  // const navigation = React.useContext(NavigationContext);
  const { type } = route.params || { type: 'current' };
  let title = type == 'current' ? 'Alertas Activas' : 'Otros Casos'

  return (
    <OrderScreenStack.Navigator>
      <OrderScreenStack.Screen name='OrderList' component={OrderListScreen} options={({ navigation }) => DrawerScreenOptions({ navigation, title: title })} initialParams={{ type: type }} />
      <OrderScreenStack.Screen name='OrderCreate' component={OrderCreateScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
     
    </OrderScreenStack.Navigator>
  )
}


const CollectionOrderStackScreens = ({ route }) => {
  // We can access navigation object via context
  // const navigation = React.useContext(NavigationContext);
  // const { type } = route.params || { type: 'current' };
  //let title = type == 'current' ? 'Alertas Activas' : 'Otros Casos'

  return (
    <CollectionOrderScreenStack.Navigator>
      <CollectionOrderScreenStack.Screen name='CollectionOrderList' component={CollectionOrderScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
      <CollectionOrderScreenStack.Screen name='DetailCollectionOrder' component={DetailCollectionOrderScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
      <CollectionOrderScreenStack.Screen name='CollectionOrderScann' component={CollectionOrderScannScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
      <CollectionOrderScreenStack.Screen name='CollectionOrderReview' component={CollectionOrderReviewScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
      <CollectionOrderScreenStack.Screen name='CollectionOrderPackage' component={CollectionOrderPackagesScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
    </CollectionOrderScreenStack.Navigator>
  )
}



const CustomerStackScreens = ({ route }) => {
  // We can access navigation object via context
  // const navigation = React.useContext(NavigationContext);
  // const { type } = route.params || { type: 'current' };
  //let title = type == 'current' ? 'Alertas Activas' : 'Otros Casos'

  return (
    <CustomerScreenStack.Navigator>
      <CustomerScreenStack.Screen name='CustomerList' component={CustomerListScreen} options={({ navigation }) => DrawerScreenOptions({ navigation })} />
    </CustomerScreenStack.Navigator>
  )
}

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);
  console.log(userInfo)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          userInfo.token ? (
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />

          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            </>
          )
        }


      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          color: 'black'
        },
        tabBarActiveBackgroundColor: '#c4461c',
        tabBarActiveTintColor: '#b02b2c',
        tabBarInactiveTintColor: 'grey', // Color de la etiqueta inactiva
      }}

      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          style={{ borderRadius: 80, backgroundColor: '#fff' }}
          activeColor="black"
          inactiveColor="grey"
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {

              navigation.dispatch({
                ...navigation.navigate(route.name, route.params),
                target: state.key,
              });

            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.title;

            return label;
          }}
        />
      )}

      initialRouteName='Alert'

    >

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreens}
        options={{
          tabBarLabel: 'Perfil',
          tabBarActiveTintColor: '#000',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="user" size={25} color={focused ? '#F44B03' : '#A2A1A6'} />
          ),
          tabBarActiveBackgroundColor: '#E8DEF8',
          headerShown: false
        }}

        initialParams={{ type: 'current' }}
      />

      <Tab.Screen
        name="CollectionHistory"
        component={OrderScreenStacks}
        options={{
          tabBarLabel: 'Pedidos',
          tabBarLabelStyle: {
            color: 'black'
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="truck" size={25} color={focused ? '#F44B03' : '#A2A1A6'} />
          ),
          tabBarActiveBackgroundColor: '#E8DEF8',
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#E8DEF8',
          headerShown: false,

        }}
        initialParams={{ type: 'history' }}
      />

      <Tab.Screen
        name="DistributionHistory"
        component={CustomerStackScreens}
        options={{
          tabBarLabel: 'Clientes',
          tabBarLabelStyle: {
            color: 'black'
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="car" size={25} color={focused ? '#F44B03' : '#A2A1A6'} />
          ),
          tabBarActiveBackgroundColor: '#E8DEF8',
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#E8DEF8',
          headerShown: false,

        }}
        initialParams={{ type: 'history' }}
      />

    </Tab.Navigator>
  );
};


export default Navigation;