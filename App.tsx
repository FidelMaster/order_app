import { AuthProvider } from './src/context/auth/AuthContext';

import BottomTabNavigator from './src/navigation/BottomTabNavigator'


function App(): React.JSX.Element {
  return (
    <AuthProvider> 
        <BottomTabNavigator /> 
    </AuthProvider>
  );
}


export default App;
