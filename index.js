/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {configureFonts, PaperProvider} from 'react-native-paper';


export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }
  
  AppRegistry.registerComponent(appName, () => Main);
