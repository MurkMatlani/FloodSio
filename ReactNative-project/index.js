/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MainAppContextProvider } from './src/Context/MainAppContext';
import { MenuProvider } from 'react-native-popup-menu';

const Main = () => {
    return <MainAppContextProvider>
        <MenuProvider>
            <App />
        </MenuProvider>
    </MainAppContextProvider>
}
AppRegistry.registerComponent(appName, () => Main);
